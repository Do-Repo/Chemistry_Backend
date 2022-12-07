import {
    getModelForClass,
    index,
    modelOptions,
    prop,
    pre
} from '@typegoose/typegoose';
import mongoose from 'mongoose';


@index({ index: 1})
@pre<Courses>('save', async function (){})

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class Courses {
    @prop({ required: true })
    owner: mongoose.Schema.Types.ObjectId;

    @prop({ required: true, minlength: 3, maxlength: 200 })
    title: string;

    @prop({ required: true, minlength: 3, maxlength: 200 })
    content: string;

    @prop({ required: true, minlength: 3, maxlength: 200 })
    thumbnail: string;

    @prop({ required: true, minlength: 3, maxlength: 200 })
    category: string;

    @prop({ required: true, minlength: 1, maxlength: 200 })
    tags: string[];

    @prop({ required: true, default: 0 })
    price: number;
    
    @prop({ default: 'null' })
    publicid : string;

    @prop({ required: true, default: 0 })
    likes: number;
}

const coursesModel = getModelForClass(Courses);
export default coursesModel;