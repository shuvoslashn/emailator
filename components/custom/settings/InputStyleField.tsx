import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputStyleType = {
    label: string;
    value: string;
    onHandleStyleChange: (value: string) => void;
    type: string;
};

export default function InputStyleField({
    label,
    value,
    onHandleStyleChange,
    type,
}: InputStyleType) {
    const formatValue = (value: string) => {
        return Number(value.toString().replace("px", ""));
    };

    return (
        <div>
            <Label className="text-sm font-bold">{label}</Label>
            <div className="flex">
                <Input
                    type="number"
                    value={formatValue(value)}
                    onChange={(e) => onHandleStyleChange(e.target.value + type)}
                    className="pr-12 dark:bg-zinc-950"
                />
                <p className="p-1 px-3 bg-zinc-100 dark:bg-zinc-800 -ml-[43px] rounded-r-lg">
                    {type}
                </p>
            </div>
        </div>
    );
}
