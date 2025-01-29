"use client";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
    const { theme, setTheme } = useTheme();
    console.log(theme);
    return (
        <div>
            {theme === "light" ? (
                <Image
                    src="/logo/logo-black.svg"
                    width={160}
                    height={50}
                    alt="Emailator Logo"
                />
            ) : (
                <Image
                    src="/logo/logo-white.svg"
                    width={160}
                    height={50}
                    alt="Emailator Logo"
                />
            )}
        </div>
    );
}
