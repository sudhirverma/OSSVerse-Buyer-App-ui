import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/store/modal-store";

const ConfirmationModal = () => {
    const { isOpen, onClose, type, data } = useModal();

    const isModalOpen = isOpen && type === "infoDialog";

    const content = data?.infoDialog?.content;

    const isString = (value: string | React.ReactNode): value is string =>
        typeof value === "string";
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className=" text-lg font-inter font-normal mb-2">
                        {data?.infoDialog?.title}
                    </DialogTitle>
                    <div className="w-full h-[1px] bg-gray-200 my-2" />
                    {isString(content) ? (
                        <DialogDescription className=" text-black font-inter text-sm mt-2 ">
                            {content}
                        </DialogDescription>
                    ) : (
                        content
                    )}
                </DialogHeader>
                <DialogFooter className=" px-6 py-4">
                    {data?.infoDialog?.footerContent}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmationModal;
