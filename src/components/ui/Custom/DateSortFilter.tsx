"use client";

import { Button, Field, HStack, Input, NativeSelect, Stack } from "@chakra-ui/react";
import type {
  DateSortFilterProps,
  DateSortFilterValue,
} from "@/interface/props/ui/DateSortFilterProps";

export function DateSortFilter<TSort extends string>({
  value,
  sortOptions,
  onChange,
  dateLabel = "Date",
}: DateSortFilterProps<TSort>) {
  const update = <K extends keyof DateSortFilterValue<TSort>>(
    key: K,
    next: DateSortFilterValue<TSort>[K],
  ) => onChange({ ...value, [key]: next });

  return (
    <Stack
      direction={{ base: "column", lg: "row" }}
      gap={3}
      p={4}
      mb={4}
      borderWidth="1px"
      borderColor="border.subtle"
      borderRadius="xl"
      bg="bg.panel"
      align={{ lg: "end" }}
    >
      <Field.Root>
        <Field.Label>From {dateLabel}</Field.Label>
        <Input
          type="date"
          value={value.startDate ?? ""}
          max={value.endDate}
          onChange={(event) => update("startDate", event.target.value || undefined)}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>To {dateLabel}</Field.Label>
        <Input
          type="date"
          value={value.endDate ?? ""}
          min={value.startDate}
          onChange={(event) => update("endDate", event.target.value || undefined)}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>Sort by</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field
            value={value.sortBy}
            onChange={(event) => update("sortBy", event.target.value as TSort)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
      <Field.Root>
        <Field.Label>Direction</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field
            value={value.sortDir}
            onChange={(event) => update("sortDir", event.target.value as "asc" | "desc")}
          >
            <option value="desc">Newest / highest first</option>
            <option value="asc">Oldest / lowest first</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
      <HStack>
        <Button
          variant="outline"
          onClick={() => onChange({ ...value, startDate: undefined, endDate: undefined })}
          disabled={!value.startDate && !value.endDate}
        >
          Clear dates
        </Button>
      </HStack>
    </Stack>
  );
}
