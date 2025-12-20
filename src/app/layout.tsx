import type { Metadata } from "next";
import "@/styles/globals.scss";
import { roboto } from './fonts';
import { ViewTransitions } from "next-view-transitions";

export const metadata: Metadata = {
    title: "Call me ETIN",
    description: "My personal website which showcases my skills as a frontend developer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ViewTransitions>
            <html lang="en" className={roboto.variable}>
                <body>
                    {children}
                </body>
            </html>
        </ViewTransitions>
    );
}
