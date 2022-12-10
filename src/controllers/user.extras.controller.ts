import { getExtras, addBoughtCourses } from '../services/user.extras.service';
import { NextFunction, Request, Response } from "express";
import { ObjectId } from 'mongoose';

export const getExtrasHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        console.log(user._id)
        const extras = await getExtras(user.extras)
        res.status(200).json({
            status: 'success',
            user,
            extras,
        });
    } catch (err: any) {
        next(err);
    }

}

export const buyCourseHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        const course = req.body.courses;
        const extras = await addBoughtCourses(user.extras, course)
        res.status(200).json({
            status: 'success',
            user,
            extras,
        });
    }
    catch (err: any) {
        next(err);
    }
}

