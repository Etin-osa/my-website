import type { Metadata } from "next";
import "@/styles/globals.scss";
import { roboto } from './fonts';
import { ViewTransitions } from "next-view-transitions";
import { ReactLenis } from 'lenis/react';

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
        <>
            <ReactLenis root options={{ lerp: 0.04, duration: 2, smoothWheel: true }} />

            <ViewTransitions>
                <html lang="en" className={roboto.variable}>
                    <body>
                        {children}
                    </body>
                </html>
            </ViewTransitions>
        </>
    );
}
