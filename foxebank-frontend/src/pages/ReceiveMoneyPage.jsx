import React, { useState } from "react";
import { Flex, VStack, Heading, Input, Button, Text } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/Sidebar";

function ReceiveMoneyPage() {
  const [step, setStep] = useState(1);
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [userData, setUserData] = useState(null);

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
      // Later replace with your actual backend endpoint
      const response = await fetch(`http://localhost:8080/api/users/findByNumber/${number}`);
      if (!response.ok) throw new Error("User not found");

      const data = await response.json();
      setUserData({
        name: data.name,
        number: number,
        amount: amount,
      });

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
          requesterId: requesterId,
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
    <Flex direction="column" h="100vh">

      <Flex flex="1" align="center" justify="center" bg="gray.700" color="white" p={10}>
        {step === 1 ? (
          <VStack spacing={5} w="full" maxW="400px">
            <Heading size="lg" mb={5}>
              Request Money
            </Heading>

            <Field.Root>
              <Field.Label>Sender’s Number</Field.Label>
              <Input
                type="number"
                placeholder="Enter user number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Amount (₱)</Field.Label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Field.Root>

            <Button
              bg="#6A220C"
              color="white"
              rounded="full"
              w="full"
              onClick={handleNext}
            >
              Next
            </Button>
          </VStack>
        ) : (
          <VStack spacing={5} w="full" maxW="400px">
            <Heading size="lg" mb={5}>
              Confirm Request
            </Heading>

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
              bg="#6A220C"
              color="white"
              rounded="full"
              w="full"
              onClick={handleSendRequest}
            >
              Send Request
            </Button>

            <Button
              bg="gray.500"
              color="white"
              rounded="full"
              w="full"
              onClick={() => setStep(1)}
            >
              Back
            </Button>
          </VStack>
        )}
      </Flex>
    </Flex>
  );
}

export default ReceiveMoneyPage;
