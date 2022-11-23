import { NextFunction, Request, Response } from "express";
import { Token }  from "../schema/token.schema"
import { findAllUsers, updateUser, findUserById } from '../services/user.service';

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

export const updateProfileHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await updateUser(res.locals.user._id, req.body)
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        })
    }catch(err: any){
        next(err);
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
