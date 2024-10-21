import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { Trash2 } from "lucide-react";
import { IProudct } from "../../Interface";
import { SERVER_URL } from "../../config";
import { useAppDispatch } from "../../redux/store";
import { removeItem } from "../../redux/features/Cart/cartSlice";
interface IProps {
  details: IProudct;
}
function CartDetails({ details }: IProps) {
  const dispatch = useAppDispatch();
  function handleRemove(id: number) {
    dispatch(removeItem(id));
  }
  return (
    <Flex
      border={"1px solid white"}
      rounded={"md"}
      p={4}
      alignItems={"center"}
      justifyContent={"center"}
      gap={2}
      wrap={"wrap"}
      mt={4}
    >
      <Box>
        <Image
          src={`${SERVER_URL}${details.attributes.thumbnail.data?.attributes.url}`}
          alt={`${details.attributes.thumbnail.data?.attributes.name}`}
          w={"80px"}
          h={"80px"}
          borderRadius={"full"}
        />
      </Box>
      <Flex flexDir={"column"} alignItems={"center"} mt={3}>
        <Text fontSize={"lg"} fontWeight={"bold"}>
          {details.attributes.title}
        </Text>
        <Divider />
        <Flex gap={4} mt={3} alignItems={"center"}>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Price: {details.attributes.price}
          </Text>
          <Text fontSize={"md"} fontWeight={"bold"}>
            Quantity: {details.qtw}
          </Text>
        </Flex>
        <Box onClick={() => handleRemove(details.id)}>
          <Text bg="red.400" rounded={"md"} mt={1} p={1} colorScheme={"red"}>
            <Trash2 />
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
}

export default CartDetails;
