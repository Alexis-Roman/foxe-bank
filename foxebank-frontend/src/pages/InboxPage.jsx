import React, { useState, useEffect } from "react";
import { Flex, Box, VStack, Spinner, Text } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import MessageBanner from "@/components/MessageBanner";
import MessageDetail from "@/components/MessageDetail";

export default function InboxPage() {
  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  // fetch inbox (only PENDING)
  const fetchInbox = async () => {
    setLoading(true);
    try {
      const res = await fetch(`http://localhost:8080/api/transaction/inbox/${userId}`);
      console.log("FETCH /inbox status:", res.status);
      if (!res.ok) {
        const txt = await res.text();
        console.error("Failed to fetch inbox:", res.status, txt);
        setRequests([]);
        return;
      }
      const data = await res.json();
      console.log("Inbox data:", data);
      setRequests(Array.isArray(data) ? data.filter(r => r.status === "PENDING") : []);
    } catch (err) {
      console.error("Network error fetching inbox:", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      console.warn("No userId in localStorage");
      setLoading(false);
      return;
    }
    fetchInbox();
  }, [userId]);

  // Accept or decline via backend endpoint
  const respondToRequest = async (requestId, accept) => {
    try {
      console.log(`Calling respondToRequest id=${requestId} accept=${accept}`);
      const res = await fetch(
        `http://localhost:8080/api/transaction/request/${requestId}/respond?accept=${accept}`,
        { method: "POST" }
      );
      console.log("respondToRequest status:", res.status);
      if (!res.ok) {
        const txt = await res.text();
        console.error("Backend responded with error:", res.status, txt);
        // Optional: surface to user with a toast
        return false;
      }

      // success: remove request locally (safer) and clear selection
      setRequests(prev => prev.filter(r => r.requestId !== requestId));
      setSelected(null);

      // optional: refetch balances / inbox to be 100% sure
      // await fetchInbox();

      return true;
    } catch (err) {
      console.error("Network error responding to request:", err);
      return false;
    }
  };

  const handleAccept = (id) => respondToRequest(id, true);
  const handleDecline = (id) => respondToRequest(id, false);

  if (loading) {
    return (
      <Flex minH="100vh" bg="gray.900" color="white" justify="center" align="center">
        <Spinner size="xl" color="white" />
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" bg="gray.900" color="white">
      <Sidebar />

      {selected ? (
        <Box flex="1" p={6} w="70%">
          <MessageDetail
            request={selected}
            onAccept={handleAccept}
            onDecline={handleDecline}
            onClose={() => setSelected(null)}
          />
        </Box>
      ) : (
        <Box flex="1" p={6}>
          <VStack spacing={4} align="stretch">
            {requests.length > 0 ? (
              requests.map(req => (
                <Box key={req.requestId} onClick={() => setSelected(req)} cursor="pointer">
                  <MessageBanner request={req} />
                </Box>
              ))
            ) : (
              <Text color="gray.400" textAlign="center">
                No new money requests.
              </Text>
            )}
          </VStack>
        </Box>
      )}
    </Flex>
  );
}
