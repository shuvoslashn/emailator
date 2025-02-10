import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type inputData = {
    label: string;
    value: string;
    onHandleInputChange: (e: string) => void;
};

export default function InputField({
    label,
    value,
    onHandleInputChange,
}: inputData) {
    return (
        <div className="mt-4 flex flex-col gap-1.5">
            <Label className="text-sm font-bold">{label}</Label>
            <Input
                className="text-zinc-700"
                value={value}
                onChange={(e) => onHandleInputChange(e.target.value)}
            />
        </div>
    );
}
