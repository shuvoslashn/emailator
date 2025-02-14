"use client";

import { useUserDetails } from "@/hooks/useUserDetails";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import SignInButton from "./SignInButton";

export default function Hero() {
    const { userDetails, setUserDetails } = useUserDetails();
    return (
        <section className="w-full min-h-[93.5vh] flex justify-center items-center relative bg-zinc-100 dark:bg-zinc-900">
            <div className="absolute bg-primary w-60 h-60 blur-3xl top-80 left-24 opacity-20"></div>
            <div className="absolute bg-primary w-60 h-60 blur-3xl top-80 right-24 opacity-20"></div>

            <div className="z-30">
                <div className="container text-center max-w-4xl py-16 md:py-24">
                    <h1 className=" font-black text-primary text-3xl md:text-6xl pb-2">
                        Ai Powered
                    </h1>
                    <h3 className=" font-black text-4xl pb-2">
                        Email Templates Generator &
                    </h3>
                    <h1 className="font-black text-primary text-3xl pb-6 md:text-5xl">
                        Drag & Drop Builder
                    </h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        At facilis sunt adipisci debitis possimus, nemo
                        molestias exercitationem, esse, distinctio ipsam unde
                        enim. Minima adipisci hic minus totam quod impedit
                        blanditiis.
                    </p>
                    <div className="flex gap-3 justify-center mt-8">
                        {userDetails?.email ? (
                            <Button>
                                <Link href={"/dashboard"}>
                                    Let's Get Started
                                </Link>
                            </Button>
                        ) : (
                            <SignInButton size={"lg"} variant={"default"} />
                        )}
                    </div>
                </div>

                <div className=" relative pb-16">
                    <Image
                        src={"/builder.webp"}
                        width={1000}
                        height={600}
                        alt="builder"
                        className="shadow-2xl rounded-2xl"
                    />
                </div>
            </div>
        </section>
    );
}
