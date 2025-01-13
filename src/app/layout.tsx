import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AnimalFinder",
  description: "Find out what animal represents your personality the best!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>AnimalFinder</title>
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
