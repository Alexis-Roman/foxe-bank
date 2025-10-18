import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Heading, Button, Input, VStack, Image } from "@chakra-ui/react";
import { Field } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import Navbar from "../components/Navbar";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [number, setNumber] = useState("");
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
          number,
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
    <Flex direction="column" h="100vh">
      {/* Navbar at the top */}
      <Navbar />

      {/* Main content */}
      <Flex flex="1">
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
            <Heading>Sign Up</Heading>

            <Field.Root>
              <Field.Label>Full name</Field.Label>
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
              <Field.Label>Phone Number</Field.Label>
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={number}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, ""); // remove non-numeric
                  setNumber(digitsOnly);
                }}
                maxLength={11}
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

            <Button
              bg="#6A220C"
              rounded="full"
              paddingX="10"
              color="white"
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </VStack>
        </Flex>

        {/* Left Section */}
        <Flex
          w="30%"
          h="100%"
          bg="#6A220C"
          align="center"
          justify="center"
          direction="column"
          p={10}
        >
          <Heading fontSize="4xl" textAlign="center" pb={50} px={120} mt={100}>
            Already have an account?
          </Heading>
          <Button
            bg="#C04116"
            rounded="full"
            paddingX="10"
            color="white"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>

          {/* Image below the Login button */}
          <Image
            src="/signup-img.png" // change to your actual image path
            alt="Login Illustration"
            boxSize="200px"
            objectFit="contain"
            mt={6}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignupPage;
