"use client";

import { useSelectedElement } from "@/hooks/useSelectedElement";
import { useEffect, useState } from "react";
import InputField from "./settings/InputField";

type ElementType = {
    content?: string;
    type?: string;
};

export default function Settings() {
    const [selectedElement, setSelectedElement] = useSelectedElement();
    const [element, setElement] = useState<ElementType | undefined>(undefined);

    const onHandleInputChange = (fieldName: string, value: string) => {
        // Copy of Current Selected Element
        const updatedData = { ...selectedElement };

        // Update the specific Field
        updatedData.layout[selectedElement?.index][fieldName] = value;

        // Update Original Selected Element
        setSelectedElement(updatedData);
    };

    useEffect(() => {
        console.log(element);
        setElement(selectedElement?.layout?.[selectedElement?.index]);
    }, [selectedElement]);

    return (
        <div className="h-[94vh] w-full bg-white dark:bg-zinc-900">
            <div className="p-5">
                <h2 className="font-semibold text-lg">Settings</h2>
                {(element?.content || element?.type) && (
                    <InputField
                        label={"Content"}
                        value={element?.content || ""}
                        onHandleInputChange={(
                            e: React.ChangeEvent<HTMLInputElement>
                        ) => onHandleInputChange("content", e.target.value)}
                    />
                )}
            </div>
        </div>
    );
}
