"use client";

import { UserDetails, userDetailsContext } from "@/context/UserDetailsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useEffect, useState } from "react";

export function Provider({ children }: { children: ReactNode }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const [userDetails, setUserDetails] = useState<UserDetails | undefined>();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = JSON.parse(localStorage.getItem("userDetails")!);

            if (!storage?.email || !storage) {
                // Redirect to HomeScreen
            } else {
                setUserDetails(storage);
            }
        }
    }, []);

    return (
        <ConvexProvider client={convex}>
            <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID!}
            >
                <userDetailsContext.Provider
                    value={{ userDetails, setUserDetails }}
                >
                    {children}
                </userDetailsContext.Provider>
            </GoogleOAuthProvider>
        </ConvexProvider>
    );
}
