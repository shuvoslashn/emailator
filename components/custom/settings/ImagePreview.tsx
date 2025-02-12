import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

type ImagePreviewType = {
    label: string;
    value: string;
    options?: string[];
    onHandleInputChange: (value: string) => void;
};

export default function ImagePreview({
    label,
    value,
    onHandleInputChange,
}: ImagePreviewType) {
    return (
        <div className="flex flex-col gap-3">
            <Label className="text-sm font-bold">{label}</Label>
            <div className="relative">
                <Image
                    src={value}
                    alt="preview image"
                    width={500}
                    height={150}
                    className="w-full min-h-36"
                />
                <Input
                    type="file"
                    className="text-[10px] absolute top-1/2 -translate-y-1/2"
                />
            </div>
        </div>
    );
}
