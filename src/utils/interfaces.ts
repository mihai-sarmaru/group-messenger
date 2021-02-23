import firebase from 'firebase';

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
    uid: string;
    name: string;
    email: string;
    avatar: string;
    message: string;
    timestamp: firebase.firestore.FieldValue;
}