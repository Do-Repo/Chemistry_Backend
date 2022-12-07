import { ObjectId } from 'mongoose';

import coursesModel, { Courses } from '../models/courses';


export const createCourse = async (input: Partial<Courses>) => {
    try {
        const course = await coursesModel.create(input);
        return course;
    } catch (err: any) {
        throw new Error(err);
    }
};

export const deleteCourse = async (id: string) => {
    try {
        return await coursesModel.findByIdAndDelete(id);
    } catch (err: any) {
        throw new Error(err);
    }
};

export const checkIfMine = async (id: string, owner: ObjectId) => {
    try {
        const courses = await coursesModel.findById(id);
  
        if(courses != null && (courses.owner.toString() === owner.toString())){
            return true
        }

        return false
    } catch (err: any) {
        throw new Error(err);
    }
}

const updateCourse = async (id: string, input: Partial<Courses>) => {
    try {
        return await coursesModel.findByIdAndUpdate
            (id, input, { new: true, runValidators: true }).then((course) => {
                if (!course) {
                    throw new Error('Course not found');
                } else return course;
            });
    } catch (err: any) {
        throw new Error(err);
    }
};

export const getAllCourses = async () => {
    try {
        const courses = await coursesModel.find();
        return courses;
    } catch (err: any) {
        throw new Error(err);
    }
}

export const  getCourseById = async (id: string) => {
    try {
        const course = await coursesModel.findById(id).lean();
        return course;
    } catch (err: any) {
        throw new Error(err);
    }
};

export const updateContent = async (id: string, input: Partial<Courses>) => {
   return updateCourse(id, { content: input.content });
};

export const addLike = async (id: string) => {
    const course = await getCourseById(id);
    if (course) 
    return updateCourse(id, { likes: course.likes + 1 });
    else throw new Error('Course not found');
};

export const removeLike = async (id: string) => {
    const course = await getCourseById(id);
    if (course)
    return updateCourse(id, { likes: course.likes - 1 });
    else throw new Error('Course not found');
};

