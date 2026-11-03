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
  announcementText?: string;
}

export type PageView =
  | 'home'
  | 'about'
  | 'courses'
  | 'course-detail'
  | 'why-us'
  | 'google-profile'
  | 'student-login'
  | 'contact';
