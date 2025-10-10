import React from "react";
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";

function Dashboard() {
  const user = {
    name: "Alexis Roman",
    balance: 12500.75,
  };

  return (
    <Box
      h="100vh"
      w="100vw"
      bg="gray.800"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      gap={6}
    >
      <Heading size="lg">Welcome, {user.name} 👋</Heading>

      <Box textAlign="center">
        <Text fontSize="sm" color="gray.400">
          Total Balance
        </Text>
        <Text fontSize="4xl" fontWeight="bold" mt={1}>
          ₱{user.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </Text>
      </Box>

      <Button colorScheme="red" size="lg">
        Send Money
      </Button>
    </Box>
  );
}

export default Dashboard;
