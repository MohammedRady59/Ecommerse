import { useNavigate, useParams } from "react-router-dom";
import { useAuthQuery } from "../Hooks/useAushQuery";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import ProudctSkleton from "../Components/UI/ProudctSkleton";
import { IProudct } from "../Interface";
import { ArrowLeft } from "lucide-react";
import { useAppDispatch } from "../redux/store";
import { addTocart } from "../redux/features/Cart/cartSlice";

function Product() {
  const { colorMode } = useColorMode();
  const navgite = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { isPending, data } = useAuthQuery({
    queryKey: ["details", `${id}`],
    url: `/proudcts/${id}?populate=thumbnail,category`,
  });
  if (isPending)
    return (
      <Box mx={"auto"} maxW={"sm"} mt={20} bg="rgb(25 39 52)">
        <ProudctSkleton />
      </Box>
    );
  const proudct = data.data as IProudct;
  function goBack() {
    navgite(-1);
  }
  return (
    <>
      <Box
        position={"relative"}
        left={"40px"}
        top={"30px"}
        zIndex={10}
        w={"fit-content"}
      >
        <Text
          onClick={() => goBack()}
          display={"flex"}
          gap={"4px"}
          cursor={"pointer"}
          p={2}
          borderRadius={"lg"}
          bg={"rgb(14 165 233)"}
          color={"white"}
        >
          <ArrowLeft /> Back
        </Text>
      </Box>
      <Container
        maxW={{ base: "full", sm: "4xl", md: "6xl" }}
        mt={20}
        color="white"
        p={4}
      >
        <Card
          direction={{ base: "column", md: "column", lg: "row" }}
          overflow="hidden"
          variant="outline"
          border={"none"}
          bg={colorMode == "light" ? "rgb(14 165 233)" : "rgb(25 39 52)"}
          p={4}
          mx={"auto"}
        >
          <Image
            objectFit="cover"
            boxSize={"400px"}
            rounded={"lg"}
            mx={"auto"}
            src={`${proudct.attributes.thumbnail.data?.attributes.url}`}
            alt={proudct.attributes.title}
          />

          <Stack>
            <CardBody>
              <Heading size="md">{proudct.attributes.title}</Heading>

              <Text
                py="2"
                color={
                  colorMode == "dark" ? "rgb(14 165 233)" : "rgb(25 39 52)"
                }
                fontSize={"40px"}
                fontWeight={"bold"}
              >
                {proudct.attributes.price}$
              </Text>
              <Text py="2">{proudct.attributes.descrption}</Text>
              <Text
                py="4"
                color={
                  colorMode == "dark" ? "rgb(14 165 233)" : "rgb(25 39 52)"
                }
                fontWeight={"bold"}
                fontSize={"30px"}
                textAlign={"center"}
              >
                {proudct.attributes.category.data?.attributes.title}
              </Text>
            </CardBody>
            <CardFooter>
              <Button
                variant="solid"
                colorScheme="blue"
                my={2}
                fontSize={"20px"}
                w={"full"}
                _hover={{
                  bg: colorMode == "light" ? "#9f7aea" : "#e6f3fd",
                  color: colorMode == "light" ? "#e6f3fd" : "#9f7aea",
                }}
                bg={colorMode == "light" ? "#e6f3fd" : "#9f7aea"}
                color={colorMode == "light" ? "#9f7aea" : "#e6f3fd"}
                onClick={() => dispatch(addTocart(proudct))}
              >
                Add to cart
              </Button>
            </CardFooter>
          </Stack>
        </Card>
      </Container>
    </>
  );
}

export default Product;
