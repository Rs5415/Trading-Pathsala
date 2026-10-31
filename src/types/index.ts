export interface Lesson {
  title: string;
  duration?: string;
}

export interface CurriculumModule {
  moduleTitle: string;
  lessons: string[];
  duration: string;
}

export interface Course {
  id: string;
  slug: string;
  name: string;
  category: 'Beginner' | 'Intermediate' | 'Advanced';
  shortDescription: string;
  fullDescription: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  originalPrice: number;
  image: string;
  tags: string[];
  highlights: string[];
  curriculum: CurriculumModule[];
  prerequisites: string;
  featured?: boolean;
}

export interface EducationalService {
  id: string;
  title: string;
  focus: string;
  description: string;
  outcomes: string[];
}

export interface SpecialOffer {
  id: string;
  title: string;
  code: string;
  description: string;
  discount: string;
  validTill: string;
  bannerImage?: string;
  applicableCourses: string;
  isActive: boolean;
}

export interface LearningResource {
  id: string;
  title: string;
  category: 'Study Materials' | 'Trading Guides' | 'Market Basics' | 'Technical Analysis' | 'Educational Articles';
  readTime: string;
  summary: string;
  content: string;
  downloadLabel?: string;
  tags: string[];
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  experienceLevel: string;
  feedback: string;
  courseTaken: string;
  isSample: boolean;
  rating: number;
  date: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email?: string;
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
  instagramHandle: string;
  instagramUrl: string;
  businessCategory: string;
  announcementText: string;
  heroHeadline: string;
  heroSubheading: string;
  officeAddress: string;
  googleMapsDirectionsUrl: string;
}


export type PageView =
  | 'home'
  | 'about'
  | 'courses'
  | 'course-detail'
  | 'services'
  | 'why-us'
  | 'resources'
  | 'offers'
  | 'contact'
  | 'location'
  | 'admin';
