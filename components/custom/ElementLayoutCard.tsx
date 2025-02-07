"use client";

import { useId } from "react";

export default function ElementLayoutCard({ layout }: any) {
    return (
        <div
            key={useId()}
            className="min-h-24 dark:bg-zinc-800/20 flex items-center justify-center flex-col gap-1 border cursor-grab rounded-md border-dashed hover:border-primary hover:shadow-md group  duration-150"
        >
            {
                <layout.icon
                    strokeWidth={1.3}
                    size={35}
                    className="stroke-zinc-700 dark:stroke-white bg-zinc-400/10 dark:group-hover:stroke-primary duration-150 group-hover:bg-primary/10 p-1.5 rounded-full"
                />
            }
            <h2 className="font-medium text-zinc-700 dark:text-white text-[13px] dark:group-hover:text-primary  duration-150">
                {layout.label}
            </h2>
        </div>
    );
}
