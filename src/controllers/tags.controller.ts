import { NextFunction, Request, Response } from "express";
import { getTags, createTag, deleteTag } from "../services/tags.service";


export const getTagsHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tags = await getTags();
        res.status(200).json({
            status: 'success',
            data: {
                tags,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const createTagHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tag = await createTag(req.body);
        res.status(200).json({
            status: 'success',
            data: {
                tag,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const deleteTagHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const tag = await deleteTag(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tag,
            },
        });
    } catch (err: any) {
        next(err);
    }
};