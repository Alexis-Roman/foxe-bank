import React, { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar"; // add navbar
import History from "@/components/History";

export default function TransactionPage() {
  const username = localStorage.getItem("username") || "User";
  const totalSavings = parseFloat(localStorage.getItem("balance")) || 0;

  return (
    <Flex direction="column" minH="100vh" bg="gray.900" color="white">
      {/* Navbar at top */}
      <Navbar hideAuthButtons /> {/* hides login/signup buttons */}

      <Flex flex="1">
        <Sidebar />

        <Box flex="1" p={6}>
          <History />
        </Box>
      </Flex>
    </Flex>
  );
}
