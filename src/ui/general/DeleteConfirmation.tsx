"use client";
import {Button, Modal} from "@nextui-org/react";
import {ModalBody, ModalFooter, ModalHeader} from "@nextui-org/modal";

type Props = {
    visible: boolean;
    loading: boolean;
    closeHandler: any;
    onDelete: any;
    renderItem: any
};
export const DeleteConfirmation = ({visible, loading, closeHandler, onDelete, renderItem}: Props) => {
    return <Modal
        closeButton
        backdrop={"blur"}
        aria-labelledby="modal-title"
        isOpen={visible}
        onClose={closeHandler}
    >
        <ModalHeader>
            <p className={"text-lg font-bold"}>
                Delete Confirmation
            </p>
        </ModalHeader>
        <ModalBody>
            <p>Are you sure that you want to delete this item?</p>
            <div className="bg-gray-100 p-4 rounded-3xl max-h-96 overflow-y-scroll">
            {typeof renderItem === "function" && renderItem()}
            </div>
        </ModalBody>
        <ModalFooter >
            <Button onClick={closeHandler}>
                Close
            </Button>
            <Button color="danger" onClick={onDelete}>
                Delete
            </Button>
        </ModalFooter>
    </Modal>
}

