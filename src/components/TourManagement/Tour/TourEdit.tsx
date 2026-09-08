import { useEffect, useState, useMemo, useCallback } from "react";
import { 
  Box, Heading, Text, VStack, Button, Center, 
  Spinner, Alert, Icon, HStack, Separator 
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, Globe, MapPin, LayoutDashboard } from "lucide-react";

import { GenericForm } from "@/components/ui/Custom/GenericForm";
import { tourService } from "@/Api/tourmanagement/Tour";
import { countryService } from "@/Api/Country";
import { cityService } from "@/Api/City";
import { transportationService } from "@/Api/tourmanagement/Transportation";

import { type Tour } from "@/interface";
import { GenericStatus } from "@/enums/GenericStatus";
import type { FieldConfig } from "@/utilities/FormTypes";
import type { Country } from "@/interface";
import type { City } from "@/interface";
import type { Transportation } from "@/interface";

type TourFormValues = Omit<Tour, 'startCountry' | 'endCountry' | 'startCity' | 'endCity' | 'destinationCountries' | 'transportation'> & {
  startCountry: string;
  endCountry: string;
  startCity: string;
  endCity: string;
  destinationCountries: string[];
  transportation: string;
};

export const EditTour = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [countries, setCountries] = useState<{ label: string; value: string }[]>([]);
  const [transports, setTransports] = useState<{ label: string; value: string }[]>([]);
  const [startCities, setStartCities] = useState<{ label: string; value: string }[]>([]);
  const [endCities, setEndCities] = useState<{ label: string; value: string }[]>([]);
  
  const [initialValues, setInitialValues] = useState<TourFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const returnToDetail = useCallback(() => navigate(`/admin/tours/${id}`), [id, navigate]);

  // --- BULLETPROOF MAPPING UTILITY ---
  const mapToOptions = useCallback((payload: any, labelKey: string = 'name') => {
    const items = Array.isArray(payload) ? payload : (payload?.data || []);
    return items.map((item: any) => ({ 
      label: item[labelKey] || item.officialName || item.commonName || `Unknown (ID: ${item.id})`, 
      value: String(item.id) 
    }));
  }, []);

  useEffect(() => {
    const bootstrapEditor = async () => {
      try {
        const [tour, countriesResponse, transportsResponse] = await Promise.all([
          tourService.getById(Number(id)),
          countryService.getAllCountries(),
          transportationService.filter({})
        ]);

        if (tour.status !== GenericStatus.PENDING) {
          setError(`Editing is restricted. Tour is currently ${tour.status}.`);
          return;
        }

        // Apply bulletproof mapping to our options
        setCountries(mapToOptions(countriesResponse));

        // FIXED: Used a custom mapper for transports to avoid the 'never' type issue
        const rawTransports = Array.isArray(transportsResponse) ? transportsResponse : (transportsResponse as any)?.data || [];
        setTransports(rawTransports.map((t: Transportation) => ({ 
          label: `${t.providerName} (${t.type})`, 
          value: String(t.id) 
        })));

        const fetchCities = async (countryId: number | null | undefined) => {
           if (typeof countryId !== 'number') return [];
           const res = await cityService.getCitiesByCountry(countryId);
           return mapToOptions(res);
        };

        const [sCities, eCities] = await Promise.all([
          fetchCities(tour.startCountry?.id),
          fetchCities(tour.endCountry?.id)
        ]);
        
        setStartCities(sCities);
        setEndCities(eCities);

        setInitialValues({
          ...tour,
          startCountry: String(tour.startCountry?.id ?? ""),
          endCountry: String(tour.endCountry?.id ?? ""),
          startCity: String(tour.startCity?.id ?? ""),
          endCity: String(tour.endCity?.id ?? ""),
          transportation: String(tour.transportation?.id ?? ""),
          destinationCountries: tour.destinationCountries?.map(c => String(c.id)) ?? [],
        } as TourFormValues);

      } catch (err) {
        setError("Synchronization Error: Failed to load logistics data.");
      } finally {
        setIsLoading(false);
      }
    };
    bootstrapEditor();
  }, [id, mapToOptions]);

  const fields = useMemo<FieldConfig<TourFormValues>[]>(() => [
    { name: "title", label: "Tour Title", type: "text", isRequired: true, gridSpan: 1 },
    { name: "tourNumber", label: "Tour Code", type: "text", isRequired: true, gridSpan: 1 },
    { name: "basePrice", label: "Base Price ($)", type: "number", isRequired: true, gridSpan: 1 },
    { name: "totalPrice", label: "Current Total ($)", type: "number", disabled: true, gridSpan: 1 },
    { name: "startDate", label: "Start Date", type: "date", isRequired: true, gridSpan: 1 },
    { name: "numberOfDays", label: "Duration", type: "number", isRequired: true, gridSpan: 1 },
    { name: "maxCapacity", label: "Max Capacity", type: "number", isRequired: true, gridSpan: 1 },
    { name: "transportation", label: "Assigned Transport", type: "search-select", options: transports, gridSpan: 1 },
    { name: "startCountry", label: "Start Country", type: "search-select", options: countries, isRequired: true, gridSpan: 1 },
    { name: "startCity", label: "Start City", type: "search-select", options: startCities, isRequired: true, gridSpan: 1 },
    { name: "endCountry", label: "End Country", type: "search-select", options: countries, isRequired: true, gridSpan: 1 },
    { name: "endCity", label: "End City", type: "search-select", options: endCities, isRequired: true, gridSpan: 1 },
    { name: "destinationCountries", label: "Regional Coverage", type: "multi-select", options: countries, gridSpan: 2 },
    { name: "description", label: "Description", type: "textarea", gridSpan: 2 },
  ], [countries, transports, startCities, endCities]);

  const handleUpdate = async (formData: TourFormValues) => {
    const payload: Partial<Tour> = {
      ...formData,
      startCountry: { id: Number(formData.startCountry) } as Country,
      endCountry: { id: Number(formData.endCountry) } as Country,
      startCity: { id: Number(formData.startCity) } as City,
      endCity: { id: Number(formData.endCity) } as City,
      transportation: { id: Number(formData.transportation) } as Transportation,
      destinationCountries: (formData.destinationCountries ?? []).map(cid => ({ id: Number(cid) } as Country)),
    };

    await tourService.update(Number(id), payload);
    returnToDetail();
  };

  if (isLoading) return <Center h="50vh"><Spinner size="xl" color="blue.500" /></Center>;

  return (
    <VStack align="start" gap={6} w="full" p={4}>
      <HStack w="full" justify="space-between">
        <Button variant="ghost" onClick={returnToDetail} size="sm">
          <Icon as={ChevronLeft} mr={1} />
          Return to Summary
        </Button>
        <HStack gap={4} color="fg.muted">
          {[{ icon: LayoutDashboard, text: "ADMIN" }, { icon: Globe, text: "TOUR" }, { icon: MapPin, text: "LOGISTICS" }].map((item, idx) => (
            <HStack key={idx} gap={1}>
              <Icon as={item.icon} size="xs" />
              <Text fontSize="xs" fontWeight="bold">{item.text}</Text>
              {idx < 2 && <Separator orientation="vertical" h="12px" />}
            </HStack>
          ))}
        </HStack>
      </HStack>

      <Box w="full">
        <Heading size="xl" fontWeight="black" letterSpacing="tight">Edit Expedition</Heading>
        <Text color="fg.muted">Modifying configuration for <b>{initialValues?.tourNumber}</b></Text>
        <Separator mt={4} />
      </Box>

      {error && (
        <Alert.Root status="error" variant="subtle" borderRadius="2xl" py={4}>
          <Alert.Indicator />
          <Alert.Content>
            <Alert.Title fontWeight="bold">Update Locked</Alert.Title>
            <Alert.Description>{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      {!error && initialValues && (
        <Box w="full" bg="bg.panel" p={{ base: 4, md: 8 }} borderRadius="3xl" borderWidth="1px" borderColor="border.subtle" shadow="sm">
          <GenericForm<TourFormValues>
            fields={fields}
            initialValues={initialValues}
            onSubmit={handleUpdate}
            onCancel={returnToDetail} 
            onFieldChange={async (name, value) => {
              if (name === "startCountry" || name === "endCountry") {
                const res = await cityService.getCitiesByCountry(Number(value));
                const cityOptions = mapToOptions(res);
                name === "startCountry" ? setStartCities(cityOptions) : setEndCities(cityOptions);
              }
            }}
            submitLabel="Commit Changes"
          />
        </Box>
      )}
    </VStack>
  );
};


