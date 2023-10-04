import { JetBrains_Mono as FontMono, Inter as FontSans, Bakbak_One as BakBakOne, Lilita_One } from "next/font/google"

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

export const lilita = Lilita_One({
  subsets: ["latin"],
  variable: "--font-lilita",
  weight: ['400']
})