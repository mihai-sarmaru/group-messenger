import { createStore, combineReducers } from "redux";
import { userReducer } from "./User/UserReducer";
import { AppActions } from "./actions";

export const rootReducer = combineReducers({
    userReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export const store = createStore<AppState, AppActions, {}, {}>(
    rootReducer,
);