import { create } from 'zustand';

type useFailModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useFailModal = create<useFailModalProps>( set => ( {
    isOpen: false,
    onOpen: () => set( { isOpen: true } ),
    onClose: () => set( { isOpen: false } )
} ) );
