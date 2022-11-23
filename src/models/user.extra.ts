import {
    getModelForClass,
    index,
    modelOptions,
    prop,
    pre
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

@index({ index: 1})
@pre<UserExtras>('save', async function (){})

@modelOptions({
    schemaOptions: {
        timestamps: false
    }
})

export class UserExtras {
    @prop({ required: false })
    owner: mongoose.Schema.Types.ObjectId;

    @prop({ required: false, maxlength: 200 })
    likedCourses: mongoose.Schema.Types.ObjectId[];

    @prop({ required: false, maxlength: 200 })
    followingMentors: mongoose.Schema.Types.ObjectId[];
}

const userExtrasModel = getModelForClass(UserExtras);
export default userExtrasModel;