"use client";

import {
    DragDropLayoutElement,
    DragDropLayoutElementContext,
} from "@/context/DragDropLayoutElementContext";
import {
    EmailTemplate,
    EmailTemplateContext,
} from "@/context/EmailTemplateContext";
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
    const [dragElementLayout, setDragElementLayout] = useState<
        DragDropLayoutElement | undefined
    >();
    const [emailTemplateLayout, setEmailTemplateLayout] = useState<
        EmailTemplate | undefined
    >([]);

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
                        <DragDropLayoutElementContext.Provider
                            value={{ dragElementLayout, setDragElementLayout }}
                        >
                            <EmailTemplateContext.Provider
                                value={{
                                    emailTemplateLayout,
                                    setEmailTemplateLayout,
                                }}
                            >
                                {children}
                            </EmailTemplateContext.Provider>
                        </DragDropLayoutElementContext.Provider>
                    </ScreenSizeContext.Provider>
                </UserDetailsContext.Provider>
            </GoogleOAuthProvider>
        </ConvexProvider>
    );
}
