import { createContext, Dispatch, SetStateAction } from "react";

export type EmailTemplate = any[];

type EmailTemplateContextType = {
    emailTemplateLayout: EmailTemplate | undefined;
    setEmailTemplateLayout: Dispatch<SetStateAction<EmailTemplate | undefined>>;
};

export const EmailTemplateContext = createContext<
    EmailTemplateContextType | undefined
>(undefined);
