import { useCallback, useEffect, useMemo, useState } from "react";
import { tourEditFields } from "@/constants/tour/tourEditFields";
import { GenericStatus } from "@/enums/GenericStatus";
import type { SelectOption } from "@/interfaces/common/SelectOption";
import type { Tour } from "@/interfaces/tour/Tour";
import { useNavigate } from "@/lib/navigation";
import { cityService } from "@/services/geography/cityService";
import { countryService } from "@/services/geography/countryService";
import { tourService } from "@/services/tour-management/tourService";
import { transportationService } from "@/services/tour-management/transportationService";
import type { TourFormValues } from "@/types/tour/TourFormValues";
import { toNamedOptions, toReference } from "@/utilities/selectOptions";

const VEHICLE_FETCH_SIZE = 100;

const citiesOf = async (countryId?: number | string | null) =>
  countryId ? toNamedOptions(await cityService.getCitiesByCountry(Number(countryId))) : [];

/** Loads an editable (PENDING) tour with its option lists and saves it as a partial update. */
export function useTourEditor(id?: string) {
  const navigate = useNavigate();
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [transports, setTransports] = useState<SelectOption[]>([]);
  const [startCities, setStartCities] = useState<SelectOption[]>([]);
  const [endCities, setEndCities] = useState<SelectOption[]>([]);
  const [initialValues, setInitialValues] = useState<TourFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const returnToDetail = useCallback(() => navigate(`/admin/tours/${id}`), [id, navigate]);

  useEffect(() => {
    (async () => {
      try {
        const [tour, countryList, vehicles] = await Promise.all([
          tourService.getById(Number(id)), countryService.getAllCountries(), transportationService.search({ size: VEHICLE_FETCH_SIZE }),
        ]);
        if (tour.status !== GenericStatus.PENDING) {
          setError(`Editing is restricted. Tour is currently ${tour.status}.`);
          return;
        }
        setCountries(toNamedOptions(countryList));
        setTransports(vehicles.content.map((t) => ({ label: `${t.providerName} (${t.type})`, value: String(t.id) })));
        const [s, e] = await Promise.all([citiesOf(tour.startCountry?.id), citiesOf(tour.endCountry?.id)]);
        setStartCities(s);
        setEndCities(e);
        setInitialValues({
          ...tour,
          startCountry: String(tour.startCountry?.id ?? ""), endCountry: String(tour.endCountry?.id ?? ""),
          startCity: String(tour.startCity?.id ?? ""), endCity: String(tour.endCity?.id ?? ""),
          transportation: String(tour.transportation?.id ?? ""),
          destinationCountries: tour.destinationCountries?.map((c) => String(c.id)) ?? [],
        } as TourFormValues);
      } catch {
        setError("Synchronization Error: Failed to load logistics data.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id]);

  const fields = useMemo(() => tourEditFields({ countries, transports, startCities, endCities }),
    [countries, transports, startCities, endCities]);

  const onFieldChange = async (name: string, value: unknown) => {
    if (name === "startCountry") setStartCities(await citiesOf(value as string));
    if (name === "endCountry") setEndCities(await citiesOf(value as string));
  };

  /** Only references that are set are sent; an empty vehicle select leaves the vehicle unchanged. */
  const save = async (form: TourFormValues) => {
    await tourService.update(Number(id), {
      ...form,
      startCountry: toReference(form.startCountry), endCountry: toReference(form.endCountry),
      startCity: toReference(form.startCity), endCity: toReference(form.endCity),
      transportation: toReference(form.transportation),
      destinationCountries: (form.destinationCountries ?? []).map(toReference).filter(Boolean),
    } as unknown as Partial<Tour>);
    returnToDetail();
  };

  return { fields, initialValues, isLoading, error, onFieldChange, save, returnToDetail };
}
