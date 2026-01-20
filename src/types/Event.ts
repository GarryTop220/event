export interface Event {
  id: number;
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  status: 'active' | 'cancelled' | 'completed';
  category: string;
  image?: string;
  organizer: string;
  capacity?: number;
  registeredCount?: number;
}

export interface EventFormData {
  title: string;
  description: string;
  fullDescription: string;
  date: string;
  time: string;
  location: string;
  status: Event['status'];
  category: string;
  organizer: string;
  capacity?: number;
}