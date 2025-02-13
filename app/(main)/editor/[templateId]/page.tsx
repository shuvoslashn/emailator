"use client";

import Canvas from "@/components/custom/Canvas";
import EditorHeader from "@/components/custom/EditorHeader";
import ElementsSideBar from "@/components/custom/ElementsSideBar";
import Settings from "@/components/custom/Settings";
import { ScrollArea } from "@/components/ui/scroll-area";
import { api } from "@/convex/_generated/api";
import { useEmailTemplate } from "@/hooks/useEmailTemplate";
import { useUserDetails } from "@/hooks/useUserDetails";
import { useConvex } from "convex/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Editor() {
    const [viewHTMLCode, setViewHTMLCode] = useState<any>();
    const { templateId } = useParams();
    const { userDetails, setUserDetails } = useUserDetails();
    const { emailTemplateLayout, setEmailTemplateLayout } = useEmailTemplate();
    const [loading, setLoading] = useState(false);

    const convex = useConvex();

    useEffect(() => {
        if (userDetails) {
            GetTemplateData();
        }
    }, [userDetails]);

    const GetTemplateData = async () => {
        setLoading(true);

        const result: any = await convex.query(
            api.emailTemplate.GetTemplateDesign,
            {
                tid: templateId as string,
                email: userDetails!.email as string,
            }
        );

        setEmailTemplateLayout(result?.design);
        setLoading(false);
    };

    return (
        <div>
            <EditorHeader viewHTMLCode={(v: any) => setViewHTMLCode(v)} />
            <div className="">
                {/* Editor Body */}
                {loading ? (
                    <div className="w-full h-[90vh] flex justify-center items-center gap-3">
                        <div className="w-6 h-6 border-t-4 animate-spin rounded-full border-primary"></div>
                        <h4 className="text-xl font-bold">Please Wait...</h4>
                    </div>
                ) : (
                    <div className="grid grid-cols-6 pt-[60px] overflow-hidden h-screen">
                        <ElementsSideBar />
                        <ScrollArea className="col-span-4">
                            <Canvas
                                viewHTMLCode={viewHTMLCode}
                                closeDialog={() => setViewHTMLCode(false)}
                            />
                        </ScrollArea>
                        <Settings />
                    </div>
                )}
            </div>
        </div>
    );
}
