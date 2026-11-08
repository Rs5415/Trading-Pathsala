export interface CurriculumModule {
  moduleTitle: string;
  lessons: string[];
  duration?: string;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  category: 'Options' | 'Technical Analysis' | 'Wealth & Investing' | 'Swing & Forex';
  shortDescription: string;
  fullDescription: string;
  price: number;
  image: string;
  tags: string[];
  coverageTopics?: string[];
  curriculum: CurriculumModule[];
  prerequisites?: string;
  featured?: boolean;
  published?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  studentId: string;
  phone?: string;
  createdAt: string;
  updatedAt?: string;
}

export type OrderStatus = 'pending' | 'approved' | 'rejected';

export interface Order {
  id: string;
  studentUid: string;
  studentName: string;
  studentEmail: string;
  studentPhone?: string;
  whatsappNumber?: string;
  courseId: string;
  courseName: string;
  courseSlug: string;
  amount: number;
  utr: string;
  paymentMethod: 'UPI';
  status: OrderStatus;
  rejectionReason?: string;
  createdAt: any;
  updatedAt?: any;
  reviewedBy?: string;
}

export interface Enrollment {
  id: string;
  studentUid: string;
  studentEmail: string;
  studentName: string;
  courseId: string;
  courseName: string;
  courseSlug: string;
  orderId?: string;
  enrolledAt: string;
  active: boolean;
  batchName?: string;
}

export interface OfferItem {
  id: string;
  title: string;
  discountPercent?: number;
  code?: string;
  validTill: string;
  description: string;
  active: boolean;
  createdAt?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'info' | 'alert' | 'update';
  targetRole?: 'all' | 'students' | 'admins';
  createdAt?: string;
}

export interface InstituteSettings {
  upiId: string;
  upiPayeeName: string;
  qrImageUrl?: string;
  paymentInstructions: string;
  supportPhone: string;
  whatsappNumber: string;
  supportEmail: string;
  officeAddress: string;
  noticeBanner?: string;
  updatedAt?: string;
}

export interface LearningResourceItem {
  id: string;
  title: string;
  category: 'PDF Guide' | 'Trading Study Note' | 'Video Lesson' | 'Market Update' | 'Course-related resources';
  fileSize: string;
  description: string;
  downloadUrl?: string;
  dateAdded: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  content: string;
  badge: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  courseName: string;
  message: string;
  status: 'New' | 'Contacted' | 'Closed';
  submittedAt: string;
}

export interface WebsiteContent {
  brandName: string;
  tagline: string;
  contactPerson: string;
  officialPhone: string;
  whatsappNumber: string;
  supportEmail: string;
  instagramHandle: string;
  instagramUrl: string;
  businessCategory: string;
  officeAddress: string;
  googleMapsDirectionsUrl: string;
}

export type PageView =
  | 'home'
  | 'courses'
  | 'course-detail'
  | 'about'
  | 'contact'
  | 'student-login';
