"use client";
import { useDragDropElementLayout } from "@/hooks/useDragDropElemenLayout";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { useSelectedElement } from "@/hooks/useSelectedElement";
import { ArrowDown, ArrowUp, Copy, Trash } from "lucide-react";
import { useState } from "react";
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
    const [selectedElement, setSelectedElement] = useSelectedElement();

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

    // Delete Layout
    const deleteLayout = (layoutId: number | string) => {
        const updaedEmaileTemplate = emailTemplateLayout?.filter(
            (item) => item.id !== layout.id
        );
        setEmailTemplateLayout(updaedEmaileTemplate);
        setSelectedElement(null);
    };

    // Move Up Layout
    const moveItemUp = (layoutId: number) => {
        if (!emailTemplateLayout || !Array.isArray(emailTemplateLayout)) return;

        const index = emailTemplateLayout.findIndex(
            (item: { id: number }) => item.id === layoutId
        );

        if (index === -1 || index === 0) return;

        const updatedItems = [...emailTemplateLayout];
        [updatedItems[index], updatedItems[index - 1]] = [
            updatedItems[index - 1],
            updatedItems[index],
        ];

        setEmailTemplateLayout(updatedItems);
    };

    // Move Down Layout
    const moveItemDown = (layoutId: number | string) => {
        if (!emailTemplateLayout || !Array.isArray(emailTemplateLayout)) return;

        const index = emailTemplateLayout.findIndex(
            (item: { id: number }) => item.id === layoutId
        );

        if (index === -1) return;

        const updatedItems = [...emailTemplateLayout];
        [updatedItems[index], updatedItems[index + 1]] = [
            updatedItems[index + 1],
            updatedItems[index],
        ];

        setEmailTemplateLayout(updatedItems);
    };

    // Duplicate Layout
    const duplicateRow = (layoutId: number | string) => {
        if (!emailTemplateLayout || !Array.isArray(emailTemplateLayout)) return;

        // Find the index of the row to duplicate
        const index = emailTemplateLayout.findIndex(
            (item: { id: number | string }) => item?.id === layoutId
        );

        if (index === -1) return; // If the row is not found, exit

        // Create a copy of the row with a new ID (to avoid conflicts)
        const rowToDuplicate = emailTemplateLayout[index];
        const duplicatedRow = {
            ...rowToDuplicate,
            id: Date.now(), // Generate a new unique ID (you can use a better ID generation method)
        };

        // Insert the duplicated row right after the original row
        const updatedLayout = [
            ...emailTemplateLayout.slice(0, index + 1),
            duplicatedRow,
            ...emailTemplateLayout.slice(index + 1),
        ];

        // Update the state with the new layout
        setEmailTemplateLayout(updatedLayout);
    };

    return (
        <div
            style={{
                gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
            }}
            className={`relative grid gap-5 grid-cols-1 sm:grid-cols-2 ${
                selectedElement?.layout?.id === layout?.id &&
                "border border-dashed border-primary"
            }`}
        >
            {Array.from({ length: layout?.numOfCol }).map((_, index) => (
                <div
                    key={index}
                    className={`${!layout?.[index]?.type && "0 border-4 border-dashed text-zinc-500"} ${index === dragOver?.index && dragOver?.columnId && "border-primary"} ${selectedElement?.layout?.id === layout?.id && selectedElement?.index === index && "border-primary border-2 border-dashed"} flex flex-col justify-center items-start text-center cursor-pointer`}
                    onDragOver={(e) => onDragOverHandler(e, index)}
                    onDrop={onDropHandle}
                    onDragLeave={onDragLeaveHandler}
                    onClick={() => setSelectedElement({ layout, index })}
                >
                    {GetElementComponent(layout?.[index]) ?? (
                        <p className="p-6 w-full text-center">Drag Here</p>
                    )}
                </div>
            ))}
            {selectedElement?.layout?.id === layout?.id && (
                <div className="absolute top-0 -right-10 bg-zinc-500/10 border p-2 rounded-full backdrop-blur-sm">
                    <div className="flex flex-col gap-3">
                        <div
                            onClick={() => deleteLayout(layout?.id)}
                            className="cursor-pointer"
                        >
                            <Trash
                                size={16}
                                className="stroke-zinc-800 dark:stroke-zinc-100 hover:stroke-red-500 dark:hover:stroke-red-500 duration-300"
                            />
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => duplicateRow(layout?.id)}
                        >
                            <Copy
                                size={16}
                                className="mb-2 stroke-zinc-800 dark:stroke-zinc-100 hover:stroke-primary dark:hover:stroke-primary duration-300"
                            />
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => moveItemUp(layout?.id)}
                        >
                            <ArrowUp
                                size={16}
                                className="stroke-zinc-800 dark:stroke-zinc-100 hover:stroke-primary dark:hover:stroke-primary duration-300"
                            />
                        </div>
                        <div
                            className="cursor-pointer"
                            onClick={() => moveItemDown(layout?.id)}
                        >
                            <ArrowDown
                                size={16}
                                className="stroke-zinc-800 dark:stroke-zinc-100 hover:stroke-primary dark:hover:stroke-primary duration-300"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
