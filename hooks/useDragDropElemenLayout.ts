import { DragDropLayoutElementContext } from "@/context/DragDropLayoutElementContext";
import { useContext } from "react";

export const useDragDropElementLayout = () => {
    const context = useContext(DragDropLayoutElementContext);

    if (context === undefined) {
        throw new Error(
            "useDragDropElementLayout must be used within a DragDropElementProvider"
        );
    }

    return context;
};
