import { Flex, Skeleton, Stack } from "@chakra-ui/react";

function TableSkelton() {
  return (
    <Stack maxW={"85%"} mx={"auto"} my={10}>
      {Array.from({ length: 10 }, (_, idx) => (
        <Flex
          key={idx}
          alignItems={"center"}
          justifyContent={"space-between"}
          p={2}
          h={"50px"}
          border={"1px solid #333"}
        >
          <Skeleton height="9px" w={"100px"} bg={"gray"} />
          <Skeleton height="9px" w={"100px"} bg={"gray"} />
          <Skeleton height="9px" w={"100px"} bg={"gray"} />
          <Skeleton height="9px" w={"100px"} bg={"gray"} />

          <Flex gap={2}>
            <Skeleton
              height="30px"
              w={"50px"}
              startColor="red.300"
              endColor="red.500"
            />
            <Skeleton
              height="30px"
              w={"50px"}
              startColor="blue.300"
              endColor="blue.500"
            />
          </Flex>
        </Flex>
      ))}
    </Stack>
  );
}

export default TableSkelton;
