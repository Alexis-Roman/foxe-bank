import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Text, Heading, Button, HStack, Spacer } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"

function Navbar() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    toaster.create({
      title: "Welcome Home!",
      description: "You clicked the Home button.",
      type: "info",
      duration: 3000,
    });
  };

  return (
    <Flex
      as="nav"
      bg="#C04116"
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
          <Heading size="md" cursor="pointer" onClick={() => navigate("/landing")} m={0}>
            FOXe-Bank
          </Heading>
          <Text fontSize="sm" color="white">
            fast online eXchange bank
          </Text>
        </Box>
      </HStack>

      {/* Center Section — Nav Links */}
      {/* <HStack spacing={8}>
        <Text cursor="pointer" _hover={{ color: "red.400" }} onClick={handleHomeClick}>
          Home
        </Text>
        <Text cursor="pointer" _hover={{ color: "red.400" }}>
          About Us
        </Text>
      </HStack> */}

      {/* Right Section — Buttons */}
      <HStack spacing={4}>
        <Button variant="outline" bg="#6A220C" _hover={{ bg: "#8B2B10" }} onClick={() => navigate("/login")}>
          Login
        </Button>
        <Button variant="outline" borderColor="white" color="white"
  _hover={{ bg: "white", color: "black" }} onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </HStack>
    </Flex>
  );
}

export default Navbar;
