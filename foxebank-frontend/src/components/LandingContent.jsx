import { Box, Flex, Heading, Text, Image, VStack } from "@chakra-ui/react"

function LandingContent() {
  return (
    <Box bg="white" w="100%" py={3}>
      {/* Hero Section */}
      <Flex>
        {/* Left Section — Text */}
        <Flex
          flex="1"
          align="center"
          justify="center"
          p={10}
          textAlign="left"
          bg="white"
        >
          <VStack align="start" spacing={10}>
            <Heading fontSize="6xl" fontWeight="bold" color="red.400" mb={5}>
              Swift. Smart. Secure.
            </Heading>
            <Text fontSize="xl" maxW="md" color="gray.600">
              Experience next-generation digital banking built for speed, simplicity,
              and safety. Manage your money anytime, anywhere.
            </Text>
          </VStack>
        </Flex>

        {/* Right Section — Image */}
        <Box flex="1">
          <Image
            src="/landing-img1.png"
            alt="Banking Illustration"
            objectFit="cover"
            w="100%"
            h="100%"
          />
        </Box>
      </Flex>

      {/* Orange Divider Line (using Box) */}
      <Box w="100%" h="10px" bg="#6A220C" my={10} />

      {/* Cards Section */}
      <Box mt={10} display="flex" justifyContent="center" bg="gray.200" m = {5} p={10}>
        <Box
          bg="gray.50"
          borderRadius="2xl"
          boxShadow="lg"
          p={10}
          maxW="1000px"
          textAlign="center"
        >
          <Heading fontSize="3xl" fontWeight="bold" color="red.400" mb={10}>
            Why Choose FOXe-Bank?
          </Heading>

          <Flex justify="center" flexWrap="wrap" gap={8}>
            {/* Card 1 */}
            <Box
              bg="white"
              borderRadius="xl"
              boxShadow="md"
              p={6}
              flex="1"
              minW="250px"
              maxW="280px"
              transition="0.3s"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            >
              <Heading fontSize="xl" color="red.400" mb={3}>
                Lightning Fast
              </Heading>
              <Text color="gray.600">
                Enjoy instant transactions and transfers with zero delays. Your time matters to us.
              </Text>
            </Box>

            {/* Card 2 */}
            <Box
              bg="white"
              borderRadius="xl"
              boxShadow="md"
              p={6}
              flex="1"
              minW="250px"
              maxW="280px"
              transition="0.3s"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            >
              <Heading fontSize="xl" color="red.400" mb={3}>
                Top-Tier Security
              </Heading>
              <Text color="gray.600">
                Your data and funds are protected with industry-grade encryption and authentication.
              </Text>
            </Box>

            {/* Card 3 */}
            <Box
              bg="white"
              borderRadius="xl"
              boxShadow="md"
              p={6}
              flex="1"
              minW="250px"
              maxW="280px"
              transition="0.3s"
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
            >
              <Heading fontSize="xl" color="red.400" mb={3}>
                24/7 Support
              </Heading>
              <Text color="gray.600">
                Get assistance anytime with our friendly and reliable customer service team.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default LandingContent
