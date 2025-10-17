import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Heading, Text, Button, VStack, Input } from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"

function SendMoney() {
  const [mobileNumber, setMobileNumber] = useState("")
  const [recipientName, setRecipientName] = useState("")
  const [amount, setAmount] = useState("")
  const navigate = useNavigate()

  const handleSend = async () => {
    try {
      const senderId = localStorage.getItem("userId") // stored at login
      const receiverNumber = mobileNumber.trim()
      const amt = parseFloat(amount)

      if (!receiverNumber || !amt || amt <= 0) {
        toaster.create({
          title: "Invalid input",
          description: "Please enter a valid mobile number and amount.",
          type: "error",
          duration: 2500,
        })
        return
      }

      const response = await fetch(
        `http://localhost:8080/api/transaction/${senderId}/cashout?receiverNumber=${receiverNumber}&amount=${amt}`,
        { method: "POST" }
      )

      const text = await response.text()

      if (response.ok) {
        toaster.create({
          title: "Transaction Successful!",
          description: `You sent ₱${amt.toLocaleString()} to ${recipientName || receiverNumber}`,
          type: "success",
          duration: 2500,
        })

        const currentBalance = parseFloat(localStorage.getItem("balance")) || 0
        localStorage.setItem("balance", currentBalance - amt)

        setTimeout(() => navigate("/dashboard"), 1800)
      } else {
        toaster.create({
          title: "Transaction Failed",
          description: text || "Something went wrong.",
          type: "error",
          duration: 3000,
        })
      }
    } catch (error) {
      console.error(error)
      toaster.create({
        title: "Network Error",
        description: "Could not connect to server.",
        type: "error",
        duration: 3000,
      })
    }
  }

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <VStack spacing={4} align="stretch">
        <Heading size="lg" textAlign="center">Send Money</Heading>
        <Text textAlign="center" color="gray.500">
          Transfer funds securely to another account
        </Text>

        <Box>
          <Text fontWeight="medium" mb={1}>Mobile Number</Text>
          <Input
            placeholder="Enter recipient mobile number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
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

      <Toaster />
    </Box>
  )
}

export default SendMoney
