import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured, handleFirestoreError } from '../firebase';
import {
  Course,
  Order,
  Enrollment,
  InstituteSettings,
  OfferItem,
  NotificationItem,
} from '../types';
import { INITIAL_COURSES, INITIAL_WEBSITE_CONTENT } from '../data/initialData';
import { getCourses as getLocalCourses, saveCourse as saveLocalCourse } from './storage';

export const DEFAULT_SETTINGS: InstituteSettings = {
  upiId: 'prashantsinha68-2@okhdfcbank',
  upiPayeeName: 'Prashant Kr Sinha',
  qrImageUrl: '/Trading-Pathsala/assets/aistudio/IMG-20261106-WA0003_b6bdeab9.jpg',
  paymentInstructions:
    '1. Scan the official UPI QR code with Google Pay, PhonePe, Paytm, or BHIM.\n2. Verify the Payee Name displays "Prashant Kr Sinha" and UPI ID "prashantsinha68-2@okhdfcbank".\n3. Complete the payment for the exact course fee.\n4. Copy the 12-digit UTR / Transaction Reference ID from your payment slip.\n5. Paste the UTR below and click "Submit Order & Verify Payment".\n6. Instant access is granted once admin approves your transaction.',
  supportPhone: INITIAL_WEBSITE_CONTENT.officialPhone,
  whatsappNumber: INITIAL_WEBSITE_CONTENT.whatsappNumber,
  supportEmail: INITIAL_WEBSITE_CONTENT.supportEmail,
  officeAddress: INITIAL_WEBSITE_CONTENT.officeAddress,
  noticeBanner: 'Admissions are open for live mentorship batches. Direct UPI payment verification active.',
};

// -------------------------------------------------------------
// COURSES SERVICE
// -------------------------------------------------------------

export async function getCoursesList(): Promise<Course[]> {
  if (!isFirebaseConfigured) {
    return getLocalCourses();
  }
  try {
    const colRef = collection(db, 'courses');
    const snap = await getDocs(colRef);
    if (snap.empty) {
      // If Firestore courses collection is empty, return local courses without unauthenticated write
      return getLocalCourses();
    }
    const courses: Course[] = [];
    snap.forEach((d) => {
      courses.push(d.data() as Course);
    });
    return courses.length > 0 ? courses.sort((a, b) => (a.id > b.id ? 1 : -1)) : getLocalCourses();
  } catch (error) {
    // If security rules block unauthenticated reads or project is initializing, fallback gracefully
    console.warn('Firestore courses read fallback to local courses:', (error as any)?.message || error);
    return getLocalCourses();
  }
}

export async function seedCoursesAsAdmin(): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured) {
    return { success: false, message: 'Firebase is not configured.' };
  }
  try {
    for (const c of INITIAL_COURSES) {
      await setDoc(doc(db, 'courses', c.id), {
        ...c,
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, { merge: true });
    }
    return { success: true, message: 'Initial 6 courses successfully synced to Firestore!' };
  } catch (error) {
    const msg = handleFirestoreError(error, 'create', 'courses');
    return { success: false, message: msg };
  }
}

export async function saveCourseToDb(course: Course): Promise<{ success: boolean; message?: string }> {
  if (!isFirebaseConfigured) {
    saveLocalCourse(course);
    return { success: true };
  }
  try {
    const courseRef = doc(db, 'courses', course.id);
    const courseData = {
      ...course,
      updatedAt: new Date().toISOString(),
      published: course.published !== false,
    };
    await setDoc(courseRef, courseData, { merge: true });
    return { success: true };
  } catch (error) {
    const msg = handleFirestoreError(error, 'update', `courses/${course.id}`);
    return { success: false, message: msg };
  }
}

export async function deleteCourseFromDb(courseId: string): Promise<{ success: boolean; message?: string }> {
  if (!isFirebaseConfigured) {
    return { success: true };
  }
  try {
    await deleteDoc(doc(db, 'courses', courseId));
    return { success: true };
  } catch (error) {
    const msg = handleFirestoreError(error, 'delete', `courses/${courseId}`);
    return { success: false, message: msg };
  }
}

// -------------------------------------------------------------
// SETTINGS SERVICE
// -------------------------------------------------------------

