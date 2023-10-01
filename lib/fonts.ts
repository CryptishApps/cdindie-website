import { JetBrains_Mono as FontMono, Inter as FontSans, Bakbak_One as BakBakOne } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const fontBakBak = BakBakOne({
  subsets: ["latin"],
  variable: "--font-bakbak",
  weight: ['400']
})