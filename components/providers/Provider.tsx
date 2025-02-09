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
    // const [emailTemplateLayout, setEmailTemplateLayout] = useState<
    //     EmailTemplate | undefined
    // >([]);
    const [emailTemplateLayout, setEmailTemplateLayout] = useState<
        EmailTemplate | undefined
    >(() => {
        if (typeof window !== "undefined") {
            const storedEmailTemplate = localStorage.getItem("emailTemplate");
            try {
                return storedEmailTemplate
                    ? JSON.parse(storedEmailTemplate)
                    : [];
            } catch (error) {
                console.error(
                    "Error parsing emailTemplate from localStorage:",
                    error
                );
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storage = JSON.parse(localStorage.getItem("userDetails")!);
            const emailTemplateStorage = JSON.parse(
                localStorage.getItem("emailTemplate")!
            );
            setEmailTemplateLayout(emailTemplateStorage);

            if (!storage?.email || !storage) {
                // Redirect to HomeScreen
            } else {
                setUserDetails(storage);
            }
        }
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                localStorage.setItem(
                    "emailTemplate",
                    JSON.stringify(emailTemplateLayout)
                );
            } catch (error) {
                console.error(
                    "Error saving emailTemplate to localStorage:",
                    error
                );
            }
        }
    }, [emailTemplateLayout]);

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
