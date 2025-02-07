import { EmailTemplateContext } from "@/context/EmailTemplateContext";
import { useContext } from "react";

export const useEmailTemplate = () => {
    const context = useContext(EmailTemplateContext);
    if (context === undefined) {
        throw new Error(
            "useEmailTemplate must be used within a EmailTemplateProvider"
        );
    }
    return context;
};
