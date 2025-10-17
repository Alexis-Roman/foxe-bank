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
      py={2}
      boxShadow="md"
    >
    {/* Left Section — Logo + Name + Tagline */}
    <HStack spacing={3} align="center">
      <Box boxSize="45px">
        <img
          src="/foxebank-logo.png"
          alt="FOXe-Bank Logo"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "8px",
            cursor: "pointer"
          }}
          onClick={() => navigate("/landing")}
        />
      </Box>

      <Box lineHeight="1">
        <Heading size="xl" cursor="pointer" onClick={() => navigate("/landing")} m={0}>
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
        <Button variant="outline" borderColor="white" color="white" background="transparent"
  _hover={{ bg: "white", color: "#C04116" }} onClick={() => navigate("/signup")}>
          Sign Up
        </Button>
      </HStack>
    </Flex>
  );
}

export default Navbar;
