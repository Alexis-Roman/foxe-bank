import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Button, Text, Input, VStack, Image } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
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
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.name);
        localStorage.setItem("balance", data.balance);

        toaster.create({
          title: "Login Successful!",
          description: `Welcome, ${data.name}!`,
          type: "success",
          duration: 3000,
        });

        setTimeout(() => navigate("/dashboard"), 600);
      } else {
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
          w="30%"
          h="100%"
          bg="#340C04"
          direction="column"
          align="center"
          justify="space-between"
          p={10}
        >
          {/* Top content (Heading + Button) */}
          <Flex direction="column" align="center">
            <Heading fontSize="4xl" textAlign="center" pb={50} px={120} mt={200}>
              Don’t have an account yet?
            </Heading>

            <Button
              bg="#C04116"
              rounded="full"
              paddingX="10"
              color="white"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </Flex>

          {/* Image fixed at bottom */}
          <Image
            src="/login-img.png"
            alt="Sign up promo"
            w={250}
            objectFit="contain"
          />
        </Flex>

        {/* Right Section */}
        <Flex
          w="70%"
          h="100%"
          bg="gray.700"
          align="center"
          justify="center"
          p={10}
        >
          <VStack spacing={4} w="full" maxW="400px">
            <Heading>Login</Heading>
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
