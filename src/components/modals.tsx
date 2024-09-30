'use client';

import SubscriptionModal from "@/features/subscriptions/components/SubscriptionModal";
import { useEffect, useState } from "react";

function Modals ()
{
    const [ isMounted, setIsMounted ] = useState( false );
    useEffect( () =>
    {
        setIsMounted( true );
    }, [] );

    if ( !isMounted )
    {
        return null;
    }
    return (
        <>
            <SubscriptionModal />
        </>
    );
}

export default Modals;
