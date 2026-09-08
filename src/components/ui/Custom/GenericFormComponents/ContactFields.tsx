import React, { useState, useEffect, useMemo } from "react";
import { 
  Input, 
  Group, 
  Icon, 
  Box, 
  HStack, 
  Text, 
  Image, 
  createListCollection, 
  Select, 
  Spinner,
  Portal
} from "@chakra-ui/react";
import { Mail, Smartphone, Search } from "lucide-react";
import type { Country } from "@/interface";
import { countryService } from "@/Api/Country";

interface CustomFieldProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const modernInputStyles = {
  h: "10",
  borderRadius: "xl",
  bg: "bg.panel",
  borderWidth: "1px",
  borderColor: "border.subtle",
  transition: "all 0.2s ease-in-out",
  _hover: { 
    borderColor: "blue.400",
    bg: "blue.50",
    _dark: { bg: "blue.900/20" }
  },
};

export const EmailField = ({ value, onChange, placeholder, disabled }: CustomFieldProps) => {
  return (
    <Group attached width="full" {...modernInputStyles}>
      <Box pl={3} pr={2} display="flex" alignItems="center" color="fg.muted">
        <Icon size="sm"><Mail size={16} /></Icon>
      </Box>
      <Input
        type="email"
        bg="transparent" 
        border="none"
        outline="none"
        boxShadow="none"
        px={0}
        _focus={{ boxShadow: "none", outline: "none", border: "none" }}
        flex="1"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "example@domain.com"}
        disabled={disabled}
      />
    </Group>
  );
};

export const MobileField = ({ value, onChange, placeholder, disabled }: CustomFieldProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [localNumber, setLocalNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchDBCountries = async () => {
      try {
        const data = await countryService.getAllCountries();
        const countryList: Country[] = Array.isArray(data) ? data : (data as any).data || [];
        const validCountries = countryList.filter(c => c.dialCode);
        setCountries(validCountries);

        let initialCountry = validCountries.find(c => value?.startsWith(c.dialCode!));
        if (!initialCountry) {
          initialCountry = validCountries.find(c => c.countryCode === "BH") || validCountries[0];
        }

        if (initialCountry) {
          setSelectedCountry(initialCountry);
          if (value && value.startsWith(initialCountry.dialCode!)) {
            setLocalNumber(value.replace(initialCountry.dialCode!, ""));
          }
        }
      } catch (err) {
        console.error("Failed to load dial codes", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDBCountries();
  }, []);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    return countries.filter(c => 
      c.famousName?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      c.dialCode?.includes(searchQuery)
    );
  }, [countries, searchQuery]);

  const collection = useMemo(() => {
    return createListCollection({
      items: filteredCountries,
      itemToString: (item) => `${item.dialCode} ${item.famousName}`,
      itemToValue: (item) => String(item.id),
    });
  }, [filteredCountries]);

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = e.target.value.replace(/[^0-9]/g, ''); 
    setLocalNumber(num);
    if (selectedCountry?.dialCode) {
      onChange(`${selectedCountry.dialCode}${num}`);
    } else {
      onChange(num);
    }
  };

  const handleCountryChange = (details: { value: string[] }) => {
    const countryId = details.value[0];
    const newCountry = countries.find(c => String(c.id) === countryId);
    if (newCountry) {
      setSelectedCountry(newCountry);
      onChange(`${newCountry.dialCode}${localNumber}`);
      setSearchQuery(""); // Reset search after selection
    }
  };

  return (
    <Group attached width="full" {...modernInputStyles}>
      <Box pl={3} pr={1} display="flex" alignItems="center" color="fg.muted">
        <Icon size="sm"><Smartphone size={16} /></Icon>
      </Box>

      <Box width="100px" borderRightWidth="1px" borderColor="border.subtle" mr={2} display="flex" alignItems="center" justifyContent="center">
        {isLoading || countries.length === 0 ? (
          <Spinner size="sm" color="blue.500" />
        ) : (
          <Select.Root
            collection={collection}
            value={selectedCountry ? [String(selectedCountry.id)] : []}
            onValueChange={handleCountryChange}
            size="sm"
            disabled={disabled}
            positioning={{ 
              placement: "bottom-start", 
              strategy: "fixed",
              flip: false,
              gutter: 8
            }}
          >
            <Select.HiddenSelect />
            
            <Select.Trigger bg="transparent" border="none" px={1} h="full" cursor="pointer" _focus={{ outline: "none" }}>
              <HStack gap={1} justify="center">
                {selectedCountry?.flagPngUrl && (
                  <Image src={selectedCountry.flagPngUrl} w="16px" h="12px" borderRadius="1px" alt="flag" />
                )}
                <Text fontSize="sm" fontWeight="bold" color="fg.muted">
                  {selectedCountry?.dialCode || "..."}
                </Text>
              </HStack>
            </Select.Trigger>
            
            <Portal>
              <Select.Positioner zIndex={9999}>
                <Select.Content borderRadius="xl" boxShadow="2xl" bg="bg.panel" p={2} minW="220px" maxH="350px">
                  {/* Search Input inside the dropdown */}
                  <Group attached mb={2}>
                     <Box pl={2} display="flex" alignItems="center" color="fg.muted">
                        <Search size={14} />
                     </Box>
                     <Input 
                        placeholder="Search country..." 
                        size="xs" 
                        variant="flushed"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        _focus={{ boxShadow: "none" }}
                     />
                  </Group>

                  <Box overflowY="auto" maxH="280px">
                    {collection.items.length > 0 ? (
                      collection.items.map((opt) => (
                        <Select.Item item={opt} key={opt.id} cursor="pointer" borderRadius="lg" p={2} _hover={{ bg: "blue.50", _dark: { bg: "white/10" } }}>
                          <HStack gap={2}>
                            <Image src={opt.flagPngUrl} w="20px" borderRadius="2px" alt="flag" />
                            <Text fontWeight="bold" fontSize="sm">{opt.dialCode}</Text>
                            <Text color="fg.muted" fontSize="xs" truncate>{opt.famousName}</Text>
                          </HStack>
                        </Select.Item>
                      ))
                    ) : (
                      <Text textAlign="center" py={4} fontSize="xs" color="fg.muted">No results found</Text>
                    )}
                  </Box>
                </Select.Content>
              </Select.Positioner>
            </Portal>
          </Select.Root>
        )}
      </Box>

      <Input
        type="tel"
        bg="transparent"
        border="none"
        outline="none"
        boxShadow="none"
        px={0}
        _focus={{ boxShadow: "none", outline: "none", border: "none" }}
        flex="1"
        value={localNumber}
        onChange={handleNumberChange}
        placeholder={placeholder || "3333 4444"}
        disabled={disabled || isLoading}
        maxLength={selectedCountry?.mobileNumberLength || 15}
      />
    </Group>
  );
};
