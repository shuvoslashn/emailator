"use client";
import EmailTemplateList from "@/components/custom/EmailTemplateList";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { useUserDetails } from "@/hooks/useUserDetails";
import Link from "next/link";

export default function Dashboard() {
    const { userDetails } = useUserDetails();
    return (
        <>
            <Header />
            <main className="container xl:px-32">
                <div className="pt-16 flex justify-between items-center">
                    <h2 className="text-xl md:text-2xl">
                        Hello!{" "}
                        <span className="font-bold">
                            {userDetails?.name!.split(" ")[0]}
                        </span>{" "}
                        😊,
                    </h2>
                    <Button asChild>
                        <Link href="/editor/456">+ Create New</Link>
                    </Button>
                </div>
                <EmailTemplateList />
            </main>
        </>
    );
}
