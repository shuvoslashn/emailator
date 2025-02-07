"use client";

import ElementList from "@/data/ElementList";
import Layout from "@/data/Layout";
import ElementLayoutCard from "./ElementLayoutCard";

export default function ElementsSideBar() {
    const onDragLayoutStart = (layout: any) => {
        console.log(layout);
    };

    return (
        <div className="h-[94vh] w-full bg-white dark:bg-zinc-900 p-5 flex flex-col gap-8 overflow-y-scroll">
            <div>
                <h2 className="font-semibold text-lg">Layouts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {Layout.map((layout) => (
                        <div
                            key={layout.type}
                            draggable
                            onDragStart={() => onDragLayoutStart(layout)}
                        >
                            <ElementLayoutCard layout={layout} />
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="font-semibold text-lg">Elements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                    {ElementList.map((layout) => (
                        <div
                            key={layout.type}
                            draggable
                            onDragStart={() => onDragLayoutStart(layout)}
                        >
                            <ElementLayoutCard layout={layout} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
