"use client";

import { useSelectedElement } from "@/hooks/useSelectedElement";
import { useEffect, useState } from "react";
import ColorPickerField from "./settings/ColorPickerField";
import InputField from "./settings/InputField";

type ElementType = {
    content?: string;
    type?: string;
    url?: string;
    style?: {
        color?: string;
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

    const onHandleStyleChange = (fieldName: string, value: string) => {
        if (!selectedElement || selectedElement.index === undefined) return;

        const updatedData = {
            ...selectedElement,
            layout: {
                ...selectedElement.layout,
                [selectedElement.index]: {
                    ...selectedElement.layout[selectedElement.index],
                    style: {
                        ...selectedElement.layout[selectedElement.index]?.style,
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
                <div className="mt-4 flex flex-col gap-4">
                    {(element?.content || element?.content === "") && (
                        <InputField
                            label={"Content"}
                            value={element?.content || ""}
                            onHandleInputChange={(value: string) =>
                                onHandleInputChange("content", value)
                            }
                        />
                    )}
                    {(element?.url || element?.url === "") && (
                        <InputField
                            label={"Url"}
                            value={element?.url || ""}
                            onHandleInputChange={(value: string) =>
                                onHandleInputChange("url", value)
                            }
                        />
                    )}
                    {element?.style?.backgroundColor && (
                        <ColorPickerField
                            type={"bgcolor"}
                            label={"Background Color"}
                            value={element?.style?.backgroundColor || ""}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("backgroundColor", value)
                            }
                        />
                    )}
                    {element?.style?.color && (
                        <ColorPickerField
                            type={"color"}
                            label={"Text Color"}
                            value={element?.style?.color || ""}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("color", value)
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
