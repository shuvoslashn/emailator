"use client";
import { useDragDropElementLayout } from "@/hooks/useDragDropElemenLayout";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { useScreenSize } from "@/hooks/useScreenSize";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import ColumnLayout from "../layoutElements/ColumnLayout";

export default function Canvas() {
    const { screenSize, setScreenSize } = useScreenSize();
    const { dragElementLayout, setDragElementLayout } =
        useDragDropElementLayout();
    const { emailTemplateLayout, setEmailTemplateLayout } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);

    const onDragOver = (e: any) => {
        e.preventDefault();
        setDragOver(true);
        console.log("Over...");
    };

    const onDropHandler = () => {
        setDragOver(false);

        if (dragElementLayout?.dragLayout) {
            setEmailTemplateLayout((prev) => {
                if (prev) {
                    return [...prev, dragElementLayout.dragLayout];
                } else {
                    return [dragElementLayout.dragLayout];
                }
            });
        }
    };

    const getLayoutComponent = (layout: any) => {
        if (layout?.type == "column") {
            return <ColumnLayout layout={layout} />;
        }
    };

    return (
        <div className="h-[94vh] w-full bg-zinc-200 dark:bg-zinc-800 p-8 overflow-y-scroll flex justify-center">
            <div
                onDragOver={onDragOver}
                onDrop={() => onDropHandler()}
                className={`bg-white dark:bg-zinc-900 p-6 w-full ${screenSize === "desktop" ? "max-w-3xl" : "max-w-sm"} duration-300 ${dragOver && "bg-primary/10 p-4"}`}
            >
                {emailTemplateLayout?.length! > 0 ? (
                    emailTemplateLayout?.map((item, index) => (
                        <div key={index}>{getLayoutComponent(item)}</div>
                    ))
                ) : (
                    <h2
                        className={`flex justify-center items-center gap-2 text-center p-4 border-2 border-dashed text-zinc-500 ${dragOver && "bg-primary/10 p-4 text-primary"}`}
                    >
                        <PlusCircle strokeWidth={1.25} size={20} /> Add Column
                    </h2>
                )}
            </div>
        </div>
    );
}
