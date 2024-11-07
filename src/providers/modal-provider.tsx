import ConfirmationModal from "@/components/modals/confirmation-modal";
import InfoModal from "@/components/modals/info-modal";
import { useState, useEffect } from "react";

const ModalProvider = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <ConfirmationModal />
      <InfoModal />
    </>
  );
};

export default ModalProvider;
