"use client";

import { useEffect, useMemo, useState } from "react";
import { Box, Button, Combobox, createListCollection, HStack, Icon, IconButton, Spinner, Text } from "@chakra-ui/react";
import { X } from "lucide-react";
import { GenericFilter } from "@/utilities/GenericFilter";
import { SelectedTags } from "./SelectedTags";
import type { SelectOption } from "@/interface/common/SelectOption";
import type { PaginatedSearchSelectProps } from "@/interface/props/ui/PaginatedSearchSelectProps";

const optionKey = (value: SelectOption["value"] | null | undefined) =>
  value === null || value === undefined ? "" : String(value);

export function PaginatedSearchSelect({ label, value, onChange, options = [], loadOptions,
  placeholder, disabled, multiple = false, debounceMs = 300 }: PaginatedSearchSelectProps) {
  const [query, setQuery] = useState("");
  const [remoteOptions, setRemoteOptions] = useState<SelectOption[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loadOptions || disabled) return;
    let active = true;
    const timer = window.setTimeout(async () => {
      setLoading(true);
      try {
        const result = await loadOptions(query, 0);
        if (active) {
          setRemoteOptions(result.content);
          setPage(result.page);
          setTotalPages(result.totalPages);
        }
      } catch {
        if (active) { setRemoteOptions([]); setPage(0); setTotalPages(0); }
      } finally {
        if (active) setLoading(false);
      }
    }, debounceMs);
    return () => { active = false; window.clearTimeout(timer); };
  }, [debounceMs, disabled, loadOptions, query]);

  const available = loadOptions ? remoteOptions : options;
  const displayed = useMemo(() => loadOptions ? available : GenericFilter.process(available, {
    searchTerm: query, searchKey: "label", currentPage: 1, pageSize: 100,
  }).paginatedData, [available, loadOptions, query]);
  const selectedKeys = useMemo(() => value === null || value === undefined || value === "" ? []
    : (Array.isArray(value) ? value : [value]).map(optionKey), [value]);
  const selectedOption = available.find((option) => optionKey(option.value) === selectedKeys[0]);
  const collection = useMemo(() => createListCollection({ items: displayed.map((option) => ({
    label: option.label, value: optionKey(option.value), original: option.value, icon: option.icon,
  })) }), [displayed]);

  const loadMore = async () => {
    if (!loadOptions || loading || page + 1 >= totalPages) return;
    setLoading(true);
    try {
      const result = await loadOptions(query, page + 1);
      setRemoteOptions((current) => {
        const known = new Set(current.map((option) => optionKey(option.value)));
        return [...current, ...result.content.filter((option) => !known.has(optionKey(option.value)))];
      });
      setPage(result.page);
      setTotalPages(result.totalPages);
    } finally { setLoading(false); }
  };

  return (
    <Box w="full">
      {multiple && <SelectedTags values={selectedKeys} options={available.map((option) => ({ ...option, value: optionKey(option.value) }))}
        onRemove={(key) => Array.isArray(value) && onChange(value.filter((item) => optionKey(item) !== key))} />}
      <Combobox.Root collection={collection} value={selectedKeys} multiple={multiple} disabled={disabled} size="sm"
        positioning={{ sameWidth: true, gutter: 4, strategy: "fixed" }}
        onValueChange={(details) => {
          const selected = details.value.map((key) => collection.items.find((item) => item.value === key)?.original ?? key);
          onChange(multiple ? selected.map(String) : (selected[0] ?? null));
        }} onInputValueChange={(details) => setQuery(details.inputValue)}>
        <Combobox.Control position="relative">
          {selectedOption?.icon && <Icon as={selectedOption.icon} boxSize="4" position="absolute" left="3" top="50%" transform="translateY(-50%)" zIndex="1" />}
          <Combobox.Input placeholder={placeholder ?? `Search ${label}...`} autoComplete="off" pl={selectedOption?.icon ? 9 : undefined} pr="16" />
          <Combobox.Trigger />
          {!multiple && selectedKeys.length > 0 && !disabled && <IconButton type="button" aria-label={`Clear ${label}`} variant="ghost" size="xs"
            position="absolute" right="8" onMouseDown={(event) => event.preventDefault()} onClick={() => { onChange(null); setQuery(""); }}><X size={14} /></IconButton>}
          {loading && <Spinner size="xs" position="absolute" right={selectedKeys.length ? "14" : "9"} />}
        </Combobox.Control>
        <Combobox.Positioner zIndex="popover"><Combobox.Content bg="bg.panel" boxShadow="xl" borderRadius="md" borderWidth="1px" borderColor="border.subtle">
          {!loading && collection.items.length === 0 && <Box px={4} py={3}><Text fontSize="xs" color="fg.muted">No results found</Text></Box>}
          {collection.items.map((item) => <Combobox.Item key={item.value} item={item} px={3} py={2} cursor="pointer" _hover={{ bg: "blue.50", color: "blue.700" }}>
            <HStack gap={2} flex="1">{item.icon && <Icon as={item.icon} boxSize="4" />}<Combobox.ItemText fontSize="xs">{item.label}</Combobox.ItemText></HStack><Combobox.ItemIndicator />
          </Combobox.Item>)}
          {loadOptions && page + 1 < totalPages && <Box p={2} borderTopWidth="1px"><Button type="button" size="xs" variant="ghost" w="full" loading={loading} onClick={loadMore}>Load more</Button></Box>}
        </Combobox.Content></Combobox.Positioner>
      </Combobox.Root>
    </Box>
  );
}
