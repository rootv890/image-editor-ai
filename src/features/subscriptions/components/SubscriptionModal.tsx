'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSubscriptionModal } from "../store/use-subscription-modal";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function SubscriptionModal ()
{
    const { isOpen, onClose } = useSubscriptionModal();
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="flex items-center space-y-4">
                    <Image src={'./logo.svg'} alt="logo" width={36} height={36} />
                    <DialogTitle className="text-center">
                        Update to a Pro
                    </DialogTitle>
                    <p className="text-muted-foreground">Upgrade to paid plan to unlock more feature!</p>
                </DialogHeader>
                <Separator />
                <ul className="space-y-2 ">
                    <li className="flex items-center">
                        <CheckCircle2 className="size-6 mr-2 fill-blue-500 text-white" />
                        <p className="text-sm text-muted-foreground">
                            Unlimited Projects!
                        </p>
                    </li>
                    <li className="flex items-center">
                        <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
                        <p className="text-sm text-muted-foreground">
                            AI Image Generation
                        </p>
                    </li>
                    <li className="flex items-center">
                        <CheckCircle2 className="size-5 mr-2 fill-blue-500 text-white" />
                        <p className="text-sm text-muted-foreground">
                            AI Background Removal
                        </p>
                    </li>
                </ul>
                <DialogFooter className="pt-2 mt-4 gap-2">
                    <Button className="w-full" onClick={() => { }} disabled={false}>
                        Upgrade
                    </Button>
                </DialogFooter> 
            </DialogContent>

        </Dialog>
    );
}

export default SubscriptionModal;
