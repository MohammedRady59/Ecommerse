import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";
interface IProps {
  isOpen: boolean;
  onClose: () => void;
  yesTxt?: string;
  noTxt?: string;
  title: string;
  descrption: string;
  onHandler: () => void;
  isLoading: boolean;
}

function Alert({
  isOpen,
  onClose,
  yesTxt = "Ok",
  noTxt = "Cencel",
  descrption,
  title,
  onHandler,
  isLoading,
}: IProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>{title}</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>{descrption}</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              {noTxt}
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              isLoading={isLoading}
              onClick={onHandler}
            >
              {yesTxt}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
export default Alert;
