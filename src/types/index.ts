export interface Testimonial {
  id: number;
  name: string;
  company: string;
  image: string;
  content: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

export interface CaseStudy {
  id: number;
  title: string;
  description: string;
  image: string;
  results: string[];
}