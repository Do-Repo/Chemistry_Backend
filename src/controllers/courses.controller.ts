import { addLike, removeLike, createCourse, getCourseById, updateContent, deleteCourse, checkIfMine, getAllCourses } from '../services/courses.service';
import { NextFunction, Request, Response } from "express";
import {  addLikedCourse, removeLikedCourse } from './user.extras.controller';
import  { User } from '../models/user';
import { uploadToCloudinary } from '../middleware/cloudinary';



export const postCourseHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const data = await uploadToCloudinary(req.file!.path, 'image');       
        const courses = await createCourse({
            owner: res.locals.user._id,
            title: req.body.title,
            content: req.body.content,
            thumbnail: data!.url,
            publicid: data!.public_id,
            category: req.body.category,
            price: req.body.price,
            tags: req.body.tags,
        });

        res.status(200).json({
            status: 'success',
            courses,
        });
    } catch (err: any) {
        next(err);
    }
};

export const getCourseHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const course = await getCourseById(req.params.id);
        res.status(200).json({
            status: 'success',
            
                course,
        
        });
    } catch (err: any) {
        next(err);
    }
};

export const getCoursesHandler =  async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const courses = await getAllCourses();
        res.status(200).json({
            status: "success",
            courses
        })

    } catch (err: any) {
        next(err)
    }
}

export const updateContentHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const course = await updateContent(req.params.id, req.body);
        res.status(200).json({
            status: 'success',
            data: {
                course,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const addLikeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user : User = res.locals.user;
        const course = await addLike(req.params.id);
        await addLikedCourse(user.extras, course._id);

        res.status(200).json({
            status: 'success',
            message: 'Course liked',
            data: {
                likedCourse: course._id,
                likedBy: res.locals.user._id,
            },
        });
    } catch (err: any) {
        next(err);
    }
};

export const removeLikeHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user  = res.locals.user;
        const course = await removeLike(req.params.id);
        await removeLikedCourse(user.extras, course._id);

        res.status(200).json({
            status: 'success',
            message: 'Like removed',
            data: {
                dislikedCourse: req.params.id,
                dislikedBy: user._id,
            },
        });
    }catch (err: any) {
        next(err);
    }
}

export const removeCourseHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        if(await checkIfMine(req.params.id, res.locals.user._id) == true)
        {
            await deleteCourse(req.params.id);

            res.status(200).json({
                status: 'success',
                message: 'Course removed'
            })
        }else{
            res.status(400).json({
                status: 'failed',
                message: 'You do not own this course'
            })
        }
    }catch (err: any){
        next(err);
    }
}
    