"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { useModal } from "@/store/modal-store";
import { LoaderCircle } from "lucide-react";

const ConfirmationModal = () => {
  const { isOpen, onClose, type, data, isLoading } = useModal();

  const isModalOpen = isOpen && type === "confirmationDialog";

  const content = data?.confirmationDialog?.content;

  const isString = (value: string | React.ReactNode): value is string =>
    typeof value === "string";
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="">
            {data?.confirmationDialog?.title}
          </DialogTitle>
          {isString(content) ? (
            <DialogDescription className=" ">{content}</DialogDescription>
          ) : (
            content
          )}
        </DialogHeader>
        <DialogFooter className=" px-6 py-4 flex justify-end gap-2">
          <Button onClick={onClose} variant={"ghost"}>
            Cancel
          </Button>
          <Button
            onClick={data?.confirmationDialog?.onConfirm}
            variant={"default"}
            disabled={isLoading}
          >
            {isLoading ? <LoaderCircle className="animate-spin" /> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationModal;
