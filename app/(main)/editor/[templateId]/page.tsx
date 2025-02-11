import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Editor() {
    return (
        <>
            <EditorHeader />

            {/* Editor Body */}
            <div className="grid grid-cols-6 pt-[60px] overflow-hidden h-screen">
                <ElementsSideBar />
                <ScrollArea className="col-span-4">
                    <Canvas />
                </ScrollArea>
                <Settings />
            </div>
        </>
    );
}
