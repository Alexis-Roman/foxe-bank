import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Button,
  Text,
  Input,
  VStack,
} from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";

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

      const text = await response.text(); // backend returns plain text

      alert(text); // simple feedback

        if (text.startsWith("Welcome")) {
          const [_, rest] = text.split("Welcome ");
          const [username, balance] = rest.split(",");
          localStorage.setItem("username", username.trim());
          localStorage.setItem("balance", balance.trim());
          navigate("/dashboard");
        }



    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <Flex h="100vh" bg="gray.900" color="white">
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
        <Heading mb={4}>Don’t have an account yet?</Heading>
        <Button colorScheme="red" onClick={() => navigate("/signup")}>
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
          <Button colorScheme="red">Login Using Google</Button>
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

          <Button colorScheme="red" mt={2} onClick={handleLogin}>
            Login
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
