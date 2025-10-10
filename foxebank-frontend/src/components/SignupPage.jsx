import React, { useState } from "react";
import { Flex, Heading, Button, Input, VStack } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";

function SignUpPage() {
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const res = await fetch("http://localhost:8080/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: username,
        birthday: birthday,
        email,
        password,
        confirmPassword
      })
    });

    const data = await res.json();
    console.log("Signup response:", data);

    if (res.ok) {
      alert("Signup successful!");
    } else {
      alert("Signup failed: " + data);
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

          <Button colorScheme="red" mt={2} onClick={handleSubmit}>
            Sign Up
          </Button>
        </VStack>
      </Flex>

      {/* Left Section */}
      <Flex w="35%" h="100%" bg="gray.800" align="center" justify="center" direction="column" p={10}>
        <Heading mb={4}>Already have an account?</Heading>
        <Button colorScheme="red">Login</Button>
      </Flex>

    </Flex>
  );
}

export default SignUpPage;
