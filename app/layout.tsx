import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BioLink Generator",
  description: "Crie uma página de Link na Bio e exporte um HTML pronto para hospedar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
