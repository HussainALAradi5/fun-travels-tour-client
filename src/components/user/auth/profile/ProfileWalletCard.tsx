import { Box, Button, Heading, HStack, Icon, Spinner, Text, VStack } from "@chakra-ui/react";
import { ArrowUpRight, Plus, Wallet } from "lucide-react";
import type { ProfileWalletCardProps } from "@/interfaces/props/user/ProfileWalletCardProps";

export const ProfileWalletCard = ({ balance, loading, onTopUp, onHistory }: ProfileWalletCardProps) => (
  <Box p={6} borderRadius="2xl" bg="blue.600" color="white" shadow="md">
    <HStack justify="space-between" align="flex-start" mb={4}>
      <VStack align="start" gap={0}>
        <HStack gap={2} opacity={0.8}><Wallet size={16} /><Text fontSize="xs">CURRENT BALANCE</Text></HStack>
        <Heading size="3xl">{loading || balance === null ? <Spinner size="sm" /> : `$${balance.toFixed(2)}`}</Heading>
      </VStack>
      <Button size="sm" colorPalette="green" onClick={onTopUp} shadow="sm"><Plus size={16} /> Top Up</Button>
    </HStack>
    <Button size="sm" variant="ghost" bg="white/20" _hover={{ bg: "white/30" }} w="full" onClick={onHistory}>
      View Ledger History <Icon as={ArrowUpRight} ml={2} />
    </Button>
  </Box>
);
