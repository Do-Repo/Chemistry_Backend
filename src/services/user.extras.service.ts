import userExtrasModel from '../models/user.extra';
import { ObjectId } from 'mongoose';

export const setOwner = async (id: string) => {
    try {
        return await userExtrasModel.findByIdAndUpdate(id, { owner: id }, { new: true, runValidators: true })
    } catch (err: any) {
        throw new Error(err);
    }

}

export const createExtras = async () => {
    try {
        return await userExtrasModel.create({});
    } catch (err: any) {
        throw new Error(err);
    }
}

export const getExtras = async (id: ObjectId) => {
    try {
        return await userExtrasModel.findById(id);
    } catch (err: any) {
        throw new Error(err);
    }
}

export const addLikedCourse = async (id: ObjectId, courseId: ObjectId) => {
    try {
        return await userExtrasModel.findByIdAndUpdate(id, { $push: { likedCourses: courseId } }, { new: true, runValidators: true });
    } catch (err: any) {
        throw new Error(err);
    }
}

export const removeLikedCourse = async (id: ObjectId, courseId: ObjectId) => {
    try {
        return await userExtrasModel.findByIdAndUpdate(id, { $pull: { likedCourses: courseId } }, { new: true, runValidators: true });
    } catch (err: any) {
        throw new Error(err);
    }
}

export const addBoughtCourses = async (id: ObjectId, courseIds: ObjectId[]) => {
    try {
        return await userExtrasModel.findByIdAndUpdate(id, { $push: { boughtCourses: courseIds } }, { new: true, runValidators: true });
    } catch (err: any) {
        throw new Error(err);
    }
}