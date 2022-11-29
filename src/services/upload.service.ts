import sharp from 'sharp';
import { NextFunction, Request, Response } from "express";


export const uploadImage = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await sharp(req.file!.buffer).resize({ width: 250, height: 250 }).png().toFile(`uploads/${req.file!.filename}.png`);
        res.status(200).json({
            status: 'success',
        });
    } catch (err: any) {
        next(err);
    }
}
