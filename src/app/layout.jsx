import "@/index.css";
import { Providers } from "./providers";

export const metadata = {
  title: {
    default: "FinDash — Smart Financial Dashboard",
    template: "%s | FinDash",
  },
  description:
    "Track spending, monitor income, and gain real-time financial insights with FinDash — your intelligent budget dashboard.",
  keywords: [
    "finance",
    "budget",
    "dashboard",
    "spending tracker",
    "income tracker",
    "financial insights",
  ],
  authors: [{ name: "Breezy Budget Biz" }],
  icons: [],
  openGraph: {
    title: "FinDash — Smart Financial Dashboard",
    description:
      "Track spending, monitor income, and gain real-time financial insights.",
    type: "website",
    locale: "en_US",
    siteName: "FinDash",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinDash — Smart Financial Dashboard",
    description:
      "Track spending, monitor income, and gain real-time financial insights.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f6f8" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1120" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
