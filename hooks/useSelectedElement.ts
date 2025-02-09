import { SelectedElementContext } from "@/context/SelectedElementContext";
import { useContext } from "react";

export function useSelectedElement() {
    const context = useContext(SelectedElementContext);

    if (!context) {
        throw new Error(
            "useSelectedElement must be used within a SelectedElementProvider"
        );
    }

    return [context.selectedElement, context.setSelectedElement] as const;
}
