
import {
  Course,
  LearningResourceItem,
  AnnouncementItem,
  Enquiry,
  WebsiteContent
} from '../types';

import {
  INITIAL_COURSES,
  INITIAL_RESOURCES,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_WEBSITE_CONTENT
} from '../data/initialData';

const STORAGE_KEYS = {
  COURSES: 'tp_courses_v3',
  RESOURCES: 'tp_resources_v3',
  ANNOUNCEMENTS: 'tp_announcements_v3',
  ENQUIRIES: 'tp_enquiries_v3',
  CONTENT: 'tp_content_v3',
  STUDENT_SESSION: 'tp_student_session_v3',
  STUDENTS_DB: 'tp_students_db_v3',
};

// ==========================================
// COURSES
// ==========================================

export function getCourses(): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSES);

    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.COURSES,
        JSON.stringify(INITIAL_COURSES)
      );
      return INITIAL_COURSES;
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed) || parsed.length !== 6) {
      localStorage.setItem(
        STORAGE_KEYS.COURSES,
        JSON.stringify(INITIAL_COURSES)
      );
      return INITIAL_COURSES;
    }

    // Refresh outdated bundled course image paths
    const updatedCourses = parsed.map((course: Course) => {
      const defaultCourse = INITIAL_COURSES.find(
        (item) => item.id === course.id
      );

      if (!defaultCourse) {
        return course;
      }

      const imagePath = course.image || '';

      const isBundledImage =
        imagePath.includes('/assets/') ||
        imagePath.startsWith('assets/') ||
        imagePath.startsWith('./assets/');

      if (!imagePath || isBundledImage) {
        return {
          ...course,
          image: defaultCourse.image,
        };
      }

      return course;
    });

    localStorage.setItem(
      STORAGE_KEYS.COURSES,
      JSON.stringify(updatedCourses)
    );

    return updatedCourses;

  } catch (e) {
    console.error('Error loading courses', e);
    return INITIAL_COURSES;
  }
}

export function saveCourse(course: Course): Course[] {
  const courses = getCourses();

  const index = courses.findIndex(
    (c) => c.id === course.id
  );

  let updated: Course[];

  if (index >= 0) {
    updated = [...courses];
    updated[index] = course;
  } else {
    updated = [course, ...courses];
  }

  localStorage.setItem(
    STORAGE_KEYS.COURSES,
    JSON.stringify(updated)
  );

  return updated;
}

export function getCourseBySlug(
  slug: string
): Course | undefined {
  const courses = getCourses();

  return courses.find(
    (c) => c.slug === slug || c.id === slug
  );
}

// ==========================================
// RESOURCES
// ==========================================

export function getResources(): LearningResourceItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESOURCES);

    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.RESOURCES,
        JSON.stringify(INITIAL_RESOURCES)
      );

      return INITIAL_RESOURCES;
    }

    return JSON.parse(raw);

  } catch (e) {
    console.error('Error loading resources', e);
    return INITIAL_RESOURCES;
  }
}

export function saveResource(
  res: LearningResourceItem
): LearningResourceItem[] {
  const list = getResources();
  const updated = [res, ...list];

  localStorage.setItem(
    STORAGE_KEYS.RESOURCES,
    JSON.stringify(updated)
  );

  return updated;
}

// ==========================================
// ANNOUNCEMENTS
// ==========================================

export function getAnnouncements(): AnnouncementItem[] {
  try {
    const raw = localStorage.getItem(
      STORAGE_KEYS.ANNOUNCEMENTS
    );

    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.ANNOUNCEMENTS,
        JSON.stringify(INITIAL_ANNOUNCEMENTS)
      );

      return INITIAL_ANNOUNCEMENTS;
    }

    return JSON.parse(raw);

  } catch (e) {
    console.error('Error loading announcements', e);
    return INITIAL_ANNOUNCEMENTS;
  }
}

// ==========================================
// ENQUIRIES
// ==========================================

export function getEnquiries(): Enquiry[] {
  try {
    const raw = localStorage.getItem(
      STORAGE_KEYS.ENQUIRIES
    );

    if (!raw) return [];

    return JSON.parse(raw);

  } catch (e) {
    console.error('Error loading enquiries', e);
    return [];
  }
}

