"use client";
import { useDragDropElementLayout } from "@/hooks/useDragDropElemenLayout";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { useScreenSize } from "@/hooks/useScreenSize";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import ColumnLayout from "../layoutElements/ColumnLayout";

export default function Canvas() {
    const { screenSize } = useScreenSize();
    const { dragElementLayout } = useDragDropElementLayout();
    const { emailTemplateLayout, setEmailTemplateLayout } = useEmailTemplate();
    const [dragOver, setDragOver] = useState(false);
    const [isColumnDrag, setIsColumnDrag] = useState(false); // Track if it's a column being dragged
    const [dragLeave, setDragLeave] = useState(true); // Track when dragging leaves

    // Handle drag over event and set the correct states
    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
        setDragLeave(false); // Allow background to highlight
        setIsColumnDrag(!!dragElementLayout?.dragLayout); // Check if a column layout is being dragged
    };

    // Handle drop event
    const onDropHandler = () => {
        setDragOver(false);
        setDragLeave(true); // Reset state when item is dropped

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
        setDragLeave(true); // Reset background color when dragging leaves
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

    return (
        <div className="h-[94vh] w-full bg-zinc-200 dark:bg-zinc-800 p-8 overflow-y-scroll flex justify-center">
            <div
                onDragOver={onDragOver}
                onDrop={onDropHandler}
                onDragLeave={onDragLeaveHandler}
                className={`bg-white dark:bg-zinc-900 p-6 w-full ${screenSize === "desktop" ? "max-w-3xl" : "max-w-sm"} duration-300`}
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
        </div>
    );
}
