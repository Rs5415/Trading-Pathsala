import { Course, SpecialOffer, LearningResource, Testimonial, Enquiry, WebsiteContent } from '../types';
import {
  INITIAL_COURSES,
  INITIAL_OFFERS,
  INITIAL_RESOURCES,
  INITIAL_TESTIMONIALS,
  INITIAL_WEBSITE_CONTENT,
} from '../data/initialData';

const STORAGE_KEYS = {
  COURSES: 'tp_courses_v1',
  OFFERS: 'tp_offers_v1',
  RESOURCES: 'tp_resources_v1',
  TESTIMONIALS: 'tp_testimonials_v1',
  ENQUIRIES: 'tp_enquiries_v1',
  CONTENT: 'tp_content_v1',
  ADMIN_AUTH: 'tp_admin_session_v1',
};

// --- Courses ---
export function getCourses(): Course[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COURSES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
      return INITIAL_COURSES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading courses from storage', e);
    return INITIAL_COURSES;
  }
}

export function saveCourse(course: Course): Course[] {
  const courses = getCourses();
  const index = courses.findIndex((c) => c.id === course.id);
  let updated: Course[];
  if (index >= 0) {
    updated = [...courses];
    updated[index] = course;
  } else {
    updated = [course, ...courses];
  }
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(updated));
  return updated;
}

export function deleteCourse(courseId: string): Course[] {
  const courses = getCourses();
  const updated = courses.filter((c) => c.id !== courseId);
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(updated));
  return updated;
}

export function getCourseBySlug(slug: string): Course | undefined {
  const courses = getCourses();
  return courses.find((c) => c.slug === slug || c.id === slug);
}

// --- Offers ---
export function getOffers(): SpecialOffer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.OFFERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(INITIAL_OFFERS));
      return INITIAL_OFFERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading offers from storage', e);
    return INITIAL_OFFERS;
  }
}

export function saveOffer(offer: SpecialOffer): SpecialOffer[] {
  const offers = getOffers();
  const index = offers.findIndex((o) => o.id === offer.id);
  let updated: SpecialOffer[];
  if (index >= 0) {
    updated = [...offers];
    updated[index] = offer;
  } else {
    updated = [offer, ...offers];
  }
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(updated));
  return updated;
}

export function deleteOffer(offerId: string): SpecialOffer[] {
  const offers = getOffers();
  const updated = offers.filter((o) => o.id !== offerId);
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(updated));
  return updated;
}

// --- Resources ---
export function getResources(): LearningResource[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RESOURCES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(INITIAL_RESOURCES));
      return INITIAL_RESOURCES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading resources', e);
    return INITIAL_RESOURCES;
  }
}

export function saveResource(resource: LearningResource): LearningResource[] {
  const resources = getResources();
  const index = resources.findIndex((r) => r.id === resource.id);
  let updated: LearningResource[];
  if (index >= 0) {
    updated = [...resources];
    updated[index] = resource;
  } else {
    updated = [resource, ...resources];
  }
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(updated));
  return updated;
}

export function deleteResource(resourceId: string): LearningResource[] {
  const resources = getResources();
  const updated = resources.filter((r) => r.id !== resourceId);
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(updated));
  return updated;
}

// --- Testimonials ---
export function getTestimonials(): Testimonial[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
      return INITIAL_TESTIMONIALS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error loading testimonials', e);
    return INITIAL_TESTIMONIALS;
  }
}

export function saveTestimonial(testimonial: Testimonial): Testimonial[] {
  const testimonials = getTestimonials();
  const index = testimonials.findIndex((t) => t.id === testimonial.id);
  let updated: Testimonial[];
  if (index >= 0) {
    updated = [...testimonials];
    updated[index] = testimonial;
  } else {
    updated = [testimonial, ...testimonials];
  }
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
  return updated;
}

export function deleteTestimonial(id: string): Testimonial[] {
  const list = getTestimonials();
  const updated = list.filter((t) => t.id !== id);
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(updated));
  return updated;
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

// Export Enquiries as CSV
export function exportEnquiriesCSV(): void {
  const enquiries = getEnquiries();
  if (enquiries.length === 0) {
    alert('No enquiries available to export.');
    return;
  }
  const headers = ['ID', 'Date', 'Name', 'Email', 'Phone', 'Course of Interest', 'Status', 'Message'];
  const rows = enquiries.map((e) => [
    e.id,
    new Date(e.submittedAt).toLocaleString(),
    `"${e.name.replace(/"/g, '""')}"`,
    e.email,
    e.phone,
    `"${e.courseName.replace(/"/g, '""')}"`,
    e.status,
    `"${(e.message || '').replace(/"/g, '""')}"`,
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `trading_pathshala_enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function getWebsiteContent(): WebsiteContent {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CONTENT);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(INITIAL_WEBSITE_CONTENT));
      return INITIAL_WEBSITE_CONTENT;
    }
    const parsed = JSON.parse(raw);
    const merged: WebsiteContent = {
      ...INITIAL_WEBSITE_CONTENT,
      ...parsed,
      brandName: 'Trading Pathshala',
      tagline: 'Learn the Art of Trading',
      contactPerson: 'Prashant Kumar Sinha',
      officialPhone: '+91 89875 99799',
      whatsappNumber: '+91 89875 99799',
      instagramHandle: '@tradingpathsala',
      instagramUrl: 'https://www.instagram.com/tradingpathsala/',
      businessCategory: 'Financial Service, Financial Planner',
      officeAddress: 'Trading Pathshala\n3rd Floor, Mahadev Inn,\nJalsar Road, Shivganga Muhalla,\nDeoghar, Jharkhand – 814112, India.',
      googleMapsDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Trading+Pathshala,+3rd+Floor,+Mahadev+Inn,+Jalsar+Road,+Shivganga+Muhalla,+Deoghar,+Jharkhand+814112,+India',
    };
    return merged;
  } catch (e) {
    console.error('Error loading content', e);
    return INITIAL_WEBSITE_CONTENT;
  }
}

export function saveWebsiteContent(content: WebsiteContent): WebsiteContent {
  localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(content));
  return content;
}


// Reset everything to default initial data
export function resetAllDataToDefault(): void {
  localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(INITIAL_COURSES));
  localStorage.setItem(STORAGE_KEYS.OFFERS, JSON.stringify(INITIAL_OFFERS));
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(INITIAL_RESOURCES));
  localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(INITIAL_TESTIMONIALS));
  localStorage.setItem(STORAGE_KEYS.CONTENT, JSON.stringify(INITIAL_WEBSITE_CONTENT));
}
