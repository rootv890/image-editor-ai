import { create } from 'zustand';

type useSuccessModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useSuccessModal = create<useSuccessModalProps>( set => ( {
    isOpen: false,
    onOpen: () => set( { isOpen: true } ),
    onClose: () => set( { isOpen: false } )
} ) );
