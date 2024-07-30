import "./globals.css";
import type { Metadata } from "next";
import { Work_Sans as WorkSans } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";

const inter = WorkSans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My App Title",
  description: "My app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
