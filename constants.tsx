
import { Service, TeamMember, Partner, Testimonial } from './types.ts';
import homeImg from './src/assets/images/home-insurance.png';
import carImg from './src/assets/images/car-insurance.png';
import medicalImg from './src/assets/images/medical-insurance.png';
import lifeImg from './src/assets/images/life-insurance.png';
import travelImg from './src/assets/images/travel-insurance.png';
import businessImg from './src/assets/images/business-insurance.png';

export const SERVICES_DATA: Service[] = [
  {
    id: 'home',
    title: 'Home Insurance',
    icon: '🏠',
    shortDescription: 'Comprehensive protection for your home and belongings.',
    fullDescription: 'Our home insurance covers fire, theft, natural disasters, and third-party liability. We ensure your most valuable asset is protected against unforeseen circumstances with 24/7 support and fast claim processing.',
    imageUrl: homeImg
  },
  {
    id: 'car',
    title: 'Car Insurance',
    icon: '🚗',
    shortDescription: 'Flexible coverage for all your road adventures.',
    fullDescription: 'From comprehensive plans to third-party liability, our auto insurance keeps you moving. Includes roadside assistance, towing services, and coverage for accidental damage or theft across Lebanon.',
    imageUrl: carImg
  },
  {
    id: 'medical',
    title: 'Medical Insurance',
    icon: '🏥',
    shortDescription: 'Health first. World-class medical coverage.',
    fullDescription: 'Access to the top hospitals and clinics in the country. Our plans cover outpatient consultations, surgeries, medications, and maternity with competitive premiums tailored for individuals and families.',
    imageUrl: medicalImg
  },
  {
    id: 'life',
    title: 'Life Insurance',
    icon: '🛡️',
    shortDescription: 'Secure your family\'s future and financial stability.',
    fullDescription: 'Life is unpredictable. Ensure your loved ones are financially protected. Our life insurance offers term and whole-life policies that provide peace of mind and long-term security.',
    imageUrl: lifeImg
  },
  {
    id: 'travel',
    title: 'Travel Insurance',
    icon: '✈️',
    shortDescription: 'Worry-free journeys around the globe.',
    fullDescription: 'Whether it is for business or leisure, our travel insurance covers medical emergencies abroad, trip cancellations, lost luggage, and flight delays. Compliant with Schengen visa requirements.',
    imageUrl: travelImg
  },
  {
    id: 'business',
    title: 'Business Insurance',
    icon: '💼',
    shortDescription: 'Protecting your enterprise and professional assets.',
    fullDescription: 'Tailored solutions for businesses of all sizes. From property and liability to employee benefits and cargo protection, we help your business thrive with confidence.',
    imageUrl: businessImg
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Elias Harb', role: 'Chief Executive Officer', image: 'https://picsum.photos/id/1011/300/300' },
  { name: 'Sarah Mansour', role: 'Head of Operations', image: 'https://picsum.photos/id/1027/300/300' },
  { name: 'John Doe', role: 'Senior Risk Analyst', image: 'https://picsum.photos/id/1005/300/300' },
  { name: 'Laila Koussa', role: 'Claims Manager', image: 'https://picsum.photos/id/1012/300/300' }
];

export const PARTNERS: Partner[] = [
  { name: 'Bankers', logo: 'https://placehold.co/200x100/1e3a5f/ffffff?text=Bankers' },
  { name: 'Fidelity', logo: 'https://placehold.co/200x100/1e3a5f/ffffff?text=Fidelity' },
  { name: 'UFA', logo: 'https://placehold.co/200x100/1e3a5f/ffffff?text=UFA' },
  { name: 'Solidarity', logo: 'https://placehold.co/200x100/1e3a5f/ffffff?text=Solidarity' },
  { name: 'Securite', logo: 'https://placehold.co/200x100/1e3a5f/ffffff?text=Securite' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Rami Zeidan',
    role: 'Business Owner',
    content: 'Guardians Insurance helped me navigate a complex set of business risks. Their local presence makes all the difference when you need immediate answers.',
    image: 'https://picsum.photos/id/1011/300/300'
  },
  {
    name: 'Maya Khoury',
    role: 'Homeowner',
    content: 'Very impressed with the efficiency of their claims process. When my apartment was damaged, they handled everything with extreme professionalism.',
    image: 'https://picsum.photos/id/1027/300/300'
  },
  {
    name: 'George Haddad',
    role: 'Frequent Traveler',
    content: 'I never travel without their coverage. It is comprehensive, affordable, and gives me true peace of mind wherever I am in the world.',
    image: 'https://picsum.photos/id/1005/300/300'
  }
];
