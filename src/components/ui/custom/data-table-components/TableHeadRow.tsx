import { Checkbox, Table } from "@chakra-ui/react";
import type { TableHeadRowProps } from "@/interfaces/props/ui/TableHeadRowProps";

const HEADER_BG = { base: "gray.50/80", _dark: "gray.900/80" } as const;

export const TableHeadRow = ({ headers, showSelect, colorPalette, checked, onToggleAll }: TableHeadRowProps) => (
  <Table.Header bg={HEADER_BG} backdropFilter="blur(10px)">
    <Table.Row borderBottomWidth="2px">
      {showSelect && (
        <Table.ColumnHeader width="50px" textAlign="center">
          <Checkbox.Root size="sm" colorPalette={colorPalette} checked={checked} onCheckedChange={onToggleAll} aria-label="Select all rows on this page">
            <Checkbox.HiddenInput />
            <Checkbox.Control borderRadius="md" />
          </Checkbox.Root>
        </Table.ColumnHeader>
      )}
      {headers.map((header, i) => (
        <Table.ColumnHeader key={`${header}-${i}`} py={5} fontWeight="bold" fontSize="xs" color="fg.muted" textTransform="uppercase" letterSpacing="widest">
          {header}
        </Table.ColumnHeader>
      ))}
    </Table.Row>
  </Table.Header>
);
