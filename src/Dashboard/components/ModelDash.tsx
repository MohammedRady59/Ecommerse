import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onHandler: () => void;
  isLoading: boolean;
  yesTxt: string;
}
function ModelDash({
  isOpen,
  onClose,
  title,
  onHandler,
  isLoading,
  children,
  yesTxt,
}: IProps) {
  return (
    <>
      <Modal
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay bg={"blackAlpha.800"} backdropFilter={"blur(5px)"} />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="blue"
              isLoading={isLoading}
              onClick={onHandler}
              type="button"
            >
              {yesTxt}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ModelDash;
