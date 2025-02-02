"use client";

import { useUserDetails } from "@/hooks/useUserDetails";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Logo from "./Logo";
import SignInButton from "./SignInButton";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
    const { userDetails } = useUserDetails();
    return (
        <header className="py-3 shadow-2xl shadow-zinc-800/10">
            <div className="container flex justify-between items-center gap-4">
                <Logo />

                <nav className="flex gap-4">
                    <ThemeToggle />
                    <>
                        {userDetails?.email ? (
                            <div className="flex items-center gap-2 md:gap-4">
                                <Button asChild className="px-3 py-2">
                                    <Link
                                        className="text-[12px] md:text-sm"
                                        href={"/dashboard"}
                                    >
                                        Dashboard
                                    </Link>
                                </Button>
                                {userDetails?.picture && userDetails?.name && (
                                    <Image
                                        src={userDetails?.picture}
                                        alt={userDetails?.name}
                                        width={35}
                                        height={35}
                                        className="rounded-full ring-2 ring-primary"
                                    />
                                )}
                            </div>
                        ) : (
                            <SignInButton
                                size={"default"}
                                variant={"default"}
                            />
                        )}
                    </>
                </nav>
            </div>
        </header>
    );
}
