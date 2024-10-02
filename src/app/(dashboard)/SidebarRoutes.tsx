'use client';

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Crown, Home, MessageCircleCode } from "lucide-react";
import SidebarItem from "./SidebarItem";
import { usePathname } from "next/navigation";
import { usePaywall } from "@/features/subscriptions/hooks/use-paywall";
import { useCheckout } from "@/features/subscriptions/api/use-checkout";
import { useBilling } from "@/features/subscriptions/api/use-billing";

type Props = {};

export default function SidebarRoutes ( { }: Props )
{
    const mutation = useCheckout();
    const billingMutation = useBilling();
    const { shouldBlock, isLoading, triggerPaywall } = usePaywall();
    const onClick = () =>
    {
        if ( shouldBlock )
        {
            triggerPaywall();
            return;

        }
        billingMutation.mutate();
    };

    const pathname = usePathname();
    return (
        <div className="flex flex-col gap-y-4 flex-1">
            {shouldBlock && !isLoading &&

                ( <>
                    <div className="px-3">
                        <Button className="w-full rounded-xl border-none  hover:bg-white transition hover:opacity-75"
                            onClick={() =>
                            {
                                mutation.mutate();
                            }}
                            size={'lg'}
                            disabled={mutation.isPending}
                            variant={'outline'}
                        >
                            <Crown className="mr-2 size-4 fill-yellow-400 text-yellow-400" /> Update to Canva Clone Pro
                        </Button>
                    </div>
                    <div className="px-3">
                        <Separator />
                    </div></> )
            }
            <ul className="flex flex-col gap-y-1 px-2 ">
                <SidebarItem href='/' icon={Home} label="Home" isActive={pathname === '/'} />
            </ul>
            <div className="px-3">
                <Separator />
            </div>
            <ul className="flex flex-col gap-y-1 px-2 ">
                <SidebarItem href={pathname} icon={CreditCard} label="Billing" onClick={onClick} />
                <SidebarItem href={'mailto:rootv.31.sm@gmail.com'} icon={MessageCircleCode} label="Get Help" onClick={() => { }} />
            </ul>
        </div >
    );
}
