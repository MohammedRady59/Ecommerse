import { Text } from "@chakra-ui/react";

interface IProps {
  msg?: string;
}
function ErrorMsg({ msg }: IProps) {
  return (
    <Text
      color="red"
      fontSize={"14px"}
      bg={"red.200"}
      p={2}
      borderRadius={"md"}
      mt={"5px"}
    >
      {msg}
    </Text>
  );
}

export default ErrorMsg;
