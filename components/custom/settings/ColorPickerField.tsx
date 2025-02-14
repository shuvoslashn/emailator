import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSelectedElement } from "@/hooks/useSelectedElement";
import { useState } from "react";

type ColorPickerType = {
    label: string;
    value: string;
    onHandleStyleChange: (value: string) => void;
};

export default function ColorPickerField({
    label,
    value,
    onHandleStyleChange,
}: ColorPickerType) {
    const [colorCode, setColorCode] = useState<string>();
    const [selectedElement, setSelectedElement] = useSelectedElement();

    // useEffect(() => {}, [colorCode]);

    return (
        <div className="mt-4 flex flex-col gap-1.5">
            <Label className="text-sm font-bold">{label}</Label>
            <div className="flex items-center gap-2">
                <div
                    style={{ backgroundColor: `${colorCode}` }}
                    className="w-8 h-8 rounded-full border-2 border-black dark:border-white relative"
                >
                    <Input
                        type="color"
                        value={value}
                        onChange={(e) => {
                            onHandleStyleChange(e.target.value);
                            setColorCode(e.target.value);
                        }}
                        className="w-28 h-8 p-0 rounded-full cursor-pointer absolute z-10 opacity-0"
                    />
                </div>
                <Label className=" cursor-pointer text-sm font-bold">
                    {colorCode ? colorCode : "Choose"}
                </Label>
            </div>
        </div>
    );
}
