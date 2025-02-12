import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useSelectedElement } from "@/hooks/useSelectedElement";
import { useEffect, useState } from "react";

type SliderFieldType = {
    rangeInfo: "width" | "borderRadius";
    type: string;
    label: string;
    value: string;
    onHandleStyleChange: (value: string) => void;
};

export default function SliderField({
    rangeInfo,
    type,
    label,
    value,
    onHandleStyleChange,
}: SliderFieldType) {
    const formatValue = (val: string | number | undefined) =>
        Number(
            String(val || "")
                .replace("px", "")
                .replace("%", "")
        ) || 0;

    const [selectedElement] = useSelectedElement();
    const [sliderValue, setSliderValue] = useState<number>(formatValue(value));

    useEffect(() => {
        if (!selectedElement || selectedElement.index === undefined) return;

        const elementStyle =
            selectedElement.layout?.[selectedElement.index]?.style || {};
        const newValue =
            rangeInfo === "width"
                ? elementStyle.width || "100%"
                : elementStyle.borderRadius || "0px";

        setSliderValue(formatValue(newValue));
    }, [selectedElement, rangeInfo]);

    return (
        <div>
            <Label className="text-sm font-bold">{label}</Label>
            <div className="flex gap-2 pr-2 pl-1">
                <Slider
                    value={[sliderValue]}
                    max={rangeInfo === "width" ? 100 : 50}
                    step={1}
                    className="cursor-pointer"
                    onValueChange={(v) => {
                        setSliderValue(v[0]);
                        onHandleStyleChange(`${v[0] + type}`);
                    }}
                />
                <p className="p-1 px-3 w-12">{sliderValue + type}</p>
            </div>
        </div>
    );
}
