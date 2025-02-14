import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useConvex } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

type EmailTemplatesType = {
    _id: Id<"emailTemplates">;
    _creationTime: number;
    email: string;
    tid: string;
    design: any;
    description: any;
};

export default function EmailTemplateList() {
    const [emailList, setEmailList] = useState<EmailTemplatesType[]>([]);
    const convex = useConvex();
    const { userDetails, setUserDetails } = useUserDetails();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        userDetails && GetTemplateList();
    }, [userDetails]);

    const GetTemplateList = async () => {
        setLoading(true);
        const result = await convex.query(
            api.emailTemplate.GetAllUserTemplate,
            {
                email: userDetails?.email as string,
            }
        );
        setEmailList(result);
        setLoading(false);
    };

    const formatDate = (timestamp: number) => {
        return new Date(timestamp).toLocaleString("en-US", {
            day: "2-digit",
            month: "short", // 'Jan' instead of 'January'
            hour: "2-digit",
            minute: "2-digit",
            hour12: true, // Ensures AM/PM format
        });
    };

    return (
        <div className="pb-16">
            {loading ? (
                <div className="w-full h-[60vh] flex justify-center items-center gap-3">
                    <div className="w-6 h-6 border-t-4 animate-spin rounded-full border-primary"></div>
                    <h4 className="text-xl font-bold">Please Wait...</h4>
                </div>
            ) : (
                <div className="">
                    <h2 className="font-semibold text-primary mb-8">
                        Workspace
                    </h2>
                    {emailList?.length === 0 ? (
                        <div className="flex flex-col items-center">
                            <Image
                                src={"/mailbox.png"}
                                width={400}
                                height={400}
                                alt="mail box"
                                className="mt-0 lg:-mt-16"
                            />
                            <Button>
                                <Link href={"/dashboard/create"}>
                                    Create New Template
                                </Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {emailList.reverse().map((item, index) => (
                                <Link
                                    href={`/editor/${item?.tid}`}
                                    key={index}
                                    className="hover:scale-105 cursor-pointer p-2 bg-white dark:bg-zinc-800 shadow-2xl shadow-gray-800/10 hover:shadow-gray-800/30 rounded-lg border duration-300"
                                >
                                    <Image
                                        src={"/et.webp"}
                                        width={400}
                                        height={400}
                                        alt="mail box"
                                        className="rounded-md"
                                    />
                                    <div className="p-4">
                                        <h2 className="leading-6 font-bold pb-2">
                                            {item?.description}
                                        </h2>
                                        <p className="text-sm text-zinc-500">
                                            {formatDate(item?._creationTime)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
