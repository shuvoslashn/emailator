import { createContext, Dispatch, SetStateAction } from "react";

export type UserDetails = {
    email?: string;
    name?: string;
    picture?: string;
    credits?: number;
};

type UserDetailsContextType = {
    userDetails: UserDetails | undefined;
    setUserDetails: Dispatch<SetStateAction<UserDetails | undefined>>;
};

export const UserDetailsContext = createContext<
    UserDetailsContextType | undefined
>(undefined);
