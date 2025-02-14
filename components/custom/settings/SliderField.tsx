import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

type SliderFieldType = {
    type: string;
    label: string;
    value: string;
    onHandleStyleChange: (value: string) => void;
};

export default function SliderField({
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


    return (
        <div>
            <Label className="text-sm font-bold">{label}</Label>
            <div className="flex gap-2 pr-2 pl-1">
                <Slider
                    defaultValue={[formatValue(value)]}
                    max={100}
                    step={1}
                    className="cursor-pointer"
                    onValueChange={(v) => onHandleStyleChange(`${v[0] + type}`)}
                />
                <p className="p-1 px-3 w-12">{formatValue(value) + type}</p>
            </div>
        </div>
    );
}
