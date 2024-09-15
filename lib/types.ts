export interface USER {
  _id: string;
  linkedFutsalId?: string;
  name: string;
  image: string;
  password?: string;
  email: string;
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
  email: string;
  name: string;
  image: string;
  phone: string;
  address: string;
  status: string;
  createdDate: Date;
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
  openingTime: string;
  closingTime: string;
  shifts: shiftSchema;
  status: boolean;
  createdDate: Date;
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
  itemPurchased: itemPurchasedSchema[];
  status: string;
  createdDate: Date;
}


export interface AUTHCONFIGURATION {
  _id: string;
  bannerImage: string;
  createdDate: Date;

}