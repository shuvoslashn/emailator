"use client";
import { useScreenSize } from "@/hooks/useScreenSize";

export default function Canvas() {
    const { screenSize, setScreenSize } = useScreenSize();
    return (
        <div className="h-[94vh] w-full  bg-zinc-200 dark:bg-zinc-800 p-8 overflow-y-scroll flex justify-center">
            <div
                className={`bg-white dark:bg-zinc-900 p-6 w-full ${screenSize === "desktop" ? "max-w-3xl" : "max-w-sm"} duration-300`}
            ></div>
        </div>
    );
}
