import firebase from 'firebase';
import { IUser } from '../store/User/User';

export interface IRoom {
    id?: string;
    name: string;
}

export interface IFirebaseRoom {
    id?: string;
    data: firebase.firestore.DocumentData;
}

export interface ChatParamTypes {
    roomId?: string;
}

export interface IMessage {
    id?: string;
    user: IUser;
    message: string;
    timestamp: firebase.firestore.FieldValue;
}