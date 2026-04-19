
export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;
}

export interface Partner {
  name: string;
  logo: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  image: string;
}

export type InsuranceType = 'car' | 'medical' | 'travel' | 'life' | 'home' | 'business';

export interface ComparisonResult {
  company: string;
  priceLevel: 'Low' | 'Medium' | 'High';
  flexibility: string;
  claimsSpeed: string;
  networkStrength: string;
  bestUseCase: string;
  isRecommended?: boolean;
}
