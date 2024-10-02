import { useGetSubscription } from "../api/use-get-subscription";
import { useSubscriptionModal } from "../store/use-subscription-modal";

export const usePaywall = () =>
{
    const { data: subscription, isLoading: isLoadingSubscription } = useGetSubscription();
    const subscriptionModel = useSubscriptionModal();

    const shouldBlock = isLoadingSubscription || !subscription?.active;

    return {
        isLoading: isLoadingSubscription,
        shouldBlock,
        triggerPaywall: () =>
        {
            subscriptionModel.onOpen();
        }
    };
};
