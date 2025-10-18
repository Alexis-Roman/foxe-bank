import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, VStack, Button } from "@chakra-ui/react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const buttonProps = (path) => ({
    w: "full",
    justifyContent: "center",
    bg: isActive(path) ? "#C04116" : "#6A220C",
    color: "white",
    _hover: {
      bg: isActive(path) ? "#ED960B" : "#C04116",
    },
    transition: "0.2s ease",
    onClick: () => navigate(path),
  });

  return (
    <Box
      h="93.2vh"
      w="320px"
      bg="#6A220C"
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={6}
      boxShadow="xl"
    >
      {/* Top Section */}
      <VStack align="start" spacing={4}>
        <Button {...buttonProps("/dashboard")}>Dashboard</Button>
        <Button {...buttonProps("/inbox")}>Inbox</Button>
        <Button {...buttonProps("/transactions")}>Transactions</Button>
      </VStack>

      {/* Bottom Section */}
      <Box>
        <Button
          w="full"
          mb={3}
          justifyContent="center"
          bg="#C04116"
          color="white"
          _hover={{ bg: "#ED960B" }}
          onClick={() => navigate("/settings")}
        >
          Settings
        </Button>
        <Button
          w="full"
          justifyContent="center"
          bg="#ED960B"
          color="black"
          _hover={{ bg: "#C04116", color: "white" }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
