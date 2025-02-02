import { ThemeProvider } from "@/components/providers/ThemeProvider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Provider } from "../components/providers/Provider";
import "./globals.css";

const poppins = Poppins({
    weight: "400",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Emailator",
    description: "Ai-Powered Email Templates Builder",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Provider>
                        <main>{children}</main>
                    </Provider>
                </ThemeProvider>
            </body>
        </html>
    );
}
