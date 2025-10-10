import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Heading, Button, Text, Input, VStack } from "@chakra-ui/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function LandingPage() {
  const navigate = useNavigate();

  return (
     <Flex direction="column" minH="100vh" bg="gray.900" color="white">
      {/* Full-width Navbar */}
      <Box w="100%">
        <Navbar />
      </Box>

      {/* Main Content */}
      <Flex flex="1" align="center" justify="center">
        <VStack spacing={6} textAlign="center">
          <Heading fontSize="4xl">Welcome to FoxeBank 🦊</Heading>
          <Text fontSize="lg">Please log in or sign up to continue</Text>
          <Flex gap={4}>
            <Button colorScheme="red" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button colorScheme="red" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Flex>
        </VStack>
      </Flex>

      {/* Full-width Footer */}
      <Flex w="100%" align="center" justify="center" py={4} bg="gray.800">
        <Footer />
      </Flex>
    </Flex>
  );
}

export default LandingPage;
