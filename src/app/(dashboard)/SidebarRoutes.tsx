'use client'

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Crown, Home, MessageCircleCode } from "lucide-react"
import SidebarItem from "./SidebarItem"
import { usePathname } from "next/navigation"

type Props = {}

export default function SidebarRoutes({}: Props) {
    const pathname = usePathname()
  return (
    <div className="flex flex-col gap-y-4 flex-1">
        <div className="px-4">
            <Button className="w-full rounded-xl border-none  hover:bg-white transition hover:opacity-75"
                onClick={()=>{
                    console.log('Upgrade Later!');
                }}
                size={'lg'}
                variant={'outline'}
            >
                <Crown className="mr-2 size-4 fill-yellow-400 text-yellow-400"/> Update to Canva Clone Pro
            </Button>
        </div>
        <div className="px-3">
            <Separator/>
        </div>
        <ul className="flex flex-col gap-y-1 px-2 ">
            <SidebarItem href='/' icon={Home} label="Home"  isActive={pathname === '/'} />
        </ul>
        <div className="px-3">
            <Separator/>
        </div>
        <ul className="flex flex-col gap-y-1 px-2 ">
            <SidebarItem href={pathname} icon={CreditCard} label="Billing"  onClick={()=>{}} />
            <SidebarItem href={'mailto:rootv.31.sm@gmail.com'} icon={MessageCircleCode} label="Get Help"  onClick={()=>{}} />
        </ul>
    </div>
  )
}
