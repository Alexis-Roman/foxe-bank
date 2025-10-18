import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Action() {
  const navigate = useNavigate();

  return (
    <Flex w="100%" justify="center" align="center" mt={6}>
      <Box
        w="100%"
        h="400px"
        bg="gray.800"
        p={8}
        borderRadius="lg"
        boxShadow="xl"
        color="white"
      >
        <Heading size="xl" mb={4} textAlign="left" color="white">
          Actions
        </Heading>

        {/* Thin line divider using Box */}
        <Box w="100%" h="1px" bg="gray.700" mb={8} />

        <Flex justify="flex-start" gap={6}>
          <Button
            bg="#C04116"
            color="white"
            _hover={{ bg: "#ED960B", color: "black" }}
            w="160px"
            h="50px"
            fontWeight="semibold"
            borderRadius="md"
            onClick={() => navigate("/sendMoney")}
          >
            Send Money
          </Button>

          <Button
            bg="transparent"
            border="2px solid #ED960B"
            color="#ED960B"
            _hover={{ bg: "#ED960B", color: "black" }}
            w="160px"
            h="50px"
            fontWeight="semibold"
            borderRadius="md"
            onClick={() => navigate("/receiveMoney")}
          >
            Request Money
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Action;
