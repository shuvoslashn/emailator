import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/convex/_generated/api";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useState } from "react";

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
    const { userDetails } = useUserDetails();
    const [isUploading, setIsUploading] = useState(false);
    const generateUploadUrl = useMutation(api.files.generateUploadUrl);
    const saveFile = useMutation(api.files.saveFile);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!userDetails?.email) {
            console.error("User is not authenticated");
            return;
        }

        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);

        try {
            const postUrl = await generateUploadUrl();

            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": file.type },
                body: file,
            });

            const { storageId } = await result.json();

            const { fileUrl } = await saveFile({
                storageId,
                fileName: file.name,
                fileType: file.type,
                email: userDetails.email,
            });

            // Update the state with the new image URL
            onHandleInputChange(fileUrl!);

            console.log("File uploaded successfully:", fileUrl);
        } catch (error) {
            console.error("Error uploading file:", error);
        } finally {
            setIsUploading(false);
            e.target.value = "";
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <Label className="text-sm font-bold">{label}</Label>
            <div className="relative group">
                <Image
                    src={value}
                    alt="preview image"
                    width={500}
                    height={144}
                    className="w-full h-36 object-cover border rounded-sm group-hover:opacity-60 duration-300"
                />
                <Input
                    type="file"
                    onChange={handleFileChange}
                    disabled={isUploading}
                    id="choose-file"
                    className="text-[10px] absolute top-1/2 -translate-y-1/2 text-center min-h-36 cursor-pointer opacity-0"
                />
                <Label
                    htmlFor="choose-file"
                    className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm px-6 py-3 border duration-300 rounded-sm"
                >
                    {isUploading ? (
                        <span className="flex gap-2 items-center">
                            <span className="w-3 h-3 rounded-full border-t-2 border-primary animate-spin"></span>
                            <span>Upoading</span>
                        </span>
                    ) : (
                        <span>Choose</span>
                    )}
                </Label>
            </div>
        </div>
    );
}
