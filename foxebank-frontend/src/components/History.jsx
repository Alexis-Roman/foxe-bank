import React, { useEffect, useState } from "react";
import { Box, Heading, Text, Spinner, Flex } from "@chakra-ui/react";

export default function History() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId"); 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/transaction/history/${userId}`);
        if (!response.ok) throw new Error("Failed to fetch transactions");
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
      <Flex h="100vh" justify="center" align="center" bg="gray.900">
        <Spinner size="xl" color="white" />
      </Flex>
    );
  }

  return (
    <Flex
      flex="1"
      direction="column"
      bg="gray.900"
      color="white"
      p={6}
      overflow="hidden" // prevent outer scroll
    >
      <Heading size="lg" mb={6}>
        Transaction History
      </Heading>

      <Box
        flex="1"
        bg="gray.800"
        borderRadius="lg"
        p={4}
        overflowY="auto" // vertical scroll if needed
        boxShadow="lg"
      >
        <Box minW="850px"> {/* table min width */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
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
    </Flex>
  );
}
