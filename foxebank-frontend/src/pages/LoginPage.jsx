import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Flex,Heading,Button,Text,Input,VStack } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster"; // import your new toaster
import Navbar from "../components/Navbar";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.success) {
        // Store user info
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.name);
        localStorage.setItem("balance", data.balance);

        // Show success toast
        toaster.create({
          title: "Login Successful!",
          description: `Welcome, ${data.name}!`,
          type: "success",
          duration: 3000,
        });

        // Delay navigation slightly so toast can show before redirect
        setTimeout(() => navigate("/dashboard"), 600);
      } else {
        // Error toast
        toaster.create({
          title: "Login Failed",
          description: data.message || "Invalid email or password.",
          type: "error",
          duration: 3000,
        });
      }

    } catch (error) {
      console.error("Error during login:", error);
      toaster.create({
        title: "Network Error",
        description: "Login failed. Please try again later.",
        type: "error",
        duration: 3000,
      });
    }
  };

  return (
<Flex direction="column" h="100vh">
  {/* Navbar at the top */}
  <Navbar />

  {/* Main content */}
  <Flex flex="1">
    {/* Left Section */}
    <Flex
      w="35%"
      h="100%"
      bg="#340C04"
      align="center"
      justify="center"
      direction="column"
      p={10}
    >
      <Heading mb={100} textAlign="center" pb={50}> Don’t have an account yet? </Heading>

      <Button
        bg="#340C04"
        rounded="full"
        paddingX="10"
        color="white"
        onClick={() => navigate("/signup")}
      >
        Sign up
      </Button>
    </Flex>

    {/* Right Section */}
    <Flex
      w="65%"
      h="100%"
      bg="gray.700"
      align="center"
      justify="center"
      p={10}
    >
      <VStack spacing={4} w="full" maxW="400px">
        <Heading>Login</Heading>
        <Button>Login Using Google</Button>
        <Text>or</Text>

        <Field.Root>
          <Field.Label>Email</Field.Label>
          <Input
            placeholder="me@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

        <Button
          bg="#C04116"
          color="white"
          rounded="full"
          paddingX="10"
          mt={2}
          onClick={handleLogin}
        >
          Login
        </Button>
      </VStack>
    </Flex>
  </Flex>
</Flex>

  );
}

export default LoginPage;
