import { Box, Spinner, Text } from "@chakra-ui/react";

export const TableLoading = ({ colorPalette }: { colorPalette: string }) => (
  <Box textAlign="center" py={20}>
    <Spinner size="xl" colorPalette={colorPalette} />
    <Text mt={4} fontWeight="medium" color="fg.muted">
      Loading data...
    </Text>
  </Box>
);
