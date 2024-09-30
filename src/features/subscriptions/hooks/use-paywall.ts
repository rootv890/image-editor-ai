import { useSubscriptionModal } from "../store/use-subscription-modal";

export const usePaywall = () =>
{
    const subscriptionModel = useSubscriptionModal();

    const shouldBlock = true;

    return {
        isLoading: false,
        shouldBlock,
        trigglePaywall: () =>
        {
            subscriptionModel.onOpen();
        }
    };
};
