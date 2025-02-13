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
import {
    SelectedElement,
    SelectedElementContext,
} from "@/context/SelectedElementContext";
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

    const [selectedElement, setSelectedElement] = useState<
        SelectedElement | undefined
    >(undefined);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Get the stored strings from localStorage
            const userDetailsString = localStorage.getItem("userDetails");
            const emailTemplateString = localStorage.getItem("emailTemplate");

            // Parse the strings safely with defaults
            let storage;
            let emailTemplateStorage;

            try {
                storage = userDetailsString
                    ? JSON.parse(userDetailsString)
                    : {};
            } catch (error) {
                console.error(
                    "Error parsing userDetails from localStorage:",
                    error
                );
                storage = {};
            }

            try {
                emailTemplateStorage = emailTemplateString
                    ? JSON.parse(emailTemplateString)
                    : [];
            } catch (error) {
                console.error(
                    "Error parsing emailTemplate from localStorage:",
                    error
                );
                emailTemplateStorage = [];
            }

            setEmailTemplateLayout(emailTemplateStorage);

            if (!storage?.email || Object.keys(storage).length === 0) {
                // Redirect to HomeScreen if needed
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

    useEffect(() => {
        if (selectedElement) {
            const updatedEmailTemplate:
                | any[]
                | ((
                      prevState: EmailTemplate | undefined
                  ) => EmailTemplate | undefined)
                | undefined = [];
            emailTemplateLayout?.map((item) => {
                if (item.id === selectedElement?.layout?.id) {
                    updatedEmailTemplate?.push(selectedElement?.layout);
                } else {
                    updatedEmailTemplate.push(item);
                }
            });
            setEmailTemplateLayout(updatedEmailTemplate);
        }
    }, [selectedElement]);

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
                                <SelectedElementContext.Provider
                                    value={{
                                        selectedElement,
                                        setSelectedElement,
                                    }}
                                >
                                    {children}
                                </SelectedElementContext.Provider>
                            </EmailTemplateContext.Provider>
                        </DragDropLayoutElementContext.Provider>
                    </ScreenSizeContext.Provider>
                </UserDetailsContext.Provider>
            </GoogleOAuthProvider>
        </ConvexProvider>
    );
}
