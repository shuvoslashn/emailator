"use client";
import { useScreenSize } from "@/hooks/useScreenSize";
import { Code, Monitor, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./Logo";
import { ThemeToggle } from "./ThemeToggle";

export default function EditorHeader() {
    const { screenSize, setScreenSize } = useScreenSize();
    return (
        <header className="py-3 shadow-2xl shadow-zinc-800/10 z-50 fixed w-full bg-white dark:bg-zinc-950">
            <div className="px-5 flex justify-between items-center gap-4">
                <Logo />

                {/* responsiveness checker */}
                <div className="flex gap-2">
                    <Button
                        variant={"ghost"}
                        className={`hover:bg-primary/5 hover:text-primary px-2.5 ${screenSize === "desktop" && "bg-primary/5 text-primary"}`}
                        onClick={() => setScreenSize("desktop")}
                    >
                        <Monitor />
                        <span className="hidden md:block">Desktop</span>
                    </Button>
                    <Button
                        variant={"ghost"}
                        className={`hover:bg-primary/5 hover:text-primary px-2.5 ${screenSize === "mobile" && "bg-primary/5 text-primary"}`}
                        onClick={() => setScreenSize("mobile")}
                    >
                        <Smartphone />
                        <span className="hidden md:block">Mobile</span>
                    </Button>
                </div>

                {/* code, test and save template */}
                <div className="flex gap-3">
                    <ThemeToggle />
                    <Button
                        variant={"ghost"}
                        className="border border-zinc-100/10 hover:border-transparent w-8"
                    >
                        <Code />
                    </Button>
                    <Button variant={"outline"}>Send Test Email</Button>
                    <Button>Save Template</Button>
                </div>
            </div>
        </header>
    );
}
