'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCheckout } from "../api/use-checkout";
import { useFailModal } from "../store/use-fail-modal";
import { useRouter } from "next/navigation";

function FailModal ()
{
    const mutation = useCheckout();
    const { isOpen, onClose } = useFailModal();
    const router = useRouter();
    const handleClose = () =>
    {
        router.replace( '/' );
        onClose();
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="flex items-center space-y-4">
                    <Image src={'./logo.svg'} alt="logo" width={36} height={36} />
                    <DialogTitle className="text-center">
                        Something went wrong
                    </DialogTitle>
                    <p className="text-muted-foreground">
                        Couldn&apos;t process your payment
                    </p>
                </DialogHeader>

                <DialogFooter className="pt-2 mt-4 gap-2">
                    <Button className="w-full"
                        onClick={handleClose}
                        disabled={mutation.isPending}>
                        Continue
                    </Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    );
}

export default FailModal;
