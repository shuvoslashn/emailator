import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useState,
} from "react";

export type LayoutItem = {
    type: string;
    [key: string]: any;
};

export type DragDropLayoutElement = {
    dragLayout?: LayoutItem;
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

type DragDropElementProviderProps = {
    children: ReactNode;
};

//  provider component
export const DragDropElementProvider = ({
    children,
}: DragDropElementProviderProps) => {
    const [dragElementLayout, setDragElementLayout] = useState<
        DragDropLayoutElement | undefined
    >(undefined);

    return (
        <DragDropLayoutElementContext.Provider
            value={{ dragElementLayout, setDragElementLayout }}
        >
            {children}
        </DragDropLayoutElementContext.Provider>
    );
};
