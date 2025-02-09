"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    const { theme } = useTheme();
    return (
        <Link href={"/"}>
            {theme === "light" ? (
                <Image
                    src="/logo/logo-black.svg"
                    width={100}
                    height={50}
                    alt="Emailator Logo"
                    className="w-[120px] md:w-[140px] h-auto"
                />
            ) : (
                <Image
                    src="/logo/logo-white.svg"
                    width={100}
                    height={50}
                    alt="Emailator Logo"
                    className="w-[120px] md:w-[140px] h-auto"
                />
            )}
        </Link>
    );
}
