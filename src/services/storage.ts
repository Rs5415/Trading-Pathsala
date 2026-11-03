import { Course, Enquiry, WebsiteContent } from '../types';
import { INITIAL_COURSES, INITIAL_WEBSITE_CONTENT } from '../data/initialData';

const STORAGE_KEYS = {
  COURSES: 'tp_courses_v2_light',
  ENQUIRIES: 'tp_enquiries_v2',
  CONTENT: 'tp_content_v2_light',
};

// --- Courses ---
export function getCourses(): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
      return INITIAL_COURSES;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length !== 6) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
      return INITIAL_COURSES;
    }
    return parsed;
  } catch (e) {
    console.error('Error loading courses from storage', e);
    return INITIAL_COURSES;
  }
}

export function getCourseBySlug(slug: string): Course | undefined {
  const courses = getCourses();
  return courses.find((c) => c.slug === slug || c.id === slug);
}

// --- Enquiries ---
export function getEnquiries(): Enquiry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading enquiries', e);
    return [];
  }
}

export function submitEnquiry(enquiry: Omit<Enquiry, 'id' | 'status' | 'submittedAt'>): Enquiry {
  const enquiries = getEnquiries();
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: `enquiry-${Date.now()}`,
    status: 'New',
    submittedAt: new Date().toISOString(),
  };
  const updated = [newEnquiry, ...enquiries];
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
  return newEnquiry;
}

export function updateEnquiryStatus(enquiryId: string, status: Enquiry['status']): Enquiry[] {
  const enquiries = getEnquiries();
  const updated = enquiries.map((item) => (item.id === enquiryId ? { ...item, status } : item));
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
  return updated;
}

export function deleteEnquiry(enquiryId: string): Enquiry[] {
  const enquiries = getEnquiries();
  const updated = enquiries.filter((item) => item.id !== enquiryId);
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
  return updated;
}

// --- Website Content ---
export function getWebsiteContent(): WebsiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTENT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(INITIAL_WEBSITE_CONTENT));
      return INITIAL_WEBSITE_CONTENT;
    }
    const parsed = JSON.parse(raw);
    return {
      ...INITIAL_WEBSITE_CONTENT,
      ...parsed,
      supportEmail: 'support@tradingpathsala.in',
      officialPhone: '+91 89875 99799',
      whatsappNumber: '+91 89875 99799',
    };
  } catch (e) {
    console.error('Error loading content', e);
    return INITIAL_WEBSITE_CONTENT;
  }
}

export function saveWebsiteContent(content: WebsiteContent): WebsiteContent {
  localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
  return content;
}

export function resetAllDataToDefault(): void {
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
  localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(INITIAL_WEBSITE_CONTENT));
}