export async function getInstituteSettings(): Promise<InstituteSettings> {
  if (!isFirebaseConfigured) {
    return DEFAULT_SETTINGS;
  }
  try {
    const ref = doc(db, 'settings', 'general');
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...(snap.data() as InstituteSettings) };
  } catch (error) {
    console.warn('Firestore settings fallback to defaults:', (error as any)?.message || error);
    return DEFAULT_SETTINGS;
  }
}

export async function updateInstituteSettings(
  settings: Partial<InstituteSettings>
): Promise<{ success: boolean; message?: string }> {
  if (!isFirebaseConfigured) {
    return { success: true };
  }
  try {
    const ref = doc(db, 'settings', 'general');
    await setDoc(
      ref,
      {
        ...settings,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
    return { success: true };
  } catch (error) {
    const msg = handleFirestoreError(error, 'update', 'settings/general');
    return { success: false, message: msg };
  }
}

// -------------------------------------------------------------
// ORDERS & UPI PAYMENT VERIFICATION SERVICE
// -------------------------------------------------------------

export async function submitUpiOrder(orderData: {
  studentUid: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  courseId: string;
  courseName: string;
  courseSlug: string;
  amount: number;
  utr: string;
}): Promise<{ success: boolean; message: string; orderId?: string }> {
  const cleanUtr = orderData.utr.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');

  if (!cleanUtr || cleanUtr.length < 6) {
    return {
      success: false,
      message: 'Please provide a valid UTR / UPI Transaction Reference Number (min 6-12 alphanumeric characters).',
    };
  }

  if (!isFirebaseConfigured) {
    return {
      success: false,
      message: 'Firebase is currently running in local preview mode. Please configure Firebase Web App credentials to persist orders in Cloud Firestore.',
    };
  }

  try {
    // Check for duplicate UTR in orders collection
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('utr', '==', cleanUtr));
    const duplicateSnap = await getDocs(q);

    if (!duplicateSnap.empty) {
      return {
        success: false,
        message: `This UTR (${cleanUtr}) has already been submitted for verification. If you have questions about your order, please contact institute WhatsApp support.`,
      };
    }

    const orderId = `ord_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      studentUid: orderData.studentUid,
      studentName: orderData.studentName,
      studentEmail: orderData.studentEmail,
      studentPhone: orderData.studentPhone || '',
      courseId: orderData.courseId,
      courseName: orderData.courseName,
      courseSlug: orderData.courseSlug,
      amount: orderData.amount,
      utr: cleanUtr,
      paymentMethod: 'UPI',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, 'orders', orderId), newOrder);

    return {
      success: true,
      message: 'Payment details submitted successfully! Your order is pending verification by the admin.',
      orderId,
    };
  } catch (error) {
    const errorMsg = handleFirestoreError(error, 'create', 'orders');
    return { success: false, message: errorMsg };
  }
}

export async function getStudentOrders(studentUid: string): Promise<Order[]> {
  if (!isFirebaseConfigured || !studentUid) return [];
  try {
    const q = query(
      collection(db, 'orders'),
      where('studentUid', '==', studentUid)
    );
    const snap = await getDocs(q);
    const orders: Order[] = [];
    snap.forEach((d) => orders.push(d.data() as Order));
    return orders.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (error) {
    console.warn(`Notice: orders query for student (${studentUid}) returned fallback:`, (error as any)?.message || error);
    return [];
  }
}

export async function getAllOrders(): Promise<Order[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const snap = await getDocs(collection(db, 'orders'));
    const orders: Order[] = [];
    snap.forEach((d) => orders.push(d.data() as Order));
    return orders.sort((a, b) => (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
  } catch (error) {
    handleFirestoreError(error, 'list', 'orders');
    return [];
  }
}

export async function approveStudentOrder(
  order: Order,
  adminUid: string
): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured) {
    return { success: false, message: 'Firebase not configured.' };
  }
  try {
    // 1. Update Order status
    const orderRef = doc(db, 'orders', order.id);
    const now = new Date().toISOString();
    await updateDoc(orderRef, {
      status: 'approved',
      updatedAt: now,
      reviewedBy: adminUid,
    });

    // 2. Create or update Enrollment
    const enrollmentId = `${order.studentUid}_${order.courseId}`;
    const enrollmentRef = doc(db, 'enrollments', enrollmentId);
    const enrollmentData: Enrollment = {
      id: enrollmentId,
      studentUid: order.studentUid,
      studentEmail: order.studentEmail,
      studentName: order.studentName,
      courseId: order.courseId,
      courseName: order.courseName,
      courseSlug: order.courseSlug,
      orderId: order.id,
      enrolledAt: now,
      active: true,
      batchName: 'Batch 14 (Mon - Thu, 8:00 PM IST)',
    };
    await setDoc(enrollmentRef, enrollmentData, { merge: true });

    return {
      success: true,
      message: `Order approved! Course "${order.courseName}" has been successfully unlocked for ${order.studentName}.`,
    };
  } catch (error) {
    const msg = handleFirestoreError(error, 'update', `orders/${order.id}`);
    return { success: false, message: msg };
  }
}

export async function rejectStudentOrder(
  orderId: string,
  adminUid: string,
  reason: string
): Promise<{ success: boolean; message: string }> {
  if (!isFirebaseConfigured) {
    return { success: false, message: 'Firebase not configured.' };
  }
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: 'rejected',
      rejectionReason: reason || 'UTR verification failed. Please contact support.',
      updatedAt: new Date().toISOString(),
      reviewedBy: adminUid,
    });
    return { success: true, message: 'Order marked as rejected.' };
  } catch (error) {
    const msg = handleFirestoreError(error, 'update', `orders/${orderId}`);
    return { success: false, message: msg };
  }
}

// -------------------------------------------------------------
// ENROLLMENTS SERVICE
// -------------------------------------------------------------

export async function getStudentEnrollments(studentUid: string): Promise<Enrollment[]> {
  if (!isFirebaseConfigured || !studentUid) return [];
  try {
    const q = query(
      collection(db, 'enrollments'),
      where('studentUid', '==', studentUid)
    );
    const snap = await getDocs(q);
    const list: Enrollment[] = [];
    snap.forEach((d) => {
      const data = d.data() as Enrollment;
      if (data.active !== false) {
        list.push(data);
      }
    });
    return list;
  } catch (error) {
    console.warn(`Notice: enrollments query for student (${studentUid}) returned fallback:`, (error as any)?.message || error);
    return [];
  }
}

export async function getAllEnrollments(): Promise<Enrollment[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const snap = await getDocs(collection(db, 'enrollments'));
    const list: Enrollment[] = [];
    snap.forEach((d) => list.push(d.data() as Enrollment));
    return list;
  } catch (error) {
    handleFirestoreError(error, 'list', 'enrollments');
    return [];
  }
}

// -------------------------------------------------------------
// OFFERS & NOTIFICATIONS SERVICE
// -------------------------------------------------------------

export async function getOffers(): Promise<OfferItem[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const snap = await getDocs(collection(db, 'offers'));
    const list: OfferItem[] = [];
    snap.forEach((d) => list.push(d.data() as OfferItem));
    return list;
  } catch (error) {
    handleFirestoreError(error, 'list', 'offers');
    return [];
  }
}

export async function saveOffer(offer: OfferItem): Promise<{ success: boolean; message?: string }> {
  if (!isFirebaseConfigured) return { success: true };
  try {
    await setDoc(doc(db, 'offers', offer.id), offer);
    return { success: true };
  } catch (error) {
    const msg = handleFirestoreError(error, 'create', `offers/${offer.id}`);
    return { success: false, message: msg };
  }
}

export async function getNotifications(): Promise<NotificationItem[]> {
  if (!isFirebaseConfigured) return [];
  try {
    const snap = await getDocs(collection(db, 'notifications'));
    const list: NotificationItem[] = [];
    snap.forEach((d) => list.push(d.data() as NotificationItem));
    return list;
  } catch (error) {
    handleFirestoreError(error, 'list', 'notifications');
    return [];
  }
}

export async function createNotification(
  item: NotificationItem
): Promise<{ success: boolean; message?: string }> {
  if (!isFirebaseConfigured) return { success: true };
  try {
    await setDoc(doc(db, 'notifications', item.id), item);
    return { success: true };
  } catch (error) {
    const msg = handleFirestoreError(error, 'create', `notifications/${item.id}`);
    return { success: false, message: msg };
  }
}
