import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const createTokenSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    token: {
        type: String,
        required: true,
    }
})

export const Token = mongoose.model("token", createTokenSchema);

