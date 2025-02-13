"use client";

import { api } from "@/convex/_generated/api";
import Prompt from "@/data/Prompt";
import { useUserDetails } from "@/hooks/useUserDetails";
import axios from "axios";
import { useMutation } from "convex/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export default function AiInputBox() {
    const [userInput, setUserInput] = useState<string>("");
    const [loading, setLoading] = useState(false);
    const SaveTemplate = useMutation(api.emailTemplate.SaveTemplate);
    const { userDetails, setUserDetails } = useUserDetails();
    const router = useRouter();

    const OnGenerate = async () => {
        const PROMPT = Prompt?.EMAIL_PROMPT + "\n-" + userInput;
        const tid = crypto.randomUUID();
        setLoading(true);
        try {
            const result = await axios.post("/api/ai-email-generate", {
                prompt: PROMPT,
            });
            console.log(result.data);

            // Save data to Database
            const res = await SaveTemplate({
                tid: tid,
                design: result.data,
                email: userDetails?.email!,
            });
            console.log(res);
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
            <p className="pb-2 text-zinc-600 dark:text-zinc-300 text-sm">
                Provide details about the email template you'd like to create
            </p>
            <Textarea
                placeholder="Start writing here"
                rows={5}
                className="mb-4"
                onChange={(e) => setUserInput(e.target.value)}
            />
            <div className="w-full flex justify-center">
                <Button
                    disabled={userInput === ""}
                    size={"lg"}
                    className="uppercase w-full"
                    onClick={OnGenerate}
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
    );
}
