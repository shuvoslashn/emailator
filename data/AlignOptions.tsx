import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";

export type AlignOptionType = {
    _id: string;
    value: "flex-start" | "center" | "flex-end";
    icon: React.ComponentType;
};

const AlignOption: AlignOptionType[] = [
    { _id: "1", value: "flex-start", icon: AlignLeft },
    { _id: "2", value: "center", icon: AlignCenter },
    { _id: "3", value: "flex-end", icon: AlignRight },
];

export default AlignOption;
