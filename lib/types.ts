export interface USER {
  _id: string;
  linkedFutsalId?: string;
  name: string;
  image: string;
  password?: string;
  phone: string;
  email?: string;
  userType: string;
  status: boolean;
  createdDate: Date;
  setupPasswordToken?: string;
  forgotPasswordToken?: string;
  forgotPasswordTokenExpiry?: Date;
  verifyToken?: string;
  verifyTokenExpiry?: Date;
}

export interface PLAYER {
  _id: string;
  linkedUserId: string;
  email?: string;
  name: string;
  image: string;
  phone: string;
  address: string;
  status: string;
  createdDate: Date;
}


export interface PLAYERREPORT {
  _id: string;
  linkedPlayerId: string;
  linkedFutsalId: string;
  category: string;
  description: string;
  reportedDate: Date;
}

export interface shiftDetailSchema {
  startTime: String;
  endTime: String;
  price: String;
}

export interface shiftSchema {
  morningShift: shiftDetailSchema;
  dayShift: shiftDetailSchema;
  eveningShift: shiftDetailSchema;
  holidayShift: shiftDetailSchema;
}

export interface COURT {
  _id: string;
  linkedUserId: string;
  image: string;
  name: string;
  openingTime: Date;
  closingTime: Date;
  shifts: shiftSchema;
  status: boolean;
  createdDate: Date;
  bookings?: any;
}

export interface itemPurchasedSchema {
  name: string;
  quantity: number;
  price: number;
}

export interface BOOKING {
  _id: string;
  linkedUserId: string;
  linkedFutsalId: string;
  linkedCourtId: string;
  selectedDate: Date;
  selectedslots: string[];
  remarks: string;
  itemPurchased: itemPurchasedSchema[];
  discount: string;
  slotsTotal: string;
  netTotal: string;
  status: string;
  createdDate: Date;
  name?: string;
  image?: string;
  phone?: string;
  playerId?:string;
}

export interface AUTHCONFIGURATION {
  _id: string;
  bannerImage: string;
  createdDate: Date;
}

export interface socialLinksSchema {
  facebook: string;
  instagram: string;
  linkedIn: string;
  twitter: string;
}

export interface FUTSALPROFILE {
  _id: string;
  linkedUserId: string;
  subdomain: string;
  name: string;
  email: string;
  about: string;
  mapLink: string;
  embeddMapLink: string;
  phone: string;
  address: string;
  image: string;
  socialLinks: socialLinksSchema;
  createdDate: Date;
}

export interface BILLINGS {
  _id: string;
  linkedUserId: string;
  companyName: string;
  billingEmail: string;
  billingPhone: string;
  billingAddress: string;
  createdDate: Date;
  subscription?: SUBSCRIPTION;
}

export interface SUBSCRIPTION {
  _id: string;
  linkedUserId: string;
  price: string;
  planName: string;
  subscribedDate: Date;
  expiryDate: Date;
  createdDate: Date;
}

export interface FUTSALPROFILEWITHSUBSCRIPTION {
  _id: string;
  linkedUserId: string;
  subdomain: string;
  name: string;
  email: string;
  about: string;
  mapLink: string;
  embeddMapLink: string;
  phone: string;
  address: string;
  image: string;
  socialLinks: socialLinksSchema;
  createdDate: Date;
  subscription: SUBSCRIPTION;
}

export interface GALLERY {
  _id: string;
  linkedUserId: string;
  image: string;
  postedDate: string;
}

export interface NEWSEVENT {
  _id: string;
  linkedUserId: string;
  slug: string;
  title: string;
  image: string;
  description: string;
  status: boolean;
  createdDate: Date;
}

export interface AMENITIESDETAIL {
  title: string;
  isAvailable: boolean;
}
export interface AMENITIES {
  _id: string;
  linkedUserId: string;
  amenities: AMENITIESDETAIL[];
  createdDate: Date;
}

export interface LOGOCONFIGURATION {
  _id: string;
  logo: string;
  createdDate: Date;
}

export interface CONTACTCONFIGURATION {
  _id: string;
  whatsappLink: string;
  phone: string;
  callSchedule: string;
  email: string;
  createdDate: Date;
}

export interface PLANS {
  _id: string;
  image: string;
  name: string;
  price: string;
  month: string;
  createdDate: Date;
}
