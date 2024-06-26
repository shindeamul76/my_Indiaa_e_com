import { User } from "@myIndiaa/main/db/models/user-model"
import { IUser } from "@myIndiaa/utils/types/db-user-type";


export const registerUserQuery = async (data: any): Promise<IUser> => {
    return await User.create(data);
}

export const updateUserQuery = async (id: string, data: any): Promise<IUser | null> => {
    return await User.findByIdAndUpdate(id, data, { new: true });
}

export const deleteUserQuery = async (id: string): Promise<void> => {
     await User.findByIdAndDelete(id);
}

export const getUserByIdQuery = async (id: string): Promise<IUser | null> => {
    return await User.findById(id);
}

export const getUserByEmailOrUsernameQuery = async (data: any): Promise<IUser | null> => {
    return await User.findOne({
        $or: [
            { email: data.email },
            { username: data.username }
        ]
    });
}



export const getAllUsersQuery = async (): Promise<IUser[]> => {
    return await User.find({});
}
