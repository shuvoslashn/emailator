"use client";
import { useDragDropElementLayout } from "@/hooks/useDragDropElemenLayout";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { useId, useState } from "react";
import ButtonComponents from "../custom/elements/ButtonComponents";
import ImageComponents from "../custom/elements/ImageComponents";
import TextComponents from "../custom/elements/TextComponents";

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
        if (element?.type === "Button") {
            return <ButtonComponents {...element} />;
        } else if (element?.type === "Text") {
            return <TextComponents {...element} />;
        } else if (element?.type === "Image") {
            return <ImageComponents {...element} />;
        }
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
                    className={`${!layout?.[index]?.type && "p-4 border-2 border-dashed text-zinc-500"} ${index === dragOver?.index && dragOver?.columnId && "bg-primary/20"} flex justify-center items-center mb-4`}
                    onDragOver={(e) => onDragOverHandler(e, index)}
                    onDrop={onDropHandle}
                >
                    {GetElementComponent(layout?.[index]) ?? "Drag Here"}
                </div>
            ))}
        </div>
    );
}
