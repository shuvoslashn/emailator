"use client";
import { useDragDropElementLayout } from "@/hooks/useDragDropElemenLayout";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { useId, useState } from "react";

type DragOverState = {
    index: number;
    columnId: string | undefined;
};

export default function ColumnLayout({ layout }: any) {
    const [dragOver, setDragOver] = useState<DragOverState | undefined>();
    const { emailTemplateLayout, setEmailTemplateLayout } = useEmailTemplate();
    const { dragElementLayout, setDragElementLayout } =
        useDragDropElementLayout();

    const onDragOverHandler = (
        e: React.DragEvent<HTMLDivElement>,
        index: number
    ) => {
        e.preventDefault();
        setDragOver({
            index: index,
            columnId: layout?.id,
        });
    };

    const onDropHandle = () => {
        const index = dragOver?.index;
        setEmailTemplateLayout((prevItem) =>
            prevItem?.map((col) =>
                col.id === layout?.id
                    ? { ...col, [index!]: dragElementLayout?.dragElement }
                    : col
            )
        );
        console.log(emailTemplateLayout);
        setDragOver(undefined);
    };

    const GetElementComponent = (element: any) => {
        console.log(element);
        return element?.type;
    };

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
                gap: "20px",
            }}
        >
            {Array.from({ length: layout?.numOfCol }).map((_, index) => (
                <div
                    key={useId()}
                    className={`p-4 bg-zinc-100 dark:bg-zinc-800 mb-4 ${index === dragOver?.index && dragOver?.columnId && "bg-primary/20"}`}
                    onDragOver={(e) => onDragOverHandler(e, index)}
                    onDrop={onDropHandle}
                >
                    {GetElementComponent(layout?.[index]) ??
                        "Drag Element Here"}
                </div>
            ))}
        </div>
    );
}
