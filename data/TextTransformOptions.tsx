import { CaseLower, CaseSensitive, CaseUpper } from "lucide-react";

export type TransformType = {
    _id: string;
    value: "uppercase" | "capitalize" | "lowercase";
    icon: React.ComponentType;
};

const TextTransformOptions: TransformType[] = [
    { _id: "1", value: "uppercase", icon: CaseUpper },
    { _id: "2", value: "capitalize", icon: CaseSensitive },
    { _id: "3", value: "lowercase", icon: CaseLower },
];

export default TextTransformOptions;
