import tagsModel, { Tags } from "../models/tags";

export const createTag = async (input: Partial<Tags>) => {
    try {
        const tag = await tagsModel.create(input);
        return tag;
    } catch (err: any) {
        throw new Error(err);
    }
};

export const deleteTag = async (id: string) => {
    try {
        return await tagsModel.findByIdAndDelete(id);
    } catch (err: any) {
        throw new Error(err);
    }
};

export const getTags = async () => {
    try {
        return await tagsModel.find();
    } catch (err: any) {
        throw new Error(err);
    }
};

export const getTagByName = async (name: string) => {
    try {
        return await tagsModel.findOne({ name });
    } catch (err: any) {
        throw new Error(err);
    }
};

