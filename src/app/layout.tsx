import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { DataProvider } from "@/lib/data-context";
import { AppShell } from "@/components/app-shell";
import { ErrorBoundary } from "@/components/error-boundary";

export const metadata: Metadata = {
  title: "McDonald's Organic Insights | 2025 Analytics Dashboard",
  description: "Enterprise-grade social media analytics dashboard for McDonald's Canada, providing deep insights into organic performance across TikTok, Instagram, Facebook, and Twitter.",
  keywords: ["McDonald's", "Analytics", "Social Media", "Organic Performance", "Dashboard", "Marketing Insights"],
  authors: [{ name: "McDonald's Canada" }],
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: "McDonald's Organic Insights | 2025",
    description: "Enterprise social media analytics dashboard for McDonald's Canada",
    url: 'https://mcd-analytics.cossette.com',
    siteName: "McDonald's Organic Insights",
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "McDonald's Organic Insights | 2025",
    description: "Enterprise social media analytics dashboard for McDonald's Canada",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="font-sans antialiased text-foreground bg-background">
        <DataProvider>
          <ErrorBoundary>
            <AppShell>
              {children}
            </AppShell>
          </ErrorBoundary>
        </DataProvider>
      </body>
    </html>
  );
}
