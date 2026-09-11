import { useState, useMemo } from "react";
import {
  format, addMonths, subMonths, startOfMonth,
  startOfWeek, isSameMonth, isSameDay, addDays,
  isAfter, isBefore, parseISO, setYear, setMonth, getYear,
  addYears, subYears, startOfDay
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, X as ClearIcon, ChevronDown } from "lucide-react";
import {
  Button, PopoverRoot, PopoverTrigger, PopoverContent, PopoverBody, PopoverPositioner,
  Portal, Text, HStack, Box, IconButton, SimpleGrid, VStack, Center
} from "@chakra-ui/react";
import type { DatePickerProps } from "@/interface/props/ui/DatePickerProps";
import type { ViewMode } from "@/types/ui/ViewMode";

export const DatePicker = ({
  label,
  value,
  onChange,
  valueEnd,
  onChangeEnd,
  minDate = new Date()
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("days");
  const [viewDate, setViewDate] = useState(new Date());

  const from = useMemo(() => value ? parseISO(value) : undefined, [value]);
  const to = useMemo(() => valueEnd ? parseISO(valueEnd) : undefined, [valueEnd]);
  const isDateDisabled = (day: Date) => {
    return isBefore(startOfDay(day), startOfDay(minDate));
  };

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate));
    return Array.from({ length: 42 }, (_, i) => addDays(start, i));
  }, [viewDate]);

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const years = useMemo(() => {
    const currentYear = getYear(viewDate);
    const startYear = currentYear - (currentYear % 12);
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  }, [viewDate]);

  const handleDayClick = (day: Date) => {
    if (isDateDisabled(day)) return;

    const dateStr = format(day, "yyyy-MM-dd");
    if (onChangeEnd) {
      if (!from || (from && to)) {
        onChange(dateStr);
        onChangeEnd("");
      } else if (isBefore(day, from)) {
        onChange(dateStr);
      } else {
        onChangeEnd(dateStr);
        setOpen(false);
      }
    } else {
      onChange(dateStr);
      setOpen(false);
    }
  };

  const handleHeaderNav = (direction: "prev" | "next") => {
    if (viewMode === "days") {
      setViewDate(direction === "prev" ? subMonths(viewDate, 1) : addMonths(viewDate, 1));
    } else if (viewMode === "months") {
      setViewDate(direction === "prev" ? subYears(viewDate, 1) : addYears(viewDate, 1));
    } else {
      setViewDate(direction === "prev" ? subYears(viewDate, 12) : addYears(viewDate, 12));
    }
  };

  return (
    <PopoverRoot
      open={open}
      onOpenChange={(e) => {
        setOpen(e.open);
        if (!e.open) setViewMode("days");
      }}
      portalled={true}
      positioning={{ strategy: "fixed", placement: "bottom-start", gutter: 12 }}
    >
      <PopoverTrigger asChild>
        <Button variant="outline" width="full" height="14" justifyContent="flex-start" bg="bg.panel" borderRadius="xl" px={4} borderWidth="1px" _hover={{ borderColor: "blue.500" }}>
          <HStack gap={3} width="full">
            <Center p={2} bg="blue.50" color="blue.600" borderRadius="lg" _dark={{ bg: "blue.900/30", color: "blue.300" }}>
              <CalendarIcon size={20} />
            </Center>
            <VStack align="start" gap={0} flex="1">
              <Text fontSize="10px" fontWeight="bold" color="fg.muted" textTransform="uppercase">{label}</Text>
              <Text fontSize="sm" fontWeight="bold">
                {from ? (to ? `${format(from, "MMM d")} - ${format(to, "MMM d")}` : format(from, "PPP")) : `Select Date`}
              </Text>
            </VStack>
            {value && (
              <IconButton
                aria-label="Clear"
                size="xl"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                  if(onChangeEnd) onChangeEnd("");
                }}
              >
                <ClearIcon size={14} />
              </IconButton>
            )}
          </HStack>
        </Button>
      </PopoverTrigger>

      <Portal>
        <PopoverPositioner zIndex="3000">
          <PopoverContent bg="white" _dark={{ bg: "gray.900" }} boxShadow="2xl" width="340px" borderRadius="2xl" border="1px solid" borderColor="border.muted">
            <PopoverBody p={6}>
              <VStack gap={4}>
