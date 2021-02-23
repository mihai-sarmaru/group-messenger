import { USER_LOGIN, USER_LOGOUT } from './UserActionsModel';
import { IUser } from './User';
import { AppActions } from '../actions';

export const loginUser = (user: IUser): AppActions => {
    return {
        type: USER_LOGIN,
        user: user
    }
}

export const logoutUser = (user: IUser): AppActions => {
    return {
        type: USER_LOGOUT,
        user: user
    }
}