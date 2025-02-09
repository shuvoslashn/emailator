import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type inputData = {
    label: string;
    value: string;
    onHandleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function InputField({
    label,
    value,
    onHandleInputChange,
}: inputData) {
    return (
        <div>
            <Label>{label}</Label>
            <Input value={value} onChange={(e) => onHandleInputChange(e)} />
        </div>
    );
}
