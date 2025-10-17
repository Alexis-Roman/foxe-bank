import React from "react";
import { Box, Text } from "@chakra-ui/react";

export default function MessageBanner({ request }) {
  // request shape as your backend: { requestId, requester: {...}, receiver: {...}, amount, status, timestamp }
  const senderNumber = request?.requester?.number || request?.sender || "Unknown";
  const name = request?.requester?.name || "";
  const time = request?.timestamp || request?.dateTime || "";

  return (
    <Box
      p={4}
      bg="gray.600"
      borderRadius="md"
      cursor="pointer"
      _hover={{ bg: "gray.500" }}
    >
      <Text fontWeight="bold">{name ? `${name} (${senderNumber})` : senderNumber}</Text>
      <Text>Requested ₱{Number(request?.amount || 0).toFixed(2)}</Text>
      <Text fontSize="sm" color="gray.300">
        {time ? new Date(time).toLocaleString() : ""}
      </Text>
    </Box>
  );
}
