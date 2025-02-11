import { OptionType } from "@/components/custom/settings/ToggleGroupField";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

const TextAlignOptions: OptionType[] = [
    { _id: "1", value: "left", icon: AlignLeft },
    { _id: "2", value: "center", icon: AlignCenter },
    { _id: "3", value: "right", icon: AlignRight },
];

export default TextAlignOptions;
