//primereact
import 'primeflex/primeflex.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import "./globals.css";
//components
import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prueba-Dux",
  description: "Prueba tecnica",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="flex w-full h-full gap-4">
          <Sidebar />

          <div className="w-full">
            {children}
          </div>

        </div>
      </body>
    </html>
  );
}
