import { ScreenSizeContext } from "@/context/ScreenSizeContext";
import { useContext } from "react";

export const useScreenSize = () => {
    const context = useContext(ScreenSizeContext);
    if (context === undefined) {
        throw new Error(
            "useScreenSize must be used within a ScreenSizeProvider"
        );
    }
    return context;
};
