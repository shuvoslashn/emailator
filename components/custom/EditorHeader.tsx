"use client";
import { Toaster } from "@/components/ui/sonner";
import { api } from "@/convex/_generated/api";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useMutation } from "convex/react";
import { Code, Monitor, Smartphone } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export default function EditorHeader({ viewHTMLCode }: any) {
    const { screenSize, setScreenSize } = useScreenSize();
    const { emailTemplateLayout } = useEmailTemplate();
    const updatedEmailTemplate = useMutation(
        api.emailTemplate.UpdateTemplateDesign
    );
    const { templateId } = useParams();

    // Recursively remove keys with values that are functions or undefined,
    // and skip keys starting with "$"
    function sanitize(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(sanitize);
        } else if (obj !== null && typeof obj === "object") {
            const newObj: any = {};
            for (const key in obj) {
                if (key.startsWith("$")) continue;
                const value = obj[key];
                if (typeof value === "function" || value === undefined)
                    continue;
                newObj[key] = sanitize(value);
            }
            return newObj;
        }
        return obj;
    }

    const onSaveTemplate = async () => {
        const sanitizedDesign = sanitize(emailTemplateLayout);
        await updatedEmailTemplate({
            tid: templateId as string,
            design: sanitizedDesign,
        });
        toast.success("Design Saved Successfully");
    };

    return (
        <header className="py-3 shadow-2xl shadow-zinc-800/10 z-50 fixed w-full bg-white dark:bg-zinc-950">
            <div className="px-5 flex justify-between items-center gap-4">
                <Logo />

                {/* Responsiveness checker */}
                <div className="flex gap-2">
                    <Button
                        variant={"ghost"}
                        className={`hover:bg-primary/5 hover:text-primary px-2.5 ${
                            screenSize === "desktop" &&
                            "bg-primary/5 text-primary"
                        }`}
                        onClick={() => setScreenSize("desktop")}
                    >
                        <Monitor />
                        <span className="hidden md:block">Desktop</span>
                    </Button>
                    <Button
                        variant={"ghost"}
                        className={`hover:bg-primary/5 hover:text-primary px-2.5 ${
                            screenSize === "mobile" &&
                            "bg-primary/5 text-primary"
                        }`}
                        onClick={() => setScreenSize("mobile")}
                    >
                        <Smartphone />
                        <span className="hidden md:block">Mobile</span>
                    </Button>
                </div>

                {/* Code, test and save template */}
                <div className="flex gap-3">
                    <ThemeToggle />
                    <Button
                        variant={"ghost"}
                        className="border border-zinc-100/10 hover:border-transparent w-8"
                        onClick={() => viewHTMLCode(true)}
                    >
                        <Code />
                    </Button>
                    {/* <Button variant={"outline"}>Send Test Email</Button> */}
                    <Button onClick={onSaveTemplate}>Save Template</Button>
                </div>
            </div>
            <Toaster />
        </header>
    );
}
