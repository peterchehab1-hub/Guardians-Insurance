
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
