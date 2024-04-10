import "@/styles/globals.css";
import {Metadata} from "next";
import {Providers} from "./providers";
import clsx from "clsx";
import Nav from "../ui/layout/Nav";
import Footer from "../ui/layout/Footer";
import ProfileSidebar from "../components/profile/ProfileSidebar";
import NotificationSidebar from "../components/notifications/NotificationSidebar";
import {Toaster} from "react-hot-toast";

export const metadata: Metadata = {
    title: {
        default: "Brainstormers",
        template: `%s - Brainstormers`,
    },
    description: "Start your journey by brainstorming your ideas with other people around the globe or your friends",
    keywords: "business startup ideas, tech startup ideas, small business ideas, easy business startup ideas, low cost, best startup ideas, brainstorming ideas,",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon-16x16.png",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
        <head/>
        <body
            className={clsx(
                "min-h-screen bg-background font-sans antialiased"
            )}
        >
        <Providers>
            <Nav />
            <main className={" grid justify-items-stretch"} style={{minHeight: "calc(100vh - 117px)"}}>
                {children}
            </main>
            <Footer />
            {<ProfileSidebar />}
            {<NotificationSidebar />}
            <Toaster reverseOrder />
        </Providers>
        </body>
        </html>
    );
}
