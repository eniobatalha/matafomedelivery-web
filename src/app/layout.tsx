import type { Metadata } from "next";
import { Nunito } from "next/font/google"; // Importa Nunito de next/font
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

// Configura a fonte Nunito
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "800", "900"], // Ajuste os pesos conforme necessário
  style: ["normal", "italic"], // Se você usar estilo itálico
});

export const metadata: Metadata = {
  title: "Mata Fome Delivery",
  description: "Gerenciamento de delivery para restaurantes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Aplica Nunito como a fonte global */}
      <body className={`${nunito.className} flex flex-col min-h-screen`}>
        <main className="flex-grow">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
