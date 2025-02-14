import type { Metadata } from "next";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Todo List App",
  description: "A simple todo list application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex flex-col items-center justify-center min-h-screen">
        {children}
      </body>
    </html>
  );
}