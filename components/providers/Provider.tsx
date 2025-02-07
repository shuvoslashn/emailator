"use client";

import { ScreenSizeContext, ScreenSizes } from "@/context/ScreenSizeContext";
import { UserDetails, UserDetailsContext } from "@/context/UserDetailsContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, useEffect, useState } from "react";

export function Provider({ children }: { children: ReactNode }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    const [userDetails, setUserDetails] = useState<UserDetails | undefined>();
    const [screenSize, setScreenSize] = useState<ScreenSizes | undefined>(
        "desktop"
    );

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
                <UserDetailsContext.Provider
                    value={{ userDetails, setUserDetails }}
                >
                    <ScreenSizeContext.Provider
                        value={{ screenSize, setScreenSize }}
                    >
                        {children}
                    </ScreenSizeContext.Provider>
                </UserDetailsContext.Provider>
            </GoogleOAuthProvider>
        </ConvexProvider>
    );
}
