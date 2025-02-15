"use client";
import { useDragDropElementLayout } from "@/hooks/useDragDropElemenLayout";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useSelectedElement } from "@/hooks/useSelectedElement";
import { PlusCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ColumnLayout from "../layoutElements/ColumnLayout";
import ViewHTMLDialog from "./ViewHTMLDialog";

export default function Canvas({ viewHTMLCode, closeDialog }: any) {
    const htmlRef = useRef<HTMLDivElement>(null);
    const { screenSize } = useScreenSize();
    const { dragElementLayout } = useDragDropElementLayout();
    const { emailTemplateLayout, setEmailTemplateLayout } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);
    const [isColumnDrag, setIsColumnDrag] = useState(false);
    const [dragLeave, setDragLeave] = useState(true);
    const [selectedElement, setSelectedElement] = useSelectedElement();
    const [htmlCode, setHTMLCode] = useState<string>("");

    // Handle drag over event and set the correct states
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
        setDragLeave(false);
        setIsColumnDrag(!!dragElementLayout?.dragLayout);
    };

    // Handle drop event
    const onDropHandler = () => {
        setDragOver(false);
        setDragLeave(true);

        if (dragElementLayout?.dragLayout) {
            setEmailTemplateLayout((prev) => [
                ...(prev || []),
                dragElementLayout.dragLayout,
            ]);
        }

        setIsColumnDrag(false);
    };

    // Handle drag leave
    const onDragLeaveHandler = () => {
        setDragOver(false);
        setDragLeave(true);
    };

    // Get the component based on the layout type
    const getLayoutComponent = (layout: any) =>
        layout?.type === "column" && <ColumnLayout layout={layout} />;

    // Define the background and text colors based on drag state
    const backgroundColor = dragOver
        ? isColumnDrag
            ? "bg-primary/10"
            : "bg-red-500/10"
        : "";
    const textColor = dragOver
        ? isColumnDrag
            ? "text-primary"
            : "text-red-500"
        : "";
    const iconColor = dragOver
        ? isColumnDrag
            ? "stroke-primary"
            : "stroke-red-500"
        : "";

    useEffect(() => {
        viewHTMLCode && getHTMLCode();
    }, [viewHTMLCode]);

    // Get HTML Code
    const getHTMLCode = () => {
        console.log(htmlRef.current);
        if (htmlRef.current) {
            const htmlContent = htmlRef?.current?.innerHTML;
            console.log(htmlContent);
            setHTMLCode(htmlContent);
        }
    };

    return (
        <div
            className="min-h-[94vh] h-full w-full bg-zinc-200 dark:bg-zinc-800 p-8 pb-24 flex justify-center"
            onDoubleClick={() => setSelectedElement(null)}
        >
            <div
                onDragOver={onDragOver}
                onDrop={onDropHandler}
                onDragLeave={onDragLeaveHandler}
                className={`bg-white p-6 w-full ${screenSize === "desktop" ? "max-w-3xl" : "max-w-sm"} duration-300`}
                ref={htmlRef}
            >
                {emailTemplateLayout?.length ? (
                    emailTemplateLayout.map((item, index) => (
                        <div key={index}>{getLayoutComponent(item)}</div>
                    ))
                ) : (
                    <h2
                        className={`flex justify-center items-center gap-2 text-center p-4 border-2 border-dashed text-zinc-500 ${backgroundColor}`}
                    >
                        <PlusCircle
                            className={iconColor}
                            strokeWidth={1.25}
                            size={20}
                        />
                        <span className={textColor}>Add Column</span>
                    </h2>
                )}
            </div>
            <ViewHTMLDialog
                openDialog={viewHTMLCode}
                htmlCode={htmlCode}
                closeDialog={closeDialog}
            />
        </div>
    );
}
