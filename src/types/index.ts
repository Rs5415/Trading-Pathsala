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
  | 'resources'
  | 'contact'
  | 'student-login';
