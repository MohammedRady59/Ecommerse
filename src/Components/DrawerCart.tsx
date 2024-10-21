import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { getCart, removeAll } from "../redux/features/Cart/cartSlice";
import CartDetails from "./UI/CartDetails";

function DrawerCart() {
  const { cartProudcts } = useSelector((state: RootState) => state.cart);
  const dispatch = useAppDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  return (
    <>
      <Button ref={btnRef} onClick={onOpen}>
        Cart {cartProudcts.length}
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Your Shopping Cart</DrawerHeader>

          <DrawerBody>
            {cartProudcts.length > 0 ? (
              cartProudcts.map((el) => <CartDetails key={el.id} details={el} />)
            ) : (
              <Text>Cart is empty</Text>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant="outline"
              mr={3}
              colorScheme={"red"}
              onClick={() => dispatch(removeAll())}
            >
              Clear All
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
export default DrawerCart;
