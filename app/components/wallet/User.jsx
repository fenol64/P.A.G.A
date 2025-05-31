import { ReactNode } from "react";
import { Box, Stack, Text, useColorModeValue } from "@interchain-ui/react";
import { Astronaut } from "./Astronaut";


export function User({ name, icon = <Astronaut /> }) {
  return (
    <Stack direction="vertical">
      <Box width="$19" height="$19" mx="auto" borderRadius="$full">
        {icon}
      </Box>
      <Box textAlign="center" py="$4" mb="$6">
        <Text
          color={useColorModeValue("$gray700", "$white")}
          fontSize="$xl"
          fontWeight="$medium"
        >
          {name}
        </Text>
      </Box>
    </Stack>
  );
}
