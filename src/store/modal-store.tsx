import { create } from "zustand";

export type ModalType = "confirmationDialog" | "infoDialog";

interface ModalData {
  confirmationDialog?: {
    title: string;
    content: string | React.ReactNode;
    onConfirm: () => void;
  };
  infoDialog?: {
    title: string;
    content: string | React.ReactNode;
    footerContent: string | React.ReactNode;
    onConfirm: () => void;
    isLoading: boolean;
  };
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  data: {},
  isLoading: false,
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false, data: {} }),
  setLoading: (isLoading: boolean) => set((state) => ({ ...state, isLoading })),
}));
