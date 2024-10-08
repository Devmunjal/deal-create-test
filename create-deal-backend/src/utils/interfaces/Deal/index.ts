export interface CreateDealInput {
  customerId: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  images?: string[];
  roomAreaInMeters: number;
  peopleRequired: number;
  status: string;
}
