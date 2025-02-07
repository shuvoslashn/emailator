import { createContext, Dispatch, SetStateAction } from "react";

export type ScreenSizes = "desktop" | "mobile";

type ScreenSizesContextType = {
    screenSize: ScreenSizes | undefined;
    setScreenSize: Dispatch<SetStateAction<ScreenSizes | undefined>>;
};

export const ScreenSizeContext = createContext<
    ScreenSizesContextType | undefined
>(undefined);
