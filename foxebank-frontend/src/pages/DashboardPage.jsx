import React, { useEffect, useState } from "react";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import TopHeader from "../components/TopHeader";
import Action from "../components/Action";

export default function DashboardPage() {
  const username = localStorage.getItem("username") || "User";
  const totalSavings = parseFloat(localStorage.getItem("balance")) || 0;

  return (
    <Flex minH="100vh" bg="gray.900" color="white">
      <Sidebar />

      <Box flex="1" p={6}>
        <TopHeader username={username} totalSavings={totalSavings} />
        <Action />
      </Box>
    </Flex>
  );
}
