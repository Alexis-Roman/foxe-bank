import React from "react";
import { Box, Heading, Text, Button, VStack, Input } from "@chakra-ui/react";

function SendMoney() {
  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <VStack spacing={4} align="stretch">
        <Heading size="lg" textAlign="center">
          Send Money
        </Heading>
        <Text textAlign="center" color="gray.500">
          Transfer funds securely to another account
        </Text>

        <Box>
          <Text fontWeight="medium" mb={1}>
            Recipient Name
          </Text>
          <Input placeholder="Enter recipient" />
        </Box>

        <Box>
          <Text fontWeight="medium" mb={1}>
            Amount
          </Text>
          <Input placeholder="Enter amount" type="number" />
        </Box>

        <Button colorScheme="blue" size="md" mt={4}>
          Send
        </Button>
      </VStack>
    </Box>
  );
}

export default SendMoney;
