import { UserDetailsContext } from "@/context/UserDetailsContext";
import { useContext } from "react";

export const useUserDetails = () => {
    const context = useContext(UserDetailsContext);
    if (context === undefined) {
        throw new Error(
            "useUserDetails must be used within a UserDetailsProvider"
        );
    }
    return context;
};
 