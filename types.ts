
export interface Motor {
  id: string;
  name: string;
  brand: string;
  type: MotorType;
  condition: 'New' | 'Used';
  price: number;
  marketPrice?: number; // Used for reference on Used bikes
  engine: string;
  colors: string[];
  imageUrl: string;
  description: string;
  year: number;
  location: string;
  isPopular?: boolean;
  isReady: boolean;
  promoExpiry?: string;
  bonus?: string[];
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

export interface CreditApplication {
  fullName: string;
  nik: string;
  phone: string;
  address: string;
  motorId: string;
  tenure: number;
  dpAmount: number;
  installment: number;
  paymentMethod: string;
}
