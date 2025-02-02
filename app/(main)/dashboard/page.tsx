"use client";
import EmailTemplateList from "@/components/custom/EmailTemplateList";
import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { useUserDetails } from "@/hooks/useUserDetails";

export default function Dashboard() {
    const { userDetails, setUserDetails } = useUserDetails();
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
                    <Button>+ Create New</Button>
                </div>
                <EmailTemplateList />
            </main>
        </>
    );
}
