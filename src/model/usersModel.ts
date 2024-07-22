import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    phone: string;
    twoFAEnabled: boolean;
    twoFAMethod: 'sms' | 'mail';
    twoFACode: string;
    verified: boolean;
    profile: {
        firstName: string;
        lastName: string;
    };
}

const userSchema = new Schema<IUser>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, default: '' },
    twoFAEnabled: { type: Boolean, default: false },
    twoFAMethod: { type: String, default: 'sms' },
    twoFACode: { type: String },
    verified: { type: Boolean, default: false },
    profile: {
        firstName: { type: String, default: '' },
        lastName: { type: String, default: '' }
    }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema,"User");

export default User;
