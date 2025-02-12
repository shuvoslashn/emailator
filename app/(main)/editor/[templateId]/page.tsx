"use client";

import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export default function Editor() {
    const [viewHTMLCode, setViewHTMLCode] = useState<any>();
    return (
        <>
            <EditorHeader viewHTMLCode={(v: any) => setViewHTMLCode(v)} />

            {/* Editor Body */}
            <div className="grid grid-cols-6 pt-[60px] overflow-hidden h-screen">
                <ElementsSideBar />
                <ScrollArea className="col-span-4">
                    <Canvas
                        viewHTMLCode={viewHTMLCode}
                        closeDialog={() => setViewHTMLCode(false)}
                    />
                </ScrollArea>
                <Settings />
            </div>
        </>
    );
}
