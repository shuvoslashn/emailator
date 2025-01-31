import { useContext } from "react";
import { userDetailsContext } from "@/context/UserDetailsContext";

export const useUserDetails = () => {
    const context = useContext(userDetailsContext);
    if (context === undefined) {
        throw new Error(
            "useUserDetails must be used within a UserDetailsProvider"
        );
    }
    return context;
};
