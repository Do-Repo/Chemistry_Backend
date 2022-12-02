import { NextFunction, Request, Response } from "express";
import { Token }  from "../schema/token.schema"
import { findAllUsers, updateUser, findUserById } from '../services/user.service';
import { uploadToCloudinary, removeFromCloudinary } from '../middleware/cloudinary';

export const getMeHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = res.locals.user;
        res.status(200).json({
            status: 'success',
            result: [{user}]         
        });
    } catch (err: any) {
        next(err);
    }
}

export const setProfilePictureHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(req.body)
        const data = await uploadToCloudinary(req.file!.path, 'image');

        const user = await updateUser(res.locals.user._id, { avatarUrl: data.url, publicid: data.public_id });
        res.status(200).json({
            status: 'success',
            user,
        });
    }catch (err: any) {
        next(err);
    }
    
}

export const deleteProfilePictureHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        
        const user = await updateUser(res.locals.user._id, { avatarUrl: "" });
        const publicid = user.publicid;
        await removeFromCloudinary(publicid);
        
        res.status(200).json({
            status: 'success',
            user,
        });
    }catch (err: any) {
        next(err);
    }
}




export const updateProfileHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try {
        const user = await updateUser(res.locals.user._id, req.body)
        res.status(200).json({
            status: 'success',
            user,  
        })
    }catch(err: any){
        next(err);
        console.log(err)
    }
}
    

export const getAllUsersHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await findAllUsers();
        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users,
            },
        });
    } catch (err: any) {
        next(err);
    }
}

export const verifyUserHandler = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await findUserById(req.params.id);
        if (!user) return res.status(404).send("Invalid user")

        const token = Token.findOne({
            userId: user._id,
            token: req.params.token
        })
        if(!token) return res.status(404).send("Invalid user")
        
        await updateUser(user._id, ({ isVerified: true })) ;
        await Token.findByIdAndRemove((await token)?._id);

        res.status(200).send("Email verified sucessfully!")
    }catch(err: any){
        next(err)
    }
}
