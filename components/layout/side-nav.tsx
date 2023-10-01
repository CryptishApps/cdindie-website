"use client"

import { Logo } from "@/components/logos";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image, { ImageProps } from "next/image";
import { ScrollBar } from "@/components/ui/scroll-area";
import ScrollWrapper from "@/components/scroll-wrapper";

import feedbackFiendIcon from '@/assets/images/icons/feedback-fiend.svg'
import feedbackIcon from '@/assets/images/icons/feedback.svg'
import mrrIcon from '@/assets/images/icons/mrr-monster.svg'
import codeIcon from '@/assets/images/icons/code-question.svg'
import saasIcon from '@/assets/images/icons/saas.svg'
import gamingIcon from '@/assets/images/icons/gaming.svg'
import designIcon from '@/assets/images/icons/design.svg'
import homeIcon from '@/assets/images/icons/home.svg'
import jobIcon from '@/assets/images/icons/job.svg'
import lfgIcon from '@/assets/images/icons/lfg.svg'
import launchIcon from '@/assets/images/icons/launch.svg'

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {

}

const links = [
  {
    label: 'SaaS',
    href: '/saas',
    icon: ({ className }: ImageProps) => (
      <Image src={saasIcon.src} width={20} height={20} alt="cdindie saas icon" className={cn("", className)}/>
    )
  },
  {
    label: 'Games',
    href: '/games',
    icon: ({ className }: ImageProps) => (
      <Image src={gamingIcon.src} width={20} height={20} alt="cdindie gaming icon" className={cn("-mt-1", className)}/>
    )
  },
  {
    label: 'Designs',
    href: '/designs',
    icon: ({ className }: ImageProps) => (
      <Image src={designIcon.src} width={20} height={20} alt="cdindie design icon" className={cn("mt-0.5", className)}/>
    )
  },
  {
    label: 'Launches',
    href: '/launches',
    icon: ({ className }: ImageProps) => (
      <Image src={launchIcon.src} width={20} height={20} alt="cdindie launch icon" className={cn("", className)}/>
    )
  },
]

const supportTabs = [
  {
    label: 'Code',
    href: '/help/code',
    icon: ({ className }: ImageProps) => (
      <Image src={codeIcon.src} width={20} height={20} alt="cdindie feedback fiends" className={cn("", className)}/>
    )
  },
  {
    label: 'Feedback',
    href: '/help/feedback',
    icon: ({ className }: ImageProps) => (
      <Image src={feedbackIcon.src} width={20} height={20} alt="cdindie mrr leaderboard icon" className={cn("", className)}/>
    )
  }
]

const leaderboards = [
  {
    label: 'Feedback Fiends',
    href: '/bosses/feedback-fiends',
    icon: ({ className }: ImageProps) => (
      <Image src={feedbackFiendIcon.src} width={20} height={20} alt="cdindie feedback fiends" className={cn("", className)}/>
    )
  },
  {
    label: 'MRR Monsters',
    href: '/bosses/mrr-monsters',
    icon: ({ className }: ImageProps) => (
      <Image src={mrrIcon.src} width={20} height={20} alt="cdindie mrr leaderboard icon" className={cn("", className)}/>
    )
  }
]

const directories = [
  {
    label: 'Jobs',
    href: '/cd/jobs',
    icon: ({ className }: ImageProps) => (
      <Image src={jobIcon.src} width={20} height={20} alt="cdindie job icon" className={cn("", className)}/>
    )
  },
  {
    label: 'LFG',
    href: '/cd/looking-for-group',
    icon: ({ className }: ImageProps) => (
      <Image src={lfgIcon.src} width={20} height={20} alt="cdindie lfg icon" className={cn("", className)}/>
    )
  }
]

const NavButton = (props: any) => (
  <Button asChild variant={props.variant} className="w-full justify-start h-11">
    <Link href={props.href} className="uppercase text-sm">
      <props.icon className="mr-4 h-5 w-5" />
      {props.prefix && <small className="uppsercase text-muted-foreground mr-2">{props.prefix}</small>}
      {` `}{props.label}
    </Link>
  </Button>
)

export function SideNavigation({ className }: SidebarProps) {

  const pathname = usePathname();

  const buttonVariant = (href: string, exact: boolean) => 
    exact ? pathname === href 
      ? 'secondary' : 'ghost' 
      : pathname.startsWith(href) 
        ? 'secondary' 
        : 'ghost';

  return (
    <div className={cn("min-h-screen col-span-1 border-r w-[300px]", className)}>
      <ScrollWrapper>
        <div className="space-y-4 py-4">
          <div className="flex justify-between px-3 py-2">
            <Logo />
            <Badge variant="secondary">BETA</Badge>
          </div>
          <div className="px-3 py-2">
            <Button asChild variant={buttonVariant("/", true)} className="w-full justify-start h-11">
              <Link href="/">
              <Image src={homeIcon.src} width={20} height={20} alt="cdindie home icon" className="mr-4 h-5 w-5"/>
                <small className="uppsercase text-muted-foreground mr-2">PUBLIC/</small>
                BUILDING
              </Link>
            </Button>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg text-muted-foreground font-semibold tracking-tight">
              Discover
            </h2>
            <div className="space-y-1">
              {links.map(link => (
                <NavButton key={link.href} {...link} variant={buttonVariant(link.href, false)} prefix="projects/" />
              ))}
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg text-muted-foreground font-semibold tracking-tight">
              Lend a Hand
            </h2>
            <div className="space-y-1">
              {supportTabs.map(link => (
                <NavButton key={link.href} {...link} variant={buttonVariant(link.href, false)} prefix="help/" />
              ))}
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg text-muted-foreground font-semibold tracking-tight">
              Biggest Brains
            </h2>
            <div className="space-y-1">
              {leaderboards.map(link => (
                <NavButton key={link.href} {...link} variant={buttonVariant(link.href, false)} prefix="bosses/" />
              ))}
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg text-muted-foreground font-semibold tracking-tight">
              Change Directory
            </h2>
            <div className="space-y-1">
              {directories.map(link => (
                <NavButton key={link.href} {...link} variant={buttonVariant(link.href, false)} prefix="CD/" />
              ))}
            </div>
          </div>
        </div>
        <ScrollBar />
      </ScrollWrapper>
    </div>
  )
}