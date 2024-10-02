'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCheckout } from "../api/use-checkout";
import { useRouter } from "next/navigation";
import { useSuccessModal } from "../store/use-success-modal";

function SuccessModal ()
{
    const mutation = useCheckout();
    const { isOpen, onClose } = useSuccessModal();
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
                        Subscription Successfull
                    </DialogTitle>
                    <p className="text-muted-foreground">
                        You have have successfully subscribed to Canva Clone!
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

export default SuccessModal;
