import React, { useState } from "react";
import { Flex, Box, Heading, Input, Button, Text } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const userId = localStorage.getItem("userId");

  const handleChangePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      toaster.create({
        title: "Passwords do not match!",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/auth/changePin/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPass: oldPassword,
          newPass: newPassword,
        }),
      });

      const text = await res.text();
      console.log("Change password response:", text);

      if (res.ok && text.includes("successfully")) {
        toaster.create({
          title: "Password updated!",
          description: text,
          type: "success",
          duration: 3000,
        });

        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        toaster.create({
          title: "Update failed",
          description: text,
          type: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Error updating password:", err);
      toaster.create({
        title: "Network error",
        description: "Unable to connect to the server.",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Flex direction="column" minH="100vh" bg="gray.900" color="white">
      <Navbar />

      <Flex flex="1">
        <Sidebar />

        {/* Right side content */}
        <Box flex="1" p={10}>
          <Heading mb={6} color="white">
            Account Settings
          </Heading>

          <Box bg="gray.800" p={8} borderRadius="lg" boxShadow="lg">
            <Text fontSize="xl" mb={4} fontWeight="semibold">
              Change Password
            </Text>

            {/* Thin accent line using Box (replaces Divider) */}
            <Box w="100%" h="2px" bg="#C04116" mb={6} />

            <Box mb={5}>
              <Text mb={2} fontWeight="medium">
                Old Password
              </Text>
              <Input
                type="password"
                placeholder="Enter old password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                bg="gray.700"
                border="none"
                _focus={{ borderColor: "#ED960B" }}
              />
            </Box>

            <Box mb={5}>
              <Text mb={2} fontWeight="medium">
                New Password
              </Text>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                bg="gray.700"
                border="none"
                _focus={{ borderColor: "#ED960B" }}
              />
            </Box>

            <Box mb={8}>
              <Text mb={2} fontWeight="medium">
                Confirm New Password
              </Text>
              <Input
                type="password"
                placeholder="Confirm new password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                bg="gray.700"
                border="none"
                _focus={{ borderColor: "#ED960B" }}
              />
            </Box>

            <Button
              bg="#6A220C"
              color="white"
              _hover={{ bg: "#ED960B", color: "black" }}
              w="200px"
              borderRadius="full"
              onClick={handleChangePassword}
            >
              Update Password
            </Button>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default Settings;
