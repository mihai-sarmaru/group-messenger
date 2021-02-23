import { USER_LOGIN, USER_LOGOUT, UserActionsTypes } from "./UserActionsModel";
import { IUser } from "./User";

interface UserState {
    user: IUser;
}

const initialState: UserState = {
    user: {} as IUser
};

export const userReducer = (state = initialState, action: UserActionsTypes): UserState => {
    switch (action.type) {
        case USER_LOGIN:
            return { user: action.user };
        case USER_LOGOUT:
            return { user: {} as IUser };
        default:
            return state;
    }
};
