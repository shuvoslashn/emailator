import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";

export default function Editor() {
    return (
        <>
            <EditorHeader />

            {/* Editor Body */}
            <div className="grid grid-cols-5">
                <ElementsSideBar />
                <div className="col-span-3">
                    <Canvas />
                </div>
                <Settings />
            </div>
        </>
    );
}
