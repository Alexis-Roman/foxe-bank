import { Flex, Text, VStack, Heading } from "@chakra-ui/react";

function TopHeader({ username, totalSavings }) {
  return (
    <VStack align="flex-start" w="100%" spacing={4}>
      {/* Greeting above the box */}
      <Heading
        fontSize="3xl"
        fontWeight="extrabold"
        color="white"
        textShadow="0 0 15px rgba(255,255,255,0.2)"
        mt={4}
        ml={4}
        mb={3}
      >
        Hello, {username}!
      </Heading>

      {/* Gray box below */}
      <Flex
        w="100%"
        bg="gray.800"
        color="white"
        p={6}
        justify="space-between"
        align="center"
        borderBottom="1px solid"
        borderColor="gray.700"
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack align="flex-start" spacing={0}>
          <Text fontSize="md" color="gray.400">
            Total Savings:
          </Text>
          <Heading fontSize="4xl" color="white">
            ₱{totalSavings?.toLocaleString() || "0.00"}
          </Heading>
        </VStack>
      </Flex>
    </VStack>
  );
}

export default TopHeader;
