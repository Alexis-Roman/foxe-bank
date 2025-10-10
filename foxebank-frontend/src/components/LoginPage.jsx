import React from "react";
import { Flex, Box, Heading, Button, Text, Input, VStack } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";

function LoginPage() {
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
        <Button colorScheme="red">Sign up</Button>
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
            <Input placeholder="me@example.com" />
          </Field.Root>

          <Field.Root>
            <Field.Label>Password</Field.Label>
            <Input type="password" placeholder="Enter password" />
          </Field.Root>

          <Button colorScheme="red" mt={2}>
            Login
          </Button>
        </VStack>
      </Flex>
    </Flex>
  );
}

export default LoginPage;
