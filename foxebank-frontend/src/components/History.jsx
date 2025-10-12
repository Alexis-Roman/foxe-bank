import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Spinner } from "@chakra-ui/react";

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get userId from localStorage
  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/transaction/history/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [userId]);

  const thStyle = {
    textAlign: "left",
    padding: "12px 16px",
    color: "rgba(255,255,255,0.7)",
    fontSize: "0.85rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
  };

  const tdStyle = {
    padding: "12px 16px",
    fontSize: "0.95rem",
    color: "white",
    whiteSpace: "nowrap",
  };

  if (loading) {
    return (
      <Box h="100vh" display="flex" justifyContent="center" alignItems="center">
        <Spinner size="xl" color="white" />
      </Box>
    );
  }

  return (
    <Box
      h="100vh"
      w="100vw"
      bg="gray.900"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={8}
    >
      <Box w="full" maxW="1200px">
        <Heading size="lg" mb={6}>
          Transaction History
        </Heading>

        <Box bg="gray.800" borderRadius="lg" p={4} overflowX="auto" boxShadow="lg">
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 850 }}>
            <thead>
              <tr>
                <th style={thStyle}>Reference No.</th>
                <th style={thStyle}>Date & Time</th>
                <th style={thStyle}>Sender</th>
                <th style={thStyle}>Receiver</th>
                <th style={thStyle}>Action</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Amount</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.transactionId} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={tdStyle}>TXN-{txn.transactionId}</td>
                  <td style={tdStyle}>{new Date(txn.dateTime).toLocaleString()}</td>
                  <td style={tdStyle}>{txn.sender}</td>
                  <td style={tdStyle}>{txn.receiver}</td>
                  <td style={tdStyle}>
                    <Text
                      as="span"
                      fontWeight="bold"
                      color={txn.action === "Received" ? "green.400" : "yellow.400"}
                    >
                      {txn.action}
                    </Text>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>₱{txn.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>

          </table>
        </Box>
      </Box>
    </Box>
  );
}
