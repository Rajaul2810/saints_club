import type { Metadata } from "next"
import { Outfit, Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const display = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Saints Club Limited",
    template: "%s · Saints Club Limited",
  },
  description:
    "Saints Club Limited — a family-centric social club for alumni of Bangladesh’s premier Christian missionary schools. Formerly Gregorian Alumni Club Limited.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", display.variable, body.variable, "font-sans")}
      data-scroll-behavior="smooth"
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
