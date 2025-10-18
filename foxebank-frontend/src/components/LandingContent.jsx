import { Box, Flex, Heading, Text, Image, VStack } from "@chakra-ui/react"

function LandingContent() {
  return (
    <Box bg="gray.900" w="100%" color="gray.100">
      {/* Hero Section (Gray Background) */}
      <Box bg="gray.600" w="100%" color="white" position="relative" overflow="hidden">
        <Flex>
          {/* Left Section — Text */}
          <Flex
            flex="1"
            align="center"
            justify="center"
            p={10}
            textAlign="left"
            position="relative"
          >
            {/* Half Circle Shape Behind Text */}
            <Box
              position="absolute"
              left="-80px"
              top="50%"
              transform="translateY(-50%)"
              w="250px"
              h="400px"
              bg="#ffbda9ff"
              borderRightRadius="full"
              zIndex={0}
            />

            <VStack align="start" spacing={10} zIndex={1} position="relative" ml={20}>
              <Heading fontSize="6xl" fontWeight="bold" color="#ff5100ff" mb={5}>
                Swift. Smart. Secure.
              </Heading>
              <Text fontSize="xl" maxW="md" color="white" lineHeight="1.8">
                Experience next-generation digital banking built for speed, simplicity,
                and safety. Manage your money anytime, anywhere.
              </Text>
            </VStack>
          </Flex>

          {/* Right Section — Image */}
          <Box flex="1" mr="20">
            <Image
              src="/landing-img1.png"
              alt="Banking Illustration"
              objectFit="cover"
              w="100%"
              h="100%"
              display="block"
            />
          </Box>
        </Flex>

        {/* Divider Line (flush at bottom of image) */}
        <Box w="100%" h="20px" bg="#340C04" mt="0" />
      </Box>

      {/* Cards Section */}
      <Box display="flex" justifyContent="center" bg="gray.900" p={39}>
        <Box
          bg="gray.900"
          borderRadius="2xl"
          boxShadow="lg"
          p={10}
          maxW="1000px"
          textAlign="center"
        >
          <Heading fontSize="3xl" fontWeight="bold" color="#ED960B" mb={10}>
            Why Choose FOXe-Bank?
          </Heading>

          <Flex justify="center" flexWrap="wrap" gap={8}>
            {/* Card 1 */}
            <Box
              bg="gray.700"
              borderRadius="xl"
              boxShadow="md"
              p={6}
              flex="1"
              minW="250px"
              maxW="280px"
              transition="0.3s"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
                bg: "gray.600",
              }}
            >
              <Heading fontSize="xl" color="#ED960B" mb={3}>
                Lightning Fast
              </Heading>
              <Text color="gray.200">
                Send and receive money instantly — no waiting, no hassle. Because your
                time’s worth more than loading screens.
              </Text>
            </Box>

            {/* Card 2 */}
            <Box
              bg="gray.700"
              borderRadius="xl"
              boxShadow="md"
              p={6}
              flex="1"
              minW="250px"
              maxW="280px"
              transition="0.3s"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
                bg: "gray.600",
              }}
            >
              <Heading fontSize="xl" color="#ED960B" mb={3}>
                Simple to Use
              </Heading>
              <Text color="gray.200">
                Clean design, easy controls. FOXe-Bank keeps things simple so you can
                focus on what matters — your money.
              </Text>
            </Box>

            {/* Card 3 */}
            <Box
              bg="gray.700"
              borderRadius="xl"
              boxShadow="md"
              p={6}
              flex="1"
              minW="250px"
              maxW="280px"
              transition="0.3s"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "lg",
                bg: "gray.600",
              }}
            >
              <Heading fontSize="xl" color="#ED960B" mb={3}>
                Secure
              </Heading>
              <Text color="gray.200">
                Your data stays yours. We use solid encryption and safe authentication
                to keep your account protected.
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </Box>
  )
}

export default LandingContent
