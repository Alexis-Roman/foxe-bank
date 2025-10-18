import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  Input,
  CloseButton,
  Flex,
} from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";

function SendMoney() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    try {
      const senderId = localStorage.getItem("userId");
      const receiverNumber = mobileNumber.trim();
      const amt = parseFloat(amount);

      if (!receiverNumber || !amt || amt <= 0) {
        toaster.create({
          title: "Invalid input",
          description: "Please enter a valid mobile number and amount.",
          type: "error",
          duration: 2500,
        });
        return;
      }

      const response = await fetch(
        `http://localhost:8080/api/transaction/${senderId}/cashout?receiverNumber=${receiverNumber}&amount=${amt}`,
        { method: "POST" }
      );

      const text = await response.text();

      if (response.ok) {
        toaster.create({
          title: "Transaction Successful!",
          description: `You sent ₱${amt.toLocaleString()} to ${
            recipientName || receiverNumber
          }`,
          type: "success",
          duration: 2500,
        });

        const currentBalance = parseFloat(localStorage.getItem("balance")) || 0;
        localStorage.setItem("balance", currentBalance - amt);

        setTimeout(() => navigate("/dashboard"), 1800);
      } else {
        toaster.create({
          title: "Transaction Failed",
          description: text || "Something went wrong.",
          type: "error",
          duration: 3000,
        });
      }
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Network Error",
        description: "Could not connect to server.",
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
        bg="gray.800"
        borderRadius="lg"
        boxShadow="2xl"
        overflow="hidden"
      >
        {/* Header Section */}
        <Box
          bg="#C04116"
          py={4}
          px={6}
          position="relative"
          textAlign="center"
        >
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
            Send Money
          </Heading>
        </Box>

        {/* Content Section */}
        <Box p={6}>
          <Text fontSize="sm" color="whiteAlpha.800" textAlign="center">
            Transfer funds securely to another account
          </Text>
          <VStack spacing={4} align="stretch" mt={2}>
            <Box>
              <Text fontWeight="medium" mb={1}>
                Mobile Number
              </Text>
              <Input
                placeholder="Enter recipient mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                bg="gray.700"
                border="none"
                _focus={{ border: "2px solid #ED960B" }}
              />
            </Box>

            <Box>
              <Text fontWeight="medium" mb={1}>
                Recipient Name
              </Text>
              <Input
                placeholder="Enter recipient name"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                bg="gray.700"
                border="none"
                _focus={{ border: "2px solid #ED960B" }}
              />
            </Box>

            <Box>
              <Text fontWeight="medium" mb={1}>
                Amount
              </Text>
              <Input
                placeholder="Enter amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                bg="gray.700"
                border="none"
                _focus={{ border: "2px solid #ED960B" }}
              />
            </Box>

            <Button
              bg="#C04116"
              color="white"
              _hover={{ bg: "#ED960B", color: "black" }}
              size="md"
              mt={4}
              onClick={handleSend}
            >
              Send
            </Button>
          </VStack>
        </Box>

        <Toaster />
      </Box>
    </Flex>
  );
}

export default SendMoney;