export function submitEnquiry(
  enquiry: Omit<Enquiry, 'id' | 'status' | 'submittedAt'>
): Enquiry {
  const enquiries = getEnquiries();

  const newEnq: Enquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    status: 'New',
    submittedAt: new Date().toISOString(),
  };

  const updated = [newEnq, ...enquiries];

  localStorage.setItem(
    STORAGE_KEYS.ENQUIRIES,
    JSON.stringify(updated)
  );

  return newEnq;
}

export function updateEnquiryStatus(
  id: string,
  status: 'New' | 'Contacted' | 'Closed'
): Enquiry[] {
  const enquiries = getEnquiries();

  const updated = enquiries.map((e) =>
    e.id === id ? { ...e, status } : e
  );

  localStorage.setItem(
    STORAGE_KEYS.ENQUIRIES,
    JSON.stringify(updated)
  );

  return updated;
}

// ==========================================
// WEBSITE CONTENT
// ==========================================

export function getWebsiteContent(): WebsiteContent {
  try {
    const raw = localStorage.getItem(
      STORAGE_KEYS.CONTENT
    );

    if (!raw) {
      localStorage.setItem(
        STORAGE_KEYS.CONTENT,
        JSON.stringify(INITIAL_WEBSITE_CONTENT)
      );

      return INITIAL_WEBSITE_CONTENT;
    }

    return {
      ...INITIAL_WEBSITE_CONTENT,
      ...JSON.parse(raw)
    };

  } catch (e) {
    console.error('Error loading website content', e);
    return INITIAL_WEBSITE_CONTENT;
  }
}

// ==========================================
// STUDENT SESSION / AUTH
// ==========================================

export interface StudentUser {
  id: string;
  name: string;
  email: string;
  studentId: string;
  enrolledCourses: string[];
  batchName: string;
}

export function getStudentSession(): StudentUser | null {
  try {
    const raw = localStorage.getItem(
      STORAGE_KEYS.STUDENT_SESSION
    );

    if (!raw) return null;

    return JSON.parse(raw);

  } catch (e) {
    console.error('Error loading student session', e);
    return null;
  }
}

export function setStudentSession(
  user: StudentUser | null
): void {
  if (!user) {
    localStorage.removeItem(
      STORAGE_KEYS.STUDENT_SESSION
    );
  } else {
    localStorage.setItem(
      STORAGE_KEYS.STUDENT_SESSION,
      JSON.stringify(user)
    );
  }
}

export function registerStudent(
  name: string,
  email: string,
  password: string
): {
  success: boolean;
  message: string;
  user?: StudentUser;
} {
  if (!name || !email || !password) {
    return {
      success: false,
      message: 'Please provide all required registration fields.'
    };
  }

  const studentId = `TP-${new Date().getFullYear()}-${Math.floor(
    1000 + Math.random() * 9000
  )}`;

  const newUser: StudentUser = {
    id: `student-${Date.now()}`,
    name,
    email,
    studentId,
    enrolledCourses: [
      'Basic to Advanced Technical Analysis'
    ],
    batchName: 'Batch 14 (Mon - Thu, 8:00 PM IST)',
  };

  setStudentSession(newUser);

  return {
    success: true,
    message: 'Registration successful!',
    user: newUser
  };
}

export function loginStudent(
  emailOrId: string,
  password: string
): {
  success: boolean;
  message: string;
  user?: StudentUser;
} {
  if (!emailOrId || !password) {
    return {
      success: false,
      message: 'Please enter Student ID / Email and password.'
    };
  }

  // Allow demo login or registered user
  const user: StudentUser = {
    id: 'student-demo-1',
    name: 'Aarav Sharma',
    email: emailOrId.includes('@')
      ? emailOrId
      : 'aarav.sharma@example.com',
    studentId: emailOrId.includes('TP-')
      ? emailOrId
      : 'TP-2025-0842',
    enrolledCourses: [
      'Index Option Buying',
      'Basic to Advanced Technical Analysis'
    ],
    batchName: 'Batch 14 (Mon - Thu, 8:00 PM IST)',
  };

  setStudentSession(user);

  return {
    success: true,
    message: 'Login successful',
    user
  };
}
