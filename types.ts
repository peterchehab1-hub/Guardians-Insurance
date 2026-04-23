
export interface Service {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  image?: string;
  imageUrl?: string;
  category?: string;
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
export type UserRole = 'admin' | 'staff' | 'client';

export interface UserProfile {
  uid: string;
  email: string;
  role: UserRole;
  displayName?: string;
  clientId?: string; // Links a client user to their client record
  name?: string;
  phone?: string;
  address?: string;
  policyType?: string;
  policyNumber?: string;
  premium?: number | string;
}

export interface ComparisonResult {
  company: string;
  priceLevel: 'Low' | 'Medium' | 'High';
  flexibility: string;
  claimsSpeed: string;
  networkStrength: string;
  bestUseCase: string;
  isRecommended?: boolean;
}
