import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelectedElement } from "@/hooks/useSelectedElement";
import { useEffect, useState } from "react";

type colorPickerType = {
    type: string;
    label: string;
    value: string;
    onHandleStyleChange: (value: string) => void;
};

export default function ColorPickerField({
    type,
    label,
    value,
    onHandleStyleChange,
}: colorPickerType) {
    const [bgColorCode, setBgColorCode] = useState<String | undefined>();
    const [colorCode, setColorCode] = useState<String | undefined>();

    const [selectedElement, setSelectedElement] = useSelectedElement();

    useEffect(() => {
        setColorCode(
            selectedElement.layout?.[selectedElement.index]?.style?.color
        );
        setBgColorCode(
            selectedElement.layout?.[selectedElement.index]?.style
                ?.backgroundColor
        );
    }, [colorCode, bgColorCode, selectedElement]);

    return (
        <div className="mt-4 flex flex-col gap-1.5">
            <Label className="text-sm font-bold">{label}</Label>
            {type === "color" ? (
                <div className="flex items-center gap-0">
                    <div
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: `${colorCode}` }}
                    >
                        <Input
                            type="color"
                            value={value}
                            id="col"
                            onChange={(e) => {
                                onHandleStyleChange(e.target.value);
                                setColorCode(e.target.value);
                            }}
                            className="w-8 h-8 p-0 rounded-full cursor-pointer opacity-0"
                        />
                    </div>
                    <Label
                        htmlFor="col"
                        className="text-sm text-zinc-700 dark:text-zinc-300 p-2 cursor-pointer"
                    >
                        {colorCode}
                    </Label>
                </div>
            ) : (
                <div className="flex items-center gap-0">
                    <div
                        className="w-8 h-8 rounded-full border"
                        style={{ backgroundColor: `${bgColorCode}` }}
                    >
                        <Input
                            type="color"
                            value={value}
                            id="col"
                            onChange={(e) => {
                                onHandleStyleChange(e.target.value);
                                setColorCode(e.target.value);
                            }}
                            className="w-8 h-8 p-0 rounded-full cursor-pointer opacity-0"
                        />
                    </div>
                    <Label
                        htmlFor="col"
                        className="text-sm text-zinc-700 dark:text-zinc-300 p-2 cursor-pointer"
                    >
                        {bgColorCode}
                    </Label>
                </div>
            )}
        </div>
    );
}
