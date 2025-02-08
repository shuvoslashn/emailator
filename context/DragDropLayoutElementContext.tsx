import { createContext, Dispatch, SetStateAction } from "react";

export type DragDropLayoutElement = {
    dragLayout?: any;
    dragElement?: any;
};

type DragDropLayoutElementContextType = {
    dragElementLayout: DragDropLayoutElement | undefined;
    setDragElementLayout: Dispatch<
        SetStateAction<DragDropLayoutElement | undefined>
    >;
};

export const DragDropLayoutElementContext = createContext<
    DragDropLayoutElementContextType | undefined
>(undefined);
