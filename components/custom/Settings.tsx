"use client";

import TextAlignOptions from "@/data/TextAlignOptions";
import TextTransformOptions from "@/data/TextTransformOptions";
import { useSelectedElement } from "@/hooks/useSelectedElement";
import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import ColorPickerField from "./settings/ColorPickerField";
import DropdownField from "./settings/DropdownField";
import ImagePreview from "./settings/ImagePreview";
import InputField from "./settings/InputField";
import InputStyleField from "./settings/InputStyleField";
import SliderField from "./settings/SliderField";
import TextAreaField from "./settings/TextAreaField";
import ToggleGroupField from "./settings/ToggleGroupField";

type ElementType = {
    textarea?: string;
    content?: string;
    type?: string;
    url?: string;
    imageUrl?: string;
    style?: {
        fontSize?: string;
        color?: string;
        backgroundColor?: string;
        padding?: string;
        borderRadius?: string;
        width?: string;
        textAlign?: string;
        textTransform?: string;
        fontWeight?: string;
    };
    outerStyle?: {
        width?: string;
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
        <ScrollArea className="h-[94vh] w-full bg-white dark:bg-zinc-900">
            <div className="p-5 pb-60">
                <h2 className="font-semibold text-lg">Settings</h2>
                <div className="mt-4 flex flex-col gap-8">
                    {(element?.type === "Image" ||
                        element?.imageUrl === "") && (
                        <ImagePreview
                            label={"Image Preview"}
                            value={element?.imageUrl || ""}
                            onHandleInputChange={(value: string) =>
                                onHandleInputChange("imageUrl", value)
                            }
                        />
                    )}
                    {(element?.content || element?.content === "") &&
                        element?.type !== "Text" && (
                            <InputField
                                label={"Content"}
                                value={element?.content || ""}
                                onHandleInputChange={(value: string) =>
                                    onHandleInputChange("content", value)
                                }
                            />
                        )}
                    {(element?.type === "Text" || element?.content === "") && (
                        <TextAreaField
                            label={"Text Area"}
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
                    {(element?.style?.textAlign ||
                        element?.style?.textAlign === "") && (
                        <ToggleGroupField
                            label={"Text Align"}
                            value={element?.style?.textAlign}
                            options={TextAlignOptions}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("textAlign", value)
                            }
                        />
                    )}
                    {(element?.style?.fontWeight ||
                        element?.style?.fontWeight === "") && (
                        <DropdownField
                            options={["normal", "bold"]}
                            label={"Font Weight"}
                            value={element?.style?.fontWeight || ""}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("fontWeight", value)
                            }
                        />
                    )}

                    {(element?.style?.width ||
                        element?.style?.width === "") && (
                        <SliderField
                            rangeInfo="width"
                            type="%"
                            label={"Width"}
                            value={element?.style?.width || ""}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("width", value)
                            }
                        />
                    )}
                    {element?.style?.backgroundColor && (
                        <ColorPickerField
                            type={"bgcolor"}
                            label={"Background Color"}
                            value={element?.style?.backgroundColor || "#ffffff"}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("backgroundColor", value)
                            }
                        />
                    )}
                    {element?.style?.color && (
                        <ColorPickerField
                            type={"color"}
                            label={"Text Color"}
                            value={element?.style?.color || "#ffffff"}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("color", value)
                            }
                        />
                    )}
                    {(element?.style?.textTransform ||
                        element?.style?.textTransform === "") && (
                        <ToggleGroupField
                            label={"Text Transform"}
                            value={element?.style?.textTransform}
                            options={TextTransformOptions}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("textTransform", value)
                            }
                        />
                    )}

                    {(element?.style?.fontSize ||
                        element?.style?.fontSize === "") && (
                        <InputStyleField
                            type="px"
                            label={"Font Size"}
                            value={element?.style?.fontSize || ""}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("fontSize", value)
                            }
                        />
                    )}
                    {(element?.style?.padding ||
                        element?.style?.padding === "") && (
                        <InputStyleField
                            type="px"
                            label={"Padding Size"}
                            value={element?.style?.padding || ""}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("padding", value)
                            }
                        />
                    )}
                    {(element?.style?.borderRadius ||
                        element?.style?.borderRadius === "") && (
                        <SliderField
                            rangeInfo="borderRadius"
                            type="px"
                            label={"Border Radius"}
                            value={element?.style?.borderRadius || ""}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("borderRadius", value)
                            }
                        />
                    )}
                </div>
            </div>
        </ScrollArea>
    );
}
