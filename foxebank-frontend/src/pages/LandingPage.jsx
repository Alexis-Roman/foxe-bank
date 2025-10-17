import React from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Box, Heading, Button, Text, Input, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import LandingContent from "@/components/LandingContent";
import Footer from "../components/Footer";

function LandingPage() {
  const navigate = useNavigate();

  return (
     <Flex direction="column" minH="100vh" bg="gray.900" color="white">
      {/* Full-width Navbar */}
      <Box w="100%">
        <Navbar />
      </Box>

      <LandingContent />

      {/* Full-width Footer */}
      <Flex w="100%" align="center" justify="center" py={4} bg="#340C04">
        <Footer />
      </Flex>
    </Flex>
  );
}

export default LandingPage;
