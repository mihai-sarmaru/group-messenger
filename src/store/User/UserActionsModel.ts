import { IUser } from "./User";

export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

interface UserActions {
    user: IUser;
}

interface UserLogin extends UserActions {
    type: typeof USER_LOGIN;
}
interface UserLogout extends UserActions {
    type: typeof USER_LOGOUT;
}

export type UserActionsTypes =
    | UserLogin
    | UserLogout;