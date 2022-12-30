import {
    getModelForClass,
    index,
    modelOptions,
    prop,
    pre
} from '@typegoose/typegoose';
import bcrypt from 'bcryptjs';
import mongoose, { Document } from 'mongoose';

@index({ email: 1})
@pre<User>('save', async function (){
    // Hash password if the password is new or was modified
    if(!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 10);
})
// Add createdAt and updatedAt fields
@modelOptions({ 
    schemaOptions: { 
        timestamps: true 
    }
})

export class User extends Document {
    @prop({ required: true, minlength: 3, maxlength: 200 })
    name: string;

    @prop({ required: true, unique: true })
    email: string;

    @prop({ required: true, minlength: 8, maxlength: 100, select: false })
    password: string;

    @prop({ required: true })
    phone: string;

    @prop({ required: true, default: 'Student', enum: ['Student', 'Admin', 'Teacher'] })
    role: string;

    @prop({ required: true, default: false })
    isVerified: boolean;

    @prop({ required: true })
    extras: mongoose.Schema.Types.ObjectId;

    @prop({required: true })
    avatarUrl: string;

    @prop({ default: 'null' })
    publicid : string;

    async comparePassword(hashedPassword: string, candidatePassword: string) {
        return await bcrypt.compare(candidatePassword, hashedPassword);
    }
}

const UserModel = getModelForClass(User);
export default UserModel;