import { createContext, Dispatch, SetStateAction } from "react";

export type SelectedElement = any;

type SelectedElementContextType = {
    selectedElement: SelectedElement | undefined;
    setSelectedElement: Dispatch<SetStateAction<SelectedElement | undefined>>;
};

export const SelectedElementContext = createContext<
    SelectedElementContextType | undefined
>(undefined);
