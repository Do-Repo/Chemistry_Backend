import config from 'config';
import { CookieOptions, NextFunction, Request, Response } from 'express';
import { Token } from '../schema/token.schema';
import { CreateUserInput, LoginUserInput } from '../schema/user.schema';
import { createUser, findUser, singToken } from '../services/user.service';
import AppError from '../utils/appError';
import crypto from 'crypto';
import { sendEmail } from '../utils/email';
import { createExtras, setOwner, getExtras } from '../services/user.extras.service';

export const excludedFields = ['password'];

const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + config.get<number>('accessTokenExpiresIn') * 60 * 1000
    ),
    maxAge: config.get<number>('accessTokenExpiresIn') * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
}

if (process.env.NODE_ENV === 'production')
    accessTokenCookieOptions.secure = true;

export const registerHandler = async (
    req: Request<{}, {}, CreateUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        console.log(req.body)
        const extras = await createExtras();
        if(!extras) throw new AppError('Error creating extras', 500);

        const user = await createUser({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name,
            phone: req.body.phone,
            extras: extras._id,
            avatarUrl: 'https://ui-avatars.com/api/?name=' + req.body.name ,
        })

        await setOwner(user._id);

        let token = new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const message = `${process.env.BASE_URL}/user/verify/${user.id}/${(await token).token}`;
        const emailSent = await sendEmail(req.body.email, "Verify Email", message);
        console.log(req.body)
        res.status(201).json({
            status: 'success',
            message: (emailSent) ? 'An Email has been sent to verify your account' : "Email could not be sent",
            user,            
        })
    } catch (err: any) {
        console.log(req.body);
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Email already exists',
            })
        }
        next(err);
    }
}

export const loginHandler = async (
    req: Request<{}, {}, LoginUserInput>,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await findUser({email: req.body.email});
        

        if (!user || !(await user.comparePassword(user.password, req.body.password))) {
            return next(new AppError('Invalid email or password', 401));
        }

        const extras = await getExtras(user.extras);

        const accessToken = await singToken(user);

        res.cookie('accessToken', accessToken, accessTokenCookieOptions);
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false
        });

        res.status(200).json({
            status: 'success',
            accessToken,
            user,
            extras
        });
    } catch (err: any) {
        next(err);
    }
}