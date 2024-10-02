'use client';

import { useEffect } from "react";
import { useFailModal } from "../store/use-fail-modal";

import { useSearchParams } from "next/navigation";
import { useSuccessModal } from "../store/use-success-modal";

const SubscriptionAlert = () =>
{
    const { onOpen: onOpenFail } = useFailModal();
    const { onOpen: onOpenSuccess } = useSuccessModal();
    const params = useSearchParams();
    const canceled = params.get( 'canceled' );
    const success = params.get( 'success' );

    useEffect( () =>
    {
        if ( canceled )
        {
            onOpenFail();
        }
        if ( success )
        {
            onOpenSuccess();
        }
    }, [ canceled, onOpenFail, success, onOpenSuccess ] );
    return null;


};

export default SubscriptionAlert;
