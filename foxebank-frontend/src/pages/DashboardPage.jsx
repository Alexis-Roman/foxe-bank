import React, { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import Action from "../components/Action";

export default function DashboardPage() {
  const userId = localStorage.getItem("userId");
  const [username, setUsername] = useState(localStorage.getItem("username") || "User");
  const [totalSavings, setTotalSavings] = useState(parseFloat(localStorage.getItem("balance")) || 0);

  // Fetch user data from backend to ensure balance is up-to-date
  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userId}`);
      const data = await response.json();
      setUsername(data.name);
      setTotalSavings(data.balance);

      // update localStorage too
      localStorage.setItem("username", data.name);
      localStorage.setItem("balance", data.balance);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData(); // run once on page load
  }, []);

  return (
    <Flex minH="100vh" bg="gray.900" color="white">
      <Sidebar />

      <Box flex="1" p={6}>
        <TopHeader username={username} totalSavings={totalSavings} />
        <Action onTransactionComplete={fetchUserData} /> {/* <--- pass callback */}
      </Box>
    </Flex>
  );
}
