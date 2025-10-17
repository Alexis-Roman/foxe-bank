import React, { useState } from "react";
import { Flex, VStack, Heading, Input, Button } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import Sidebar from "@/components/Sidebar";

function Settings() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const userId = localStorage.getItem("userId"); // or however you store it

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
  
    <Flex h="100vh" bg="gray.700" color="white">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content on the right */}
      <Flex flex="1" align="center" justify="center" p={10}>
        <VStack spacing={5} w="full" maxW="400px">
          <Heading size="lg" mb={5}>
            Account Settings
          </Heading>

          <Field.Root>
            <Field.Label>Old Password</Field.Label>
            <Input
              type="password"
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>New Password</Field.Label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Confirm New Password</Field.Label>
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </Field.Root>

          <Button
            bg="#6A220C"
            color="white"
            rounded="full"
            w="full"
            onClick={handleChangePassword}
          >
            Update Password
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default Settings;
