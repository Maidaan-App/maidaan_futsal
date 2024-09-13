export interface USER {
  _id: string;
  name: string;
  password?: string;
  image: string;
  email: string;
  userType: string;
  createdDate: Date;
  status: boolean;
  setupPasswordToken?: string,
  forgotPasswordToken?: string,
  forgotPasswordTokenExpiry?: Date,
  verifyToken?: string,
  verifyTokenExpiry?: Date
}

export interface PLAYER {
  _id: string;
  linkedUserId:string;
  image: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  status: string;
  createdDate: Date;
}


export interface COURT {
  _id: string;
  linkedUserId:string;
  image: string;
  name: string;
  openingTime: string;
  closingTime: string;
  status: string;
  createdDate: Date;
}