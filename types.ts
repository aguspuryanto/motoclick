
export interface Motor {
  id: string;
  name: string;
  brand: string;
  type: MotorType;
  price: number;
  engine: string;
  colors: string[];
  imageUrl: string;
  description: string;
  isPopular?: boolean;
}

export enum MotorType {
  MATIC = 'Matic',
  SPORT = 'Sport',
  CUB = 'Cub',
  BIG_BIKE = 'Big Bike',
  ELECTRIC = 'Electric'
}

export interface CreditPlan {
  tenure: number; // in months
  interestRate: number; // percentage
  downPayment: number;
}

export interface MembershipTier {
  name: string;
  color: string;
  benefits: string[];
  minPurchase: number;
}
