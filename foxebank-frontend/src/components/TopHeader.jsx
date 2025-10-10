import { Flex, Text, VStack, Heading } from "@chakra-ui/react";

function TopHeader({ username, totalSavings }) {
  return (
    <Flex
      w="100%"
      bg="gray.800"
      color="white"
      p={6}
      justify="space-between"
      align="center"
      borderBottom="1px solid"
      borderColor="gray.700"
    >
      <VStack align="flex-start" spacing={0}>
        <Text fontSize="lg">Hello, {username}!</Text>
        <Text fontSize="sm" color="gray.400">
          Total Savings:
        </Text>
        <Heading fontSize="3xl" color="red.400">
          ₱{totalSavings?.toLocaleString() || "0.00"}
        </Heading>
      </VStack>
    </Flex>
  );
}

export default TopHeader;
