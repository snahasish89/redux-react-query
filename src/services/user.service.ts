import { http } from "./http.service"
import {IAlburm, ITodo, IUser} from '../types/type'


export const getUsers = async (): Promise<IUser[]> => {
    return await (await http.get('/users')).data;
}

export const getTodo =async (userid:number): Promise<ITodo[]> => {
    return await (await http.get(`/users/${userid}/todos`)).data;
}

export const getPhotos =async (): Promise<IAlburm[]> => {
    return await (await http.get('/photos')).data;
}