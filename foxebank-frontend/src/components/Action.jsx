import { Box, Flex, Heading, Button } from "@chakra-ui/react";
import { useState } from "react";
import SendMoney from "./SendMoney";

function Action() {
  const [showSendMoney, setShowSendMoney] = useState(false);

  return (
    <Flex w="100%" justify="center" align="center" mt={10}>
      <Box
        w="100%"
        maxW="600px"
        bg="gray.800"
        p={6}
        borderRadius="lg"
        boxShadow="xl"
        textAlign="center"
      >
        <Heading size="md" mb={4}>
          Actions
        </Heading>

        <Flex justify="center" gap={4}>
          <Button
            bg="tomato"
            w="150px"
            onClick={() => setShowSendMoney(!showSendMoney)}
          >
            {showSendMoney ? "Close" : "Send Money"}
          </Button>
          <Button
            colorScheme="gray"
            w="150px"
            onClick={() => alert("Request Money feature coming soon!")}
          >
            Request Money
          </Button>
        </Flex>

        {showSendMoney && (
          <Box mt={6}>
            <SendMoney />
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default Action;
