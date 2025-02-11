import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type InputData = {
    label: string;
    value: string;
    onHandleInputChange: (e: string) => void;
};

export default function InputField({
    label,
    value,
    onHandleInputChange,
}: InputData) {
    return (
        <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-bold">{label}</Label>
            <Input
                className="text-zinc-700 dark:text-zinc-300 dark:bg-zinc-950"
                value={value}
                onChange={(e) => onHandleInputChange(e.target.value)}
            />
        </div>
    );
}
