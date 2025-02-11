import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TextAreaFieldType = {
    label: string;
    value: string;
    onHandleInputChange: (value: string) => void;
};

export default function TextAreaField({
    label,
    value,
    onHandleInputChange,
}: TextAreaFieldType) {
    return (
        <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-bold">{label}</Label>
            <Textarea
                className="text-zinc-700 dark:text-zinc-300 dark:bg-zinc-950"
                value={value}
                onChange={(e) => onHandleInputChange(e.target.value)}
                rows={7}
            />
        </div>
    );
}
