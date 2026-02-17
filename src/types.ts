export interface Message {
  _id: string;
  text: string;
  from: string;
  createdAt: string;
}

export interface Visitor {
  _id: string;
  visitorNumber: number;
  browser: string;
  os: string;
  device: string;
  ip: string;
  city: string;
  country: string;
  isRead: boolean;
  createdAt: string;
  features?: {
    chat?: "enabled" | "pending";
    visitorCountry?: "enabled" | "pending";
    whatsapp?: "enabled" | "pending";
    paymentCard?: "enabled" | "pending";
    blockUnregisteredInChat?: "enabled" | "pending";
  };
  messages?: {
    data: Message[];
    pagesNumber: number;
    totalCount: number;
  };
  fullName?: string;
  phone: string;
  idNumber: string;
  bankAccount?: {
    iban: string;
    bankName: string;
    accountHolderName: string;
    transferPurpose: string;
  };
  whatsAppNumber?: string;
  blockedCardPrefixes?: string[];
}

export interface MainInfo extends Visitor {
  apiKey?: string;
  date?: string;
  socketId?: string;
  page?: string;
}

export interface Form {
  content: string;
  date: string;
  id: string;
  visitorId?: string;
}
