import { userTypes } from '@/lib/constants';
import { Schema, model, models, Model } from 'mongoose';


const Userchema = new Schema({
  name: String,
  image: String,
  password: String,
  email: {
    type: String,
    required:[true, "Email is required"],
    unique: true,
  },
  userType: {
    type: String,
    enum: userTypes,
    default: 'player',
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  setupPasswordToken: String,
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date
}, { strict: false });

let User: Model<any>;
try {
  User = models.User || model('User', Userchema, 'User');
} catch (error) {
  User = model('User', Userchema, 'User');
}

export default User;