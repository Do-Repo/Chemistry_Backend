import { array, object, string, z } from 'zod';

export const createCourseSchema = object({
    body: object({
        title: string({ required_error: 'Title is required' }),
        content: string({ required_error: 'Content is required' }),
        thumbnail: string({ required_error: 'Thumbnail is required' }),
        category: string({ required_error: 'Category is required' }),
        price: string({ required_error: 'Price is required' }),
        tags: array(string()).nonempty(),
    }),
});

export type CreateCourseInput = z.infer<typeof createCourseSchema>['body'];