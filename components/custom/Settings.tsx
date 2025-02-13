"use client";

import AlignOption from "@/data/AlignOptions";
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
        margin?: string;
        borderRadius?: string;
        width?: string;
        textAlign?: string;
        textTransform?: string;
        fontWeight?: string;
    };
    outerStyle?: {
        width?: string;
        color?: string;
        backgroundColor?: string;
        align?: string;
        justifyContent?: string;
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

        // Make a copy of the current layout item
        const currentItem = selectedElement.layout[selectedElement.index];

        const updatedItem = {
            ...currentItem,
            style: {
                ...currentItem.style,
                [fieldName]: value,
            },
            outerStyle:
                fieldName !== "backgroundColor"
                    ? {
                          ...currentItem.outerStyle,
                          [fieldName]: value,
                      }
                    : currentItem.outerStyle,
        };

        const updatedData = {
            ...selectedElement,
            layout: {
                ...selectedElement.layout,
                [selectedElement.index]: updatedItem,
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
                    {element?.imageUrl && (
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
                    {(element?.type === "Text" || element?.textarea === "") && (
                        <TextAreaField
                            label={"Text Area"}
                            value={element?.textarea || ""}
                            onHandleInputChange={(value: string) =>
                                onHandleInputChange("textarea", value)
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
                            options={AlignOption}
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
                    {(element?.style?.margin ||
                        element?.style?.margin === "") && (
                        <InputStyleField
                            type="px"
                            label={"Margin Size"}
                            value={element?.style?.margin || ""}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("margin", value)
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

                    <h3 className="font-semibold text-md -mb-3">Outer Style</h3>

                    {/* {element?.outerStyle?.backgroundColor && (
                        <ColorPickerField
                            compType={"outerBgColor"}
                            label={"Background Color"}
                            value={
                                element?.outerStyle?.backgroundColor ||
                                "#ffffff"
                            }
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("backgroundColor", value)
                            }
                        />
                    )} */}
                    {(element?.outerStyle?.justifyContent ||
                        element?.outerStyle?.justifyContent === "") && (
                        <ToggleGroupField
                            label={"Alignment"}
                            value={element?.outerStyle?.justifyContent}
                            options={TextAlignOptions}
                            onHandleStyleChange={(value: string) =>
                                onHandleStyleChange("justifyContent", value)
                            }
                        />
                    )}
                </div>
            </div>
        </ScrollArea>
    );
}
