"use client";

import { useSelectedElement } from "@/hooks/useSelectedElement";
import { useEffect, useState } from "react";
import ColorPickerField from "./settings/ColorPickerField";
import InputField from "./settings/InputField";

type ElementType = {
    content?: string;
    type?: string;
    style?: {
        backgroundColor?: string;
    };
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

    // const onHandleStyleChange = (fieldName: string, value: string) => {
    //     // Copy of Current Selected Element
    //     const updatedData = {
    //         ...selectedElement,
    //         layout: {
    //             ...selectedElement?.layout,
    //             [selectedElement?.index]: {
    //                 ...selectedElement?.layout[selectedElement?.index],
    //                 style: {
    //                     ...selectedElement?.layout[selectedElement?.index]
    //                         ?.style,
    //                     [fieldName]: value,
    //                 },
    //             },
    //         },
    //     };

    //     console.log(updatedData);

    //     // Update Original Selected Element
    //     setSelectedElement(updatedData);
    // };

    const onHandleStyleChange = (fieldName: string, value: string) => {
        if (!selectedElement || selectedElement.index === undefined) return;

        // Use the index directly from selectedElement (not optional-chained)
        const currentIndex = selectedElement.index;

        const updatedData = {
            ...selectedElement,
            layout: {
                ...selectedElement.layout,
                [currentIndex]: {
                    ...selectedElement.layout[currentIndex],
                    style: {
                        ...selectedElement.layout[currentIndex]?.style,
                        [fieldName]: value,
                    },
                },
            },
        };
        setSelectedElement(updatedData);
    };

    useEffect(() => {
        setElement(selectedElement?.layout?.[selectedElement?.index]);
    }, [selectedElement]);

    return (
        <div className="h-[94vh] w-full bg-white dark:bg-zinc-900">
            <div className="p-5">
                <h2 className="font-semibold text-lg">Settings</h2>
                <div className="mt-4">
                    {element && (
                        <>
                            <InputField
                                label={"Content"}
                                value={element?.content || ""}
                                onHandleInputChange={(value: string) =>
                                    onHandleInputChange("content", value)
                                }
                            />
                            <ColorPickerField
                                label={"Background Color"}
                                value={element?.style?.backgroundColor || ""}
                                onHandleStyleChange={(value: string) =>
                                    onHandleStyleChange(
                                        "backgroundColor",
                                        value
                                    )
                                }
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
