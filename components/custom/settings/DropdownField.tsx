import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useId } from "react";

type DropdownFieldType = {
    label: string;
    value: string;
    options: string[];
    onHandleStyleChange: (value: string) => void;
};

export default function DropdownField({
    label,
    value,
    options,
    onHandleStyleChange,
}: DropdownFieldType) {
    return (
        <div className="flex flex-col gap-3">
            <Label className="text-sm font-bold">{label}</Label>
            <Select
                onValueChange={(v) => onHandleStyleChange(v)}
                defaultValue={value}
            >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={value} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={useId()} value={option}>
                            {option}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
