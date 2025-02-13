import { generateEmailTemplateAiModel } from "@/config/AiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json(
                { error: "Prompt is required" },
                { status: 400 }
            );
        }

        const result = await generateEmailTemplateAiModel.sendMessage(prompt);
        const aiRes = await result.response.text();
        console.log(aiRes);

        // Return the response as JSON
        return NextResponse.json(JSON.parse(aiRes));
    } catch (e) {
        console.error("Error generating email template:", e);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
