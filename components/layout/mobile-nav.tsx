"use client"

import * as React from "react"
import { ChevronLeftIcon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SideNavigation } from "@/components/layout/side-nav"

export function MobileNav() {
  
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="p-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <HamburgerMenuIcon className="-mt-0.5 h-7 w-7" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 h-full absolute">
        <SheetClose asChild>
          <Button className="absolute -right-6 top-1/2 -mt-6 z-[1]">
            <ChevronLeftIcon color="white" className="h-4 w-4" />
          </Button>
        </SheetClose>
        <SideNavigation id="mobile_sidenav" className="w-full border-r-0" />
      </SheetContent>
    </Sheet>
  )
}