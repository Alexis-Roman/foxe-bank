import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Button, Input, VStack } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      toaster.create({
        title: "Passwords do not match!",
        type: "error",
        duration: 3000,
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: username,
          birthday,
          email,
          password,
          confirmPassword,
        }),
      });

      const text = await res.text();
      console.log("Signup response:", text);

      if (res.ok && text.includes("Successful")) {
        toaster.create({
          title: "Signup successful!",
          description: "Your account has been created successfully.",
          type: "success",
          duration: 3000,
        });

        setTimeout(() => navigate("/login"), 1000);
      } else {
        toaster.create({
          title: "Signup failed",
          description: text || "Please try again later.",
          type: "error",
          duration: 3000,
        });
      }
    } catch (err) {
      console.error("Signup error:", err);
      toaster.create({
        title: "Network error",
        description: "Unable to connect to the server.",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Flex h="100vh" bg="gray.900" color="white">
      {/* Right Section */}
      <Flex w="65%" h="100%" bg="gray.700" align="center" justify="center" p={10}>
        <VStack spacing={4} w="full" maxW="400px">
          <Heading>Sign Up</Heading>

          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input
              placeholder="me@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Birthday</Field.Label>
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field.Root>

          <Field.Root>
            <Field.Label>Confirm Password</Field.Label>
            <Input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Field.Root>

          <Button colorScheme="red" mt={2} onClick={handleSignup}>
            Sign Up
          </Button>
        </VStack>
      </Flex>

      {/* Left Section */}
      <Flex
        w="35%"
        h="100%"
        bg="gray.800"
        align="center"
        justify="center"
        direction="column"
        p={10}
      >
        <Heading mb={4}>Already have an account?</Heading>
        <Button colorScheme="red" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Flex>
    </Flex>
  );
}

export default SignupPage;
