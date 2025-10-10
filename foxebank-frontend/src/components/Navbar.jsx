import React from "react";
import { Flex, Box, Text, Heading, Button, HStack, Spacer } from "@chakra-ui/react";

function Navbar() {
  return (
    <Flex
      as="nav"
      bg="gray.900"
      color="white"
      align="center"
      justify="space-between"
      px={10}
      py={4}
      boxShadow="md"
    >
      {/* Left Section — Logo + Name + Tagline */}
      <HStack spacing={3} align="center">
        <Box
          boxSize="40px"
          bg="red.500"
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontWeight="bold"
        >
          F
        </Box>
        <Box lineHeight="1.2">
          <Heading size="md" m={0}>
            FoxeBank
          </Heading>
          <Text fontSize="sm" color="gray.400">
            Smart Banking. Simple Living.
          </Text>
        </Box>
      </HStack>

      {/* Center Section — Nav Links */}
      <HStack spacing={8}>
        <Text cursor="pointer" _hover={{ color: "red.400" }}>
          Home
        </Text>
        <Text cursor="pointer" _hover={{ color: "red.400" }}>
          About Us
        </Text>
      </HStack>

      {/* Right Section — Buttons */}
      <HStack spacing={4}>
        <Button variant="outline" colorScheme="red">
          Login
        </Button>
        <Button colorScheme="red">Sign Up</Button>
      </HStack>
    </Flex>
  );
}

export default Navbar;
