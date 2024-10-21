import {
  Button,
  Card,
  CardBody,
  Heading,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IProudct } from "../Interface";

interface IProps {
  proudctDetail: IProudct;
}
function ProudctCard({ proudctDetail }: IProps) {
  const { colorMode } = useColorMode();
  return (
    <>
      <Card /* maxW="sm" */ bg={"none"} border="1px solid #a8b5c8">
        <CardBody>
          <Image
            src={`${proudctDetail.attributes.thumbnail.data?.attributes.url}`}
            alt={`${proudctDetail.attributes.thumbnail.data?.attributes.name}`}
            /*    borderRadius="50%"
            width="200px"
            height="200px" */
            boxSize={"200px"}
            borderRadius={"full"}
            objectFit={"cover"}
            mx="auto"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md" textAlign="center" marginBottom={"2"}>
              {proudctDetail.attributes.title}
            </Heading>
            <Text textAlign={"center"} fontSize={"sm"}>
              {proudctDetail.attributes.descrption}
            </Text>
            <Text color="purple.600" fontSize="3xl" textAlign={"center"}>
              ${proudctDetail.attributes.price}
            </Text>
            <Button
              as={Link}
              to={`/productDetails/${proudctDetail.id}`}
              bg={colorMode == "light" ? "#e6f3fd" : "#9f7aea"}
              color={colorMode == "light" ? "#9f7aea" : "#e6f3fd"}
              size={"xl"}
              py={"5"}
              border={"none"}
              w={"full"}
              overflow={"hidden"}
              _hover={{
                bg: colorMode == "light" ? "#9f7aea" : "#e6f3fd",
                color: colorMode == "light" ? "#e6f3fd" : "#9f7aea",
              }}
            >
              View Details
            </Button>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default ProudctCard;
