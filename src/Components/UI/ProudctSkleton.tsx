import { Box, Flex, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

function ProudctSkleton() {
  return (
    <Box padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="40" mx={"auto"} />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        mx={"auto"}
        w={20}
      />
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="2" />
      <Flex justifyContent={"space-between"}>
        <SkeletonText
          mt="4"
          noOfLines={1}
          spacing="4"
          skeletonHeight="2"
          w={20}
        />
        <SkeletonText
          mt="4"
          noOfLines={1}
          spacing="4"
          skeletonHeight="2"
          w={20}
        />
      </Flex>
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        w={20}
      />
      <SkeletonText
        mt="4"
        noOfLines={1}
        spacing="4"
        skeletonHeight="2"
        w={20}
      />
      <SkeletonText mt="4" noOfLines={1} spacing="4" skeletonHeight="2" />
    </Box>
  );
}

export default ProudctSkleton;
