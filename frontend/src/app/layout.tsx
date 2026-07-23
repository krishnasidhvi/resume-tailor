import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Resume Tailor",
  description: "Tailor your master resume to job descriptions securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`} style={{ backgroundColor: 'var(--bg-base)', color: 'var(--label-primary)' }}>
        <nav className="liquid-glass mx-4 mt-4 mb-8 p-4 flex justify-between items-center z-10 sticky top-4">
          <div className="title-2" style={{ color: 'var(--label-primary)' }}>
            Resume Tailor
          </div>
          <div className="flex gap-4">
            <a href="/" className="body-text nav-link">Home</a>
            <a href="/editor" className="body-text nav-link">Master Resume</a>
          </div>
        </nav>
        
        <main className="flex-1 z-10 px-4 pb-12 w-full max-w-7xl mx-auto">
          {children}
        </main>
        
        <div id="toast-root" className="fixed bottom-4 right-4 z-50 flex flex-col gap-2"></div>
      </body>
    </html>
  );
}
