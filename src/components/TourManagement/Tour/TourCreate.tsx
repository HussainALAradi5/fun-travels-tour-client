import { useEffect, useState, useMemo } from "react";
import { Box, Heading, Text, VStack, Button, Center, Spinner } from "@chakra-ui/react";
import { useNavigate } from "@/lib/navigation";
import { DynamicForm } from "@/components/ui/Custom/DynamicForm";

import { DEFAULT_TOUR } from "@/interface/tour/Tour";
import type { Tour } from "@/interface/tour/Tour";
import type { FieldConfig } from "@/interface/common/FieldConfig";
import type { Country } from "@/interface/geography/Country";
import type { City } from "@/interface/geography/City";
import type { Transportation } from "@/interface/tour/Transportation";
import type { MealPlan } from "@/interface/tour/MealPlan";
import { useTourManagement } from "@/hooks/tourManagement/useTourManagement";
import { useCountries } from "@/hooks/countriesAndCities/useCountries";
import { useCities } from "@/hooks/countriesAndCities/useCities";

import type { TourCreateFormValues } from "@/types/tour/TourCreateFormValues";

export const TourCreate = () => {
  const navigate = useNavigate();

  const {
    transportation, fetchTransportation,
    meals, fetchMeals,
    handleCreateTour, isMutating, calculateEndDate
  } = useTourManagement();

  const { countries, fetchCountries, loading: isCountriesLoading } = useCountries();

  const [selectedStartCountryId, setSelectedStartCountryId] = useState<string | null>(null);
  const [selectedEndCountryId, setSelectedEndCountryId] = useState<string | null>(null);

  const { cities: rawStartCities, loading: isStartCitiesLoading } = useCities(selectedStartCountryId);
  const { cities: rawEndCities, loading: isEndCitiesLoading } = useCities(selectedEndCountryId);

  useEffect(() => {
    fetchCountries();
    fetchTransportation();
    fetchMeals();
  }, [fetchCountries, fetchTransportation, fetchMeals]);
  const countryOptions = useMemo(() =>
    countries.map(c => ({ label:c.officialName, value: String(c.id) })),
  [countries]);

  const startCityOptions = useMemo(() =>
    rawStartCities.map(c => ({ label: c.name, value: String(c.id) })),
  [rawStartCities]);

  const endCityOptions = useMemo(() =>
    rawEndCities.map(c => ({ label: c.name, value: String(c.id) })),
  [rawEndCities]);

  const transportOptions = useMemo(() =>
    transportation.map(t => ({ label: `${t.providerName} - ${t.code}`, value: String(t.id) })),
  [transportation]);

  const mealOptions = useMemo(() =>
    meals.map(m => ({ label: `${m.mealName} ($${m.mealPrice})`, value: String(m.id) })),
  [meals]);

  const fields = useMemo<FieldConfig<TourCreateFormValues>[]>(
    () => [
      { name: "title", label: "Tour Title", type: "text", isRequired: true, gridSpan: 1 },
      { name: "tourNumber", label: "Tour Code", type: "text", isRequired: true, gridSpan: 1},
      { name: "basePrice", label: "Base Price ($)", type: "number", isRequired: true, gridSpan: 1 },
      { name: "discountPrice", label: "Discount Amount ($)", type: "number", isRequired: false, gridSpan: 1 },
      { name: "maxCapacity", label: "Max Capacity", type: "number", isRequired: true, gridSpan: 1 },
      { name: "numberOfDays", label: "Duration (Days)", type: "number", isRequired: true, gridSpan: 1 },
      { name: "startDate", label: "Start Date", type: "date", isRequired: true, gridSpan: 1 },
      { name: "startCountry", label: "Start Country", type: "search-select", options: countryOptions, isRequired: true, gridSpan: 1 },
      { name: "startCity", label: "Start City", type: "search-select", options: startCityOptions, disabled: !selectedStartCountryId, isRequired: true, gridSpan: 1 },
      { name: "endCountry", label: "End Country", type: "search-select", options: countryOptions, isRequired: true, gridSpan: 1 },
      { name: "endCity", label: "End City", type: "search-select", options: endCityOptions, disabled: !selectedEndCountryId, isRequired: true , gridSpan: 1},
      { name: "transportation", label: "Assigned Transport", type: "search-select", options: transportOptions, isRequired: false, gridSpan: 1 },
      { name: "destinationCountries", label: "Regional Coverage", type: "multi-select", options: countryOptions, gridSpan: 2 },
      { name: "availableMeals", label: "Available Meal Plans", type: "multi-select", options: mealOptions, gridSpan: 1 },
      { name: "description", label: "Description", type: "textarea", gridSpan: 2 },
    ],
    [countryOptions, startCityOptions, endCityOptions, transportOptions, mealOptions, selectedStartCountryId, selectedEndCountryId]
  );

  const handleSubmit = async (formData: TourCreateFormValues) => {
      const finalEndDate = calculateEndDate(formData.startDate, Number(formData.numberOfDays));

      const payload: Tour = {
        ...formData,
        endDate: finalEndDate,
        numberOfDays: Number(formData.numberOfDays),
        price: Number(formData.basePrice),
        basePrice: Number(formData.basePrice),
        discountPrice: Number(formData.discountPrice || 0),
        availableSlots: Number(formData.maxCapacity),
        hasTransportation: Boolean(formData.transportation),
        startCountry: formData.startCountry ? ({ id: Number(formData.startCountry) } as Country) : undefined,
        endCountry: formData.endCountry ? ({ id: Number(formData.endCountry) } as Country) : undefined,
        startCity: formData.startCity ? ({ id: Number(formData.startCity) } as Partial<City>) : undefined,
        endCity: formData.endCity ? ({ id: Number(formData.endCity) } as Partial<City>) : undefined,
        transportation: formData.transportation ? ({ id: Number(formData.transportation) } as Transportation) : undefined,
        destinationCountries: Array.isArray(formData.destinationCountries)
          ? formData.destinationCountries.map((id) => ({ id: Number(id) } as Country))
          : [],
        availableMeals: Array.isArray(formData.availableMeals)
          ? formData.availableMeals.map((id) => ({ id: Number(id) } as MealPlan))
          : [],
      };

      try {
        await handleCreateTour(payload);
        navigate("/admin/tours");
      } catch (e: unknown) { console.error("Create failed", e); }
  };

  if (isCountriesLoading) {
    return <Center h="50vh"><Spinner size="xl" color="blue.500" /></Center>;
  }

  return (
    <VStack align="start" gap={6} w="full" pb={10}>
      <Button variant="ghost" size="sm" onClick={() => navigate("/admin/tours")}>Back to Inventory</Button>
      <Box>
        <Heading size="xl" fontWeight="black">Create New Tour</Heading>
        <Text color="fg.muted">Define logistics, meals, and regional coverage for this expedition.</Text>
      </Box>
      <Box w="full" bg="bg.panel" p={8} borderRadius="3xl" border="1px solid" borderColor="border.subtle" shadow="sm" opacity={isMutating || isStartCitiesLoading || isEndCitiesLoading ? 0.6 : 1} pointerEvents={isMutating ? "none" : "auto"}>
        <DynamicForm<TourCreateFormValues>
          disableToast={true}
          fields={fields}
          initialValues={DEFAULT_TOUR as unknown as TourCreateFormValues}
          onSubmit={handleSubmit}
          onCancel={() => navigate("/admin/tours")}
          onFieldChange={(name: keyof TourCreateFormValues, value: string | number | string[] | boolean | null) => {
            if (name === "startCountry") setSelectedStartCountryId(value ? String(value) : null);
            if (name === "endCountry") setSelectedEndCountryId(value ? String(value) : null);
          }}
          columns={2}
          submitLabel="Create Tour"
        />
      </Box>
    </VStack>
  );
};




