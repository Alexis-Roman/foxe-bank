import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

export default function History() {
  const transactions = [
    {
      ref: "TXN-20251010001",
      datetime: "2025-10-10 09:42 AM",
      sender: "Alexis Roman",
      receiver: "John Cruz",
      amount: "₱2,000.00",
      balance: "₱8,500.00",
      action: "Cash Out",
    },
    {
      ref: "TXN-20251008007",
      datetime: "2025-10-08 04:15 PM",
      sender: "Alexis Roman",
      receiver: "Maria Dela Cruz",
      amount: "₱1,200.00",
      balance: "₱10,500.00",
      action: "Cash Out",
    },
    {
      ref: "TXN-20251005003",
      datetime: "2025-10-05 11:30 AM",
      sender: "Fox Bank Rewards",
      receiver: "Alexis Roman",
      amount: "₱500.00",
      balance: "₱11,700.00",
      action: "Cash In",
    },
  ];

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
                <th style={{ ...thStyle, textAlign: "right" }}>Balance</th>
              </tr>
            </thead>

            <tbody>
              {transactions.map((txn) => (
                <tr key={txn.ref} style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                  <td style={tdStyle}>{txn.ref}</td>
                  <td style={tdStyle}>{txn.datetime}</td>
                  <td style={tdStyle}>{txn.sender}</td>
                  <td style={tdStyle}>{txn.receiver}</td>
                  <td style={tdStyle}>
                    <Text
                      as="span"
                      fontWeight="bold"
                      color={txn.action === "Cash In" ? "green.400" : "red.400"}
                    >
                      {txn.action}
                    </Text>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{txn.amount}</td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>{txn.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
}
