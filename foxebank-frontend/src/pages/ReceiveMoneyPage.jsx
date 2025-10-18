import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Input,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

function ReceiveMoneyPage() {
  const [step, setStep] = useState(1);
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Step 1 → Fetch user info
  const handleNext = async () => {
    if (!number || !amount) {
      toaster.create({
        title: "Missing Fields",
        description: "Please enter both the sender’s number and amount.",
        type: "warning",
        duration: 2500,
      });
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/users/findByNumber/${number}`
      );
      if (!response.ok) throw new Error("User not found");

      const data = await response.json();
      setUserData({ name: data.name, number, amount });
      setStep(2);
    } catch (error) {
      toaster.create({
        title: "User Not Found",
        description: "No user found with this number.",
        type: "error",
        duration: 2500,
      });
    }
  };

  // Step 2 → Send request
  const handleSendRequest = async () => {
    try {
      const requesterId = localStorage.getItem("userId");
      const response = await fetch("http://localhost:8080/api/transaction/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterId,
          receiverNumber: userData.number,
          amount: parseFloat(userData.amount),
        }),
      });

      if (!response.ok) throw new Error("Failed to send request");

      toaster.create({
        title: "Request Sent",
        description: `You requested ₱${userData.amount} from ${userData.name}.`,
        type: "success",
        duration: 3000,
      });

      setStep(1);
      setNumber("");
      setAmount("");
      setUserData(null);
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Error",
        description: "Failed to send request. Please try again.",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Flex
      minH="100vh"
      justify="center"
      align="center"
      bg="gray.900"
      color="white"
      px={4}
    >
      <Box
        position="relative"
        maxW="md"
        w="100%"
        borderRadius="lg"
        overflow="hidden"
        boxShadow="2xl"
      >
        {/* Header Section (Fully Orange) */}
        <Box bg="#ED960B" p={6} textAlign="center" position="relative">
          <CloseButton
            position="absolute"
            top="10px"
            left="10px"
            color="white"
            bg="transparent"
            size="lg"
            onClick={() => navigate("/dashboard")}
          />
          <Heading size="lg" color="white">
            {step === 1 ? "Request Money" : "Confirm Request"}
          </Heading>
        </Box>

        {/* Content Section */}
        <Box bg="gray.800" p={6}>
          <VStack spacing={4} align="stretch">
            {step === 1 ? (
              <>
                <Text textAlign="center" color="gray.400">
                  Request funds securely from another account
                </Text>

                <Box>
                  <Text fontWeight="medium" mb={1}>
                    Sender’s Number
                  </Text>
                  <Input
                    type="number"
                    placeholder="Enter sender’s number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </Box>

                <Box>
                  <Text fontWeight="medium" mb={1}>
                    Amount (₱)
                  </Text>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </Box>

                <Button
                  bg="#ED960B"
                  color="white"
                  _hover={{ bg: "#C04116", color: "black" }}
                  size="md"
                  mt={4}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </>
            ) : (
              <>
                <Text>
                  <b>Name:</b> {userData.name}
                </Text>
                <Text>
                  <b>Number:</b> {userData.number}
                </Text>
                <Text>
                  <b>Amount:</b> ₱{userData.amount}
                </Text>

                <Button
                  bg="#C04116"
                  color="white"
                  _hover={{ bg: "#ED960B", color: "black" }}
                  size="md"
                  mt={4}
                  onClick={handleSendRequest}
                >
                  Send Request
                </Button>

                <Button
                  bg="gray.600"
                  color="white"
                  _hover={{ bg: "#6A220C" }}
                  rounded="full"
                  w="full"
                  onClick={() => setStep(1)}
                >
                  Back
                </Button>
              </>
            )}
          </VStack>
        </Box>
      </Box>
    </Flex>
  );
}

export default ReceiveMoneyPage;
