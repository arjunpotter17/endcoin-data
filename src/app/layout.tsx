import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MenubarDemo } from "@/components/ui/topbar";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/endcorp.png",
  },
  title: "Endcoin Dashboard",
  description: "A dashboard showing the live status of each node and the heatmap of the node network. Live data is refreshed once every day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster richColors/>
        <MenubarDemo />
        {children}
      </body>
    </html>
  );
}
