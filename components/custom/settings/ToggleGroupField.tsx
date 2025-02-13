import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { AlignOptionType } from "@/data/AlignOptions";
import { TransformType } from "@/data/TextTransformOptions";
import { useId } from "react";

export type OptionType = {
    _id: string;
    value: "left" | "center" | "right";
    icon: React.ComponentType;
};

type ToggleGroupFieldType = {
    label: string;
    value: string;
    options: AlignOptionType[] | OptionType[] | TransformType[];
    onHandleStyleChange: (value: string) => void;
};

export default function ToggleGroupField({
    label,
    value,
    options,
    onHandleStyleChange,
}: ToggleGroupFieldType) {
    return (
        <div className="flex flex-col items-start gap-2">
            <Label className="text-sm font-bold pb-0.5">{label}</Label>
            <ToggleGroup
                type="single"
                variant="outline"
                defaultValue={value}
                onValueChange={(v) => onHandleStyleChange(v)}
                className="w-full"
            >
                {options.map((option) => (
                    <ToggleGroupItem
                        key={useId()}
                        value={option.value}
                        className="w-full p-1.5 stroke-[1.35px] cursor-pointer"
                        asChild
                    >
                        <option.icon />
                    </ToggleGroupItem>
                ))}
            </ToggleGroup>
        </div>
    );
}
