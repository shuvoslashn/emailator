import { Code, Monitor, Smartphone } from "lucide-react";
import { Button } from "../ui/button";
import Logo from "./Logo";

export default function EditorHeader() {
    return (
        <header className="py-3 shadow-2xl shadow-zinc-800/10 z-50 relative">
            <div className="container flex justify-between items-center gap-4">
                <Logo />

                {/* responsiveness checker */}
                <div className="flex gap-2">
                    <Button
                        variant={"ghost"}
                        className="hover:bg-primary/10 px-2.5"
                    >
                        <Monitor />
                        Desktop
                    </Button>
                    <Button
                        variant={"ghost"}
                        className="hover:bg-primary/10 px-2.5"
                    >
                        <Smartphone />
                        Mobile
                    </Button>
                </div>

                {/* code, test and save template */}
                <div className="flex gap-3">
                    <Button variant={"ghost"} className="hover:bg-primary/10">
                        <Code />
                    </Button>
                    <Button variant={"outline"}>Send Test Email</Button>
                    <Button>Save Template</Button>
                </div>
            </div>
        </header>
    );
}
