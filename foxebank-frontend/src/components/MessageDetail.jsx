import React from "react";
import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";

export default function MessageDetail({ request, onAccept, onDecline, onClose }) {
  if (!request) return null;

  const id = request.requestId;

  return (
    <Box flex="1" bg="gray.800" color="white" p={6} minH="100vh" display="flex" flexDirection="column">
      <HStack justify="space-between" mb={6}>
        <Text fontSize="xl" fontWeight="bold">Money Request</Text>
        {onClose && <Button size="sm" colorScheme="red" onClick={onClose}>Close</Button>}
      </HStack>

      <VStack spacing={4} align="stretch" flex="1">
        <Box bg="gray.700" p={4} borderRadius="md">
          <Text fontSize="sm" color="gray.400">From:</Text>
          <Text fontSize="lg" fontWeight="bold">{request.requester?.name} ({request.requester?.number})</Text>
        </Box>

        <Box bg="gray.700" p={4} borderRadius="md">
          <Text fontSize="sm" color="gray.400">Amount:</Text>
          <Text fontSize="2xl" fontWeight="bold" color="green.300">₱{Number(request.amount).toFixed(2)}</Text>
        </Box>

        <Box bg="gray.700" p={4} borderRadius="md">
          <Text fontSize="sm" color="gray.400">Requested on:</Text>
          <Text>{new Date(request.timestamp).toLocaleString()}</Text>
        </Box>
      </VStack>

      <HStack spacing={4} mt={6}>
        <Button flex="1" colorScheme="green" onClick={() => onAccept(id)}>Accept</Button>
        <Button flex="1" colorScheme="red" onClick={() => onDecline(id)}>Decline</Button>
      </HStack>
    </Box>
  );
}
