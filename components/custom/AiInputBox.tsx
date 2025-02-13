"use client";

import { api } from "@/convex/_generated/api";
import Prompt from "@/data/Prompt";
import { useUserDetails } from "@/hooks/useUserDetails";
import axios from "axios";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type InputType = {
    type: string;
};

export default function AiInputBox({ type }: InputType) {
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate);
    const { userDetails, setUserDetails } = useUserDetails();
    const router = useRouter();

    const OnGenerateAi = async () => {
        const PROMPT = Prompt?.EMAIL_PROMPT + "\n-" + userInput;
        const tid = crypto.randomUUID();
        setLoading(true);
        try {
            const result = await axios.post("/api/ai-email-generate", {
                prompt: PROMPT,
            });

            // Save data to Database
            await SaveTemplate({
                tid: tid,
                design: result?.data,
                email: userDetails?.email!,
                description: userInput,
            });
            // Navigate user to editor screen
            router.push(`/editor/${tid}`);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const OnGenerateBlank = async () => {
        setLoading(true);
        const tid = crypto.randomUUID();
        try {
            // Save data to Database
            await SaveTemplate({
                tid: tid,
                design: "",
                email: userDetails?.email!,
                description: userInput,
            });
            // Navigate user to editor screen
            router.push(`/editor/${tid}`);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <div>
            {type === "AI" ? (
                <div className="w-[600px]">
                    <p className="pb-2 text-zinc-600 dark:text-zinc-300 text-sm">
                        Provide details about the email template
                    </p>
                    <Textarea
                        placeholder="Start writing here"
                        rows={5}
                        className="mb-4 w-6xl"
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <div className="w-full flex justify-center">
                        <Button
                            disabled={userInput === "" || loading}
                            size={"lg"}
                            className={`uppercase w-full ${loading && "animate-pulse"}`}
                            onClick={OnGenerateAi}
                        >
                            {loading ? (
                                <span className="flex gap-2 justify-center items-center">
                                    <span className="w-3 h-3 rounded-full border-t-2 animate-spin"></span>
                                    <span>Generating By AI</span>
                                </span>
                            ) : (
                                <span>Generate</span>
                            )}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="w-[600px]">
                    <p className="pb-2 text-zinc-600 dark:text-zinc-300 text-sm">
                        Provide details about the email template
                    </p>
                    <Textarea
                        placeholder="Start writing here"
                        rows={5}
                        className="mb-4 w-6xl"
                        onChange={(e) => setUserInput(e.target.value)}
                    />
                    <div className="w-full flex justify-center">
                        <Button
                            disabled={userInput === "" || loading}
                            size={"lg"}
                            className={`uppercase w-full ${loading && "animate-pulse"}`}
                            onClick={OnGenerateBlank}
                        >
                            {loading ? (
                                <span className="flex gap-2 justify-center items-center">
                                    <span className="w-3 h-3 rounded-full border-t-2 animate-spin"></span>
                                    <span>Please Wait...</span>
                                </span>
                            ) : (
                                <span>Generate</span>
                            )}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
