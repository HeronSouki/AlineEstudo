import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Estudos da Aline — Direito do Consumidor",
  description: "Web app para estudar CDC com quiz, flashcards e poema diário.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className + " bg-gradient-to-b from-white to-rose-50 min-h-screen"}>{children}</body>
    </html>
  );
}
