import React from "react";
import { Table, Checkbox, Text, Badge, Link, Icon, HStack } from "@chakra-ui/react";
import { Mail, Smartphone } from "lucide-react";
const tableLinkStyles = {
  display: "inline-flex",
  alignItems: "center",
  h: "8",
  px: 3,
  borderRadius: "xl",
  bg: "bg.panel",
  borderWidth: "1px",
  borderColor: "border.subtle",
  color: "blue.500",
  transition: "all 0.2s ease-in-out",
  textDecoration: "none",
  outline: "none",
  _hover: {
    borderColor: "blue.400",
    bg: "blue.50",
    color: "blue.600",
    textDecoration: "none",
    _dark: { bg: "blue.900/20", color: "blue.300" }
  },
  _active: {
    borderColor: "blue.400",
    bg: "blue.50",
    color: "green.500",
    _dark: { bg: "blue.900/20", color: "green.400" }
  }
};
const renderCellValue = (item: Record<string, unknown>, col: { key?: string; type?: string; render?: (row: Record<string, unknown>) => React.ReactNode }) => {
  if (col.render) return col.render(item);

  const value = col.key ? item[col.key] : undefined;

  if (value === null || value === undefined || value === "") {
    return <Text color="fg.muted">-</Text>;
  }

  switch (col.type) {
    case "email":
      return (
        <Link
          href={`mailto:${String(value)}`}
          onClick={(e) => e.stopPropagation()}
          {...tableLinkStyles}
        >
<HStack gap={2}>
            <Icon size="sm" color="inherit" opacity={0.8}><Mail size={14} /></Icon>
            <Text fontSize="sm" fontWeight="medium" color="inherit">{String(value)}</Text>
          </HStack>
        </Link>
      );
    case "mobile":
      return (
        <Link
          href={`tel:${String(value).replace(/\s+/g, '')}`}
          dir="ltr"
          onClick={(e) => e.stopPropagation()}
          {...tableLinkStyles}
        >
<HStack gap={2}>
            <Icon size="sm" color="inherit" opacity={0.8}><Smartphone size={14} /></Icon>
            <Text fontSize="sm" fontWeight="medium" color="inherit">{String(value)}</Text>
          </HStack>
        </Link>
      );
    case "boolean":
      return (
        <Badge colorPalette={value ? "green" : "red"} variant="subtle" size="sm">
          {value ? "ACTIVE" : "INACTIVE"}
        </Badge>
      );
    case "date":
      return <Text>{new Date(String(value)).toLocaleDateString()}</Text>;
    default:
      return <>{String(value)}</>;
  }
};

export const TableRow = ({
  item, id, columns, showSelect, isSelected, toggleOne,
  isExpanded, setExpandedRowId, renderExpansion, colorPalette
}: {
  item: Record<string, unknown>;
  id: string | number | null;
  columns: { key?: string; type?: string; render?: (row: Record<string, unknown>) => React.ReactNode }[];
  showSelect: boolean;
  isSelected: boolean;
  toggleOne: (id: string | number) => void;
  isExpanded: boolean;
  setExpandedRowId: (id: string | number | null) => void;
  renderExpansion?: (row: Record<string, unknown>) => React.ReactNode;
  colorPalette: string;
}) => (
  <React.Fragment>
    <Table.Row
      cursor={renderExpansion ? "pointer" : "default"}
      onClick={() => renderExpansion && id && setExpandedRowId(isExpanded ? null : id)}
      bg={isExpanded ? { base: `${colorPalette}.50/50`, _dark: `${colorPalette}.950/20` } : "transparent"}
      data-selected={isSelected ? "" : undefined}
      _selected={{ bg: { base: `${colorPalette}.50/30`, _dark: `${colorPalette}.950/10` } }}
    >
      {showSelect && (
        <Table.Cell textAlign="center" onClick={(e) => e.stopPropagation()}>
          <Checkbox.Root size="sm" colorPalette={colorPalette} checked={!!isSelected} onCheckedChange={() => id && toggleOne(id)}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
          </Checkbox.Root>
        </Table.Cell>
      )}
      {columns.map((col, idx) => (
        <Table.Cell key={idx} py={3} fontSize="sm">
          {renderCellValue(item, col)}
        </Table.Cell>
      ))}
    </Table.Row>

    {isExpanded && renderExpansion && (
      <Table.Row bg={{ base: "gray.50", _dark: "whiteAlpha.50" }}>
        <Table.Cell colSpan={columns.length + (showSelect ? 1 : 0)} p={0} borderBottomWidth="1px">
          {renderExpansion(item)}
        </Table.Cell>
      </Table.Row>
    )}
  </React.Fragment>
);
