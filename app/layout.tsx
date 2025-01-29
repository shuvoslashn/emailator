import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ConvexClientProvider } from "./ConvexProvider";
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
                    <ConvexClientProvider>{children}</ConvexClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
