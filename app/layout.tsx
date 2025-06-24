import type React from "react"
import type { Metadata } from "next"
import { Exo_2 } from "next/font/google"
import "./globals.css"

const exo2 = Exo_2({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-exo2",
})

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${exo2.variable}`}>
      <body className="min-h-screen bg-black text-white font-sans antialiased">{children}</body>
    </html>
  )
}
