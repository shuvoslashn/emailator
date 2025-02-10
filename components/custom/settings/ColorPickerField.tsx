import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type colorPickerType = {
    label: string;
    value: string;
    onHandleStyleChange: (value: string) => void;
};

export default function ColorPickerField({
    label,
    value,
    onHandleStyleChange,
}: colorPickerType) {
    return (
        <div className="mt-4 flex flex-col gap-1.5">
            <Label className="text-sm font-bold">{label}</Label>
            <Input
                type="color"
                value={value}
                onChange={(e) => onHandleStyleChange(e.target.value)}
            />
        </div>
    );
}
