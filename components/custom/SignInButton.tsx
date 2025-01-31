"use client";

import { api } from "@/convex/_generated/api";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useMutation } from "convex/react";
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
    const CreateUser = useMutation(api.users.CreateUser);
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

            const user = userInfo?.data;

            console.log(user);

            // saving data to localStorage
            if (typeof window !== undefined) {
                localStorage.setItem("userDetails", JSON.stringify(user));
            }

            // saving data to database
            const result = await CreateUser({
                name: user?.name,
                email: user?.email,
                picture: user?.picture,
            });

            const userDetails = {
                ...user,
                _id: (result as { _id?: string })?._id ?? result,
            };

            if (typeof window !== undefined) {
                localStorage.setItem(
                    "userDetails",
                    JSON.stringify(userDetails)
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
