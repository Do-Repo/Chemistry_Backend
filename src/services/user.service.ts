import { omit, get } from 'lodash';
import { FilterQuery, QueryOptions } from 'mongoose';
import config from 'config';
import userModel, { User } from '../models/user';
import { excludedFields } from '../controllers/auth.controller';
import { signJwt } from '../utils/jwt';
import redisClient from '../utils/connectRedis';
import { DocumentType } from '@typegoose/typegoose';



export const createUser = async (input: Partial<User>) => {
    const user = await userModel.create(input);
    return omit(user, excludedFields);
}

export const updateUser = async (id: string, input: Partial<User>) => {
    return await userModel.findByIdAndUpdate
        (id, input, { new: true, runValidators: true }).then((user) => {
            if (!user) {
                throw new Error('User not found');
            } else return omit(user.toJSON(), excludedFields);
        });
}

// The lean option tells Mongoose to skip instantiating a full Mongoose document and just give you the POJO.
export const findUserById = async (id: string) => {
    const user = await userModel.findById(id).lean();
    return omit(user, excludedFields);
}

export const findAllUsers = async () => {
    return await userModel.find();
}

export const findUser = async (
    query: FilterQuery<User>,
    options: QueryOptions = {}
) => {
    return await userModel.findOne(query, null, options).select('+password');
}

export const singToken = async (user: DocumentType<User>) => {

    const access_token = signJwt(
        { sub: user._id.toString() },
        {
            expiresIn: `${config.get<number>('accessTokenExpiresIn')}m`
        }
    )

    redisClient.set(user._id.toString(), JSON.stringify(user), {
        EX: 60 * 60,
    })

    return access_token
};
