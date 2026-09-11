import {
  Box,
  Container,
  VStack,
  Center,
  Text,
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
  DialogActionTrigger,
  DialogBackdrop,
  DialogPositioner,
  Button,
  Portal,
  HStack,
} from "@chakra-ui/react";
import { AlertTriangle } from "lucide-react";
import { AlertComponent } from "@/components/ui/Custom/AlertComponent";
import { useCountries } from "@/hooks/countriesAndCities/useCountries";
import { CountrySyncHeader } from "@/components/CitiesAndCountries/Country/CountrySyncHeader";
import { CountryTable } from "@/components/CitiesAndCountries/Country/CountryTable";

export default function ManageCountries() {
  const {
    countries,
    loading,
    fetching,
    isAdmin,
    countryToDelete,
    setCountryToDelete,
    confirmDelete,
    handleBulkSync,
    handleSingleSync,
  } = useCountries();

  if (!isAdmin) {
    return (
      <Center h="70vh">
        <VStack>
          <Text fontWeight="bold" fontSize="lg">
            Access Denied
          </Text>
          <Text color="fg.muted">Admin privileges required.</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box bg="gray.50" _dark={{ bg: "gray.950" }} minH="100vh" py={10}>
      <Container maxW="container.xl">
        <VStack gap={6} align="stretch">
          <CountrySyncHeader
            onBulkSync={handleBulkSync}
            onSingleSync={handleSingleSync}
            isFetching={fetching}
          />

          <CountryTable
            data={countries}
            loading={loading}
            onDelete={setCountryToDelete}
          />
        </VStack>
      </Container>

      <DialogRoot
        open={!!countryToDelete}
        onOpenChange={(e) => !e.open && setCountryToDelete(null)}
        placement="center"
        motionPreset="slide-in-bottom"
      >
        <Portal>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent
              width="95vw"
              maxWidth="450px"
              borderRadius="xl"
              boxShadow="2xl"
            >
              <DialogHeader
                borderBottom="1px solid"
                borderColor="border.muted"
                pb={4}
              >
                <HStack color="red.600">
                  <AlertTriangle size={22} />
                  <DialogTitle fontSize="xl">Confirm Deletion</DialogTitle>
                </HStack>
              </DialogHeader>

              <DialogBody py={6}>
<AlertComponent
                  status="error"
                  description={`Are you sure you want to remove ${countryToDelete?.famousName}? This action is permanent and cannot be undone.`}
                />
              </DialogBody>

              <DialogFooter
                bg="gray.50"
                _dark={{ bg: "whiteAlpha.50" }}
                borderTop="1px solid"
                borderColor="border.muted"
                p={4}
              >
                <DialogActionTrigger asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogActionTrigger>
                <Button colorPalette="red" px={8} onClick={confirmDelete}>
                  Delete Country
                </Button>
              </DialogFooter>
            </DialogContent>
          </DialogPositioner>
        </Portal>
      </DialogRoot>
    </Box>
  );
}
