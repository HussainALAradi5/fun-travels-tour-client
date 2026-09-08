import { useMemo } from "react";
import { Box, Image, Badge, HStack, Text, IconButton } from "@chakra-ui/react";
import { MapPin, Trash2 } from "lucide-react";
import { GenericTable } from "@/components/ui/Custom/GenericTable";
import type { Country } from "@/interface";
import CityManagerRow from "../City/CityManagerRow";

interface Props {
  data: Country[];
  loading: boolean;
  onDelete: (country: Country) => void;
}

export function CountryTable({ data, loading, onDelete }: Props) {
  const columns = useMemo(
    () => [
      {
        header: "Flag",
        key: "flagPngUrl",
        render: (c: Country) => (
          <Image src={c.flagPngUrl} w="40px" borderRadius="sm" alt="flag" />
        ),
      },
      { header: "Name", key: "famousName" },
      {
        header: "Code",
        key: "countryCode",
        render: (c: Country) => (
          <Badge colorPalette="blue" variant="surface">
            {c.countryCode}
          </Badge>
        ),
      },
      {
        header: "Cities",
        key: "cities",
        render: () => (
          <HStack gap={1} color="blue.500">
            <MapPin size={14} />
            <Text fontSize="xs" fontWeight="bold">
              Manage
            </Text>
          </HStack>
        ),
      },{
        header: "Dial Code",
        key: "dialCode",
        render: (c: Country) => (
          <Text fontWeight="bold" color="fg.muted">
            {c.dialCode || "-"}
          </Text>
        )
      },
      {
        header: "Mob. Length",
        key: "mobileNumberLength",
        render: (c: Country) => (
          <Badge colorPalette={c.mobileNumberLength ? "green" : "gray"} variant="subtle">
            {c.mobileNumberLength ? `${c.mobileNumberLength} digits` : "Not Set"}
          </Badge>
        )
      },
      {
        header: "Action",
        key: "id",
        render: (c: Country) => (
          <HStack justifyContent="flex-end" w="full">
            <IconButton
              variant="ghost"
              colorPalette="red"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onDelete(c);
              }}
            >
              <Trash2 size={16} />
            </IconButton>
          </HStack>
        ),
      },
    ],
    [onDelete]
  );

  return (
    <Box
      bg="bg.panel"
      borderRadius="xl"
      border="1px solid"
      borderColor="border"
      p={4}
      shadow="sm"
    >
      <GenericTable<Country>
        data={data}
        columns={columns}
        loading={loading}
        searchKey="famousName"
        renderExpansion={(country) => (
          <CityManagerRow
            countryId={country.id as number}
            countryName={country.famousName}
          />
        )}
      />
    </Box>
  );
}

