"use client";

import { useUserDetails } from "@/hooks/useUserDetails";
import Link from "next/link";
import Logo from "./Logo";
import SignInButton from "./SignInButton";
import { ThemeToggle } from "./ThemeToggle";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { googleLogout } from "@react-oauth/google";
import Image from "next/image";

export default function Header() {
    const { userDetails, setUserDetails } = useUserDetails();
    const { emailTemplateLayout, setEmailTemplateLayout } = useEmailTemplate();

    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("userDetails");
            localStorage.removeItem("emailTemplate");
        }

        setUserDetails(undefined);
        setEmailTemplateLayout([]);
        googleLogout();

        window.location.href = "/";
    };

    return (
        <header className="py-3 shadow-2xl shadow-zinc-800/10">
            <div className="container flex justify-between items-center gap-4">
                <Logo />

                <nav className="flex gap-4">
                    <ThemeToggle />
                    <>
                        {userDetails?.email ? (
                            <div className="flex items-center gap-2 md:gap-4">
                                {userDetails?.picture && userDetails?.name && (
                                    <DropdownMenu modal={false}>
                                        <DropdownMenuTrigger className="rounded-full">
                                            <Image
                                                src={userDetails?.picture}
                                                alt={userDetails?.name}
                                                width={35}
                                                height={35}
                                                className="rounded-full ring-2 ring-primary cursor-pointer"
                                            />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            align="end"
                                            className="mt-2"
                                        >
                                            <DropdownMenuItem>
                                                <Link
                                                    className="text-[12px] md:text-sm"
                                                    href={"/dashboard"}
                                                >
                                                    Dashboard
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={logout}
                                                className=" cursor-pointer"
                                            >
                                                Logout
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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
