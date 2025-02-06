import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";

export default function Editor() {
    return (
        <>
            <EditorHeader />

            {/* Editor Body */}
            <div className="grid grid-cols-6 pt-14 overflow-hidden h-screen">
                <ElementsSideBar />
                <div className="col-span-4">
                    <Canvas />
                </div>
                <Settings />
            </div>
        </>
    );
}
