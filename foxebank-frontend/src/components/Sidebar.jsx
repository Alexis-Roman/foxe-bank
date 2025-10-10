import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, VStack, Button, Heading, Spacer } from "@chakra-ui/react";

export default function Sidebar() {
  const navigate = useNavigate();
  return (
    <Box
      h="100vh"
      w="320px"
      bg="gray.800"
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={6}
      boxShadow="xl"
    >
      {/* Top Section */}
      <VStack align="start" spacing={6}>
        <Heading size="md" mb={4}>
          🦊 FoxeBank
        </Heading>

        <Button
          w="full"
          justifyContent="center"
          bg="gray.700"
          _hover={{ bg: "gray.600" }}
        >
          Dashboard
        </Button>

        <Button
          w="full"
          justifyContent="center"
          bg="gray.700"
          _hover={{ bg: "gray.600" }}
          onClick={() => navigate("/history")}
        >
          Transactions
        </Button>
      </VStack>

      {/* Bottom Section */}
      <Box>
        <Button
          w="full"
          justifyContent="center"
          colorScheme="red"
          variant="solid"
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
