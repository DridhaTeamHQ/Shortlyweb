import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

export const metadata: Metadata = {
  title: "Dridha Technologies",
  description: "Building and operating digital products. We build proprietary software to solve complex problems. Engineered for scale, speed, and reliability.",
  keywords: ["Dridha Technologies", "digital products", "software development", "technology", "Shortly"],
  authors: [{ name: "Dridha Technologies" }],
  verification: {
    google: "CkxttSgtsywpHSOchH1Rxa_ud4Uh6GAO9oBXxVPYjs0",
  },
  openGraph: {
    title: "Dridha Technologies",
    description: "Building and operating digital products.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="antialiased"
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
