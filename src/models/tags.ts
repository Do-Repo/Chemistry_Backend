import {
    getModelForClass,
    index,
    modelOptions,
    prop,
    pre
} from '@typegoose/typegoose';
import mongoose from 'mongoose';

@index({ index: 1})
@pre<Tags>('save', async function (){})

@modelOptions({
    schemaOptions: {
        timestamps: true
    }
})

export class Tags {
    @prop({ required: true })
    colorCode: string;

    @prop({ required: true, minlength: 3, maxlength: 200 })
    name: string;

}

const tagsModel = getModelForClass(Tags);
export default tagsModel;
