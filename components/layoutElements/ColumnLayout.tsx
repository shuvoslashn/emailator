"use client";
import { useDragDropElementLayout } from "@/hooks/useDragDropElemenLayout";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { useId, useState } from "react";
import ButtonComponents from "../custom/elements/ButtonComponents";
import DividerComponents from "../custom/elements/DividerComponents";
import ImageComponents from "../custom/elements/ImageComponents";
import LogoComponents from "../custom/elements/LogoComponents";
import LogoHeaderComponents from "../custom/elements/LogoHeaderComponents";
import SocialComponents from "../custom/elements/SocialComponents";
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
    const [dragging, setDragging] = useState(false);

    const onDragOverHandler = (
        e: React.DragEvent<HTMLDivElement>,
        index: number
    ) => {
        e.preventDefault();
        setDragging(true);
        setDragOver({
            index: index,
            columnId: layout?.id,
        });
    };

    const onDragLeaveHandler = () => {
        setDragging(false);
        setDragOver(undefined);
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
        setDragOver(undefined);
        setDragging(false);
    };

    const GetElementComponent = (element: any) => {
        switch (element?.type) {
            case "Button":
                return <ButtonComponents {...element} />;
            case "Text":
                return <TextComponents {...element} />;
            case "Image":
                return <ImageComponents {...element} />;
            case "Logo":
                return <LogoComponents {...element} />;
            case "LogoHeader":
                return <LogoHeaderComponents {...element} />;
            case "Divider":
                return <DividerComponents {...element} />;
            case "SocialIcons":
                return <SocialComponents {...element} />;
            default:
                return element?.type;
        }
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
                    className={`${!layout?.[index]?.type && "p-4 border-2 border-dashed text-zinc-500"} ${index === dragOver?.index && dragOver?.columnId && "border-primary"} flex flex-col justify-center text-center mb-4`}
                    onDragOver={(e) => onDragOverHandler(e, index)}
                    onDrop={onDropHandle}
                    onDragLeave={onDragLeaveHandler}
                >
                    {GetElementComponent(layout?.[index]) ?? "Drag Here"}
                </div>
            ))}
        </div>
    );
}
