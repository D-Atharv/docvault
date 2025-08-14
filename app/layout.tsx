import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocVault",
  description: "A clone of the Google Drive UI with Next.js and Tailwind CSS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className = " text-gray-200 dark">
        {children}
      </body>
    </html>
  );
}
