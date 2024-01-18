import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppin = Poppins({ weight: "300", subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Chatting",
    description:
        "Stay connected with family, friends and people you love aroung the world.",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={poppin.className}>{children}</body>
        </html>
    );
}
