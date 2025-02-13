import AiInputBox from "@/components/custom/AiInputBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from "lucide-react";

export default function Create() {
    return (
        <div className="px-10 md:px-28 lg:px-44 xl:px-56 py-20 flex flex-col items-center">
            <div className="text-center">
                <p className="font-light text-xl pb-2">
                    Create New Email Template
                </p>
                <h2 className="text-zinc-500 text-4xl tracking-tight leading-[1.3em]">
                    Effortlessly Design and customize professional{" "}
                    <span className="text-primary block">
                        Ai-Powered email template with ease.
                    </span>
                </h2>
            </div>
            <div className="">
                <Tabs
                    defaultValue="AI"
                    className="w-[700px] mt-10 flex flex-col items-center"
                >
                    <TabsList className="h-auto mb-4">
                        <TabsTrigger className="py-3 px-6" value="AI">
                            Create with AI{" "}
                            <Sparkles
                                size={12}
                                className="-mt-1 ml-2 stroke-primary"
                            />
                        </TabsTrigger>
                        <TabsTrigger className="py-3 px-6" value="SCRATCH">
                            Start From Scratch
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="AI">
                        <AiInputBox />
                    </TabsContent>
                    <TabsContent value="SCRATCH">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
