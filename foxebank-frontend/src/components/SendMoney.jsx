import React, { useState } from "react";
import { Box, Heading, Text, Button, VStack, Input } from "@chakra-ui/react";

function SendMoney() {
  const [accountNumber, setAccountNumber] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSend = async () => {
    try {
      const senderId = localStorage.getItem("userId"); // store this at login
      const receiverId = accountNumber; // assuming account number == userId
      const amt = parseFloat(amount);

      const response = await fetch(
        `http://localhost:8080/api/transaction/${senderId}/cashout?receiverId=${receiverId}&amount=${amt}`,
        { method: "POST" }
      );

      const text = await response.text();
      alert(text); // simple feedback

      // Optionally, update your localStorage balance after sending
      const currentBalance = parseFloat(localStorage.getItem("balance")) || 0;
      localStorage.setItem("balance", currentBalance - amt);

    } catch (error) {
      console.error(error);
      alert("Transaction failed. Check console for details.");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <VStack spacing={4} align="stretch">
        <Heading size="lg" textAlign="center">Send Money</Heading>
        <Text textAlign="center" color="gray.500">Transfer funds securely to another account</Text>

        <Box>
          <Text fontWeight="medium" mb={1}>Account Number</Text>
          <Input
            placeholder="Enter account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
          />
        </Box>

        <Box>
          <Text fontWeight="medium" mb={1}>Recipient Name</Text>
          <Input
            placeholder="Enter recipient name"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
          />
        </Box>

        <Box>
          <Text fontWeight="medium" mb={1}>Amount</Text>
          <Input
            placeholder="Enter amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </Box>

        <Button colorScheme="red" size="md" mt={4} onClick={handleSend}>
          Send
        </Button>
      </VStack>
    </Box>
  );
}

export default SendMoney;