<HStack width="full" justifyContent="space-between">
                  <HStack gap={1}>
                    <Button
                      variant="ghost" size="sm" px={2} borderRadius="md"
                      onClick={() => setViewMode(viewMode === "months" ? "days" : "months")}
                      bg={viewMode === "months" ? "blue.50" : "transparent"}
                      _dark={{ bg: viewMode === "months" ? "blue.900/30" : "transparent" }}
                    >
                      <Text fontWeight="bold" fontSize="md">{format(viewDate, "MMMM")}</Text>
                      <Box as="span" ml={1} opacity={0.5}><ChevronDown size={14} /></Box>
                    </Button>
                    <Button
                      variant="ghost" size="sm" px={2} borderRadius="md"
                      onClick={() => setViewMode(viewMode === "years" ? "days" : "years")}
                      bg={viewMode === "years" ? "blue.50" : "transparent"}
                      _dark={{ bg: viewMode === "years" ? "blue.900/30" : "transparent" }}
                    >
                      <Text fontWeight="medium" color="fg.muted">{format(viewDate, "yyyy")}</Text>
                    </Button>
                  </HStack>

                  <HStack gap={1}>
                    <IconButton variant="ghost" size="xs" onClick={() => handleHeaderNav("prev")}><ChevronLeft size={18} /></IconButton>
                    <IconButton variant="ghost" size="xs" onClick={() => handleHeaderNav("next")}><ChevronRight size={18} /></IconButton>
                  </HStack>
                </HStack>

                <Box width="full" minHeight="240px">
{viewMode === "months" && (
                    <SimpleGrid columns={3} gap={3} pt={2}>
                      {months.map((m, i) => (
                        <Button
                          key={m}
                          height="60px"
                          variant={viewDate.getMonth() === i ? "solid" : "ghost"}
                          colorPalette="blue"
                          onClick={() => { setViewDate(setMonth(viewDate, i)); setViewMode("days"); }}
                        >
                          {m}
                        </Button>
                      ))}
                    </SimpleGrid>
                  )}
{viewMode === "years" && (
                    <SimpleGrid columns={3} gap={3} pt={2}>
                      {years.map((y) => (
                        <Button
                          key={y}
                          height="60px"
                          variant={viewDate.getFullYear() === y ? "solid" : "ghost"}
                          colorPalette="blue"
                          onClick={() => { setViewDate(setYear(viewDate, y)); setViewMode("days"); }}
                        >
                          {y}
                        </Button>
                      ))}
                    </SimpleGrid>
                  )}
{viewMode === "days" && (
                    <VStack gap={4}>
                      <SimpleGrid columns={7} width="full" textAlign="center">
                        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                          <Text key={d} fontSize="xs" fontWeight="bold" color="blue.500" opacity={0.8}>{d}</Text>
                        ))}
                      </SimpleGrid>
                      <SimpleGrid columns={7} width="full" gap={1}>
                        {days.map((day, i) => {
                          const disabled = isDateDisabled(day);
                          const isSel = (from && isSameDay(day, from)) || (to && isSameDay(day, to));
                          const isRange = from && to && isAfter(day, from) && isBefore(day, to);
                          const isCurMonth = isSameMonth(day, viewDate);

                          return (
                            <Center
                              key={i}
                              onClick={() => handleDayClick(day)}
                              cursor={disabled ? "not-allowed" : "pointer"}
                              height="38px" fontSize="sm"
                              opacity={disabled ? 0.3 : 1}
                              fontWeight={isSel ? "bold" : "medium"}
                              borderRadius="lg"
                              bg={isSel ? "blue.600" : isRange ? "blue.50" : "transparent"}
                              _dark={{ bg: isSel ? "blue.500" : isRange ? "blue.900/30" : "transparent" }}
                              color={isSel ? "white" : isCurMonth ? "fg" : "fg.subtle"}
                              _hover={!disabled ? { bg: isSel ? "blue.700" : "gray.100", _dark: { bg: isSel ? "blue.400" : "white/5" } } : {}}
                            >
                              {format(day, "d")}
                            </Center>
                          );
                        })}
                      </SimpleGrid>
                    </VStack>
                  )}
                </Box>
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </PopoverPositioner>
      </Portal>
    </PopoverRoot>
  );
};
