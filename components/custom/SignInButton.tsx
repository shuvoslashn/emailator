"use client";

import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Button } from "../ui/button";

type variantType = {
    size: "default" | "sm" | "lg" | "icon" | null | undefined;
    variant:
        | "default"
        | "link"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | null
        | undefined;
};

export default function SignInButton({ size, variant }: variantType) {
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: "Bearer " + tokenResponse?.access_token,
                    },
                }
            );

            console.log(userInfo?.data);

            // setting data to localStorage
            if (typeof window !== undefined) {
                localStorage.setItem(
                    "userDetails",
                    JSON.stringify(userInfo?.data)
                );
            }
        },
        onError: (errorResponse) => console.log(errorResponse),
    });
    return (
        <>
            <Button size={size} variant={variant} onClick={() => googleLogin()}>
                Get Started
            </Button>
        </>
    );
}
