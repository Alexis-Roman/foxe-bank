import React from "react";
import { Flex, Box, Heading, Button, Text, Input, VStack } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";

function LoginPage() {
  return (
    <Flex h="100vh" bg="gray.900" color="white">
      
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
          <Heading>Sign Up</Heading>

          <Field.Root>
            <Field.Label>Username</Field.Label>
            <Input placeholder="Enter username" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Email</Field.Label>
            <Input placeholder="me@example.com" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input type="password" placeholder="Enter password" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Confirm Password</Field.Label>
            <Input type="password" placeholder="Confirm password" />
          </Field.Root>

          <Button colorScheme="red" mt={2}>
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
        <Button colorScheme="red">Login</Button>
      </Flex>

    </Flex>
  );
}

export default LoginPage;
