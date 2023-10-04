import "@/assets/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/providers"
import { SiteHeader } from "@/components/layout/site-header"
import { SideNavigation } from "@/components/layout/side-nav"
import { AuthProvider } from "@/providers/AuthProvider"
import { getUserSession } from "@/supabase/session";
import { Toaster as NewYorkToaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | Absolute monsters sharing their work`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Indie Developers",
    "Game devlogs",
    "Indie dev",
    "indie dev projects",
    "indie developer community",
  ],
  authors: [
    {
      name: "cryptish_",
      url: "https://x.com/cryptish_",
    },
  ],
  creator: "cryptish_",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@cryptish_",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {

  const { user } = await getUserSession();

  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AuthProvider sessionUser={user}>
              <div className="relative flex min-h-screen flex-col">
                <div className="flex">
                  <div className="hidden lg:flex">
                    <SideNavigation />
                  </div>
                  <div className="flex-1">
                    <SiteHeader/>
                    <div className="min-h-[calc(100vh-57px)] container relative">
                      {children}
                    </div>
                  </div>
                </div>
              </div>
            </AuthProvider>
          </ThemeProvider>
          <Analytics />
          <NewYorkToaster />
        </body>
      </html>
    </>
  )
}