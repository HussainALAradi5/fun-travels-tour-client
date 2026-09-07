// src/components/ui/Custom/GenericTableComponents/TableRow.tsx
import React from "react";
import { Table, Checkbox, Text, Badge, Link, Icon, HStack } from "@chakra-ui/react";
import { Mail, Smartphone } from "lucide-react";

// The modern "Pill" style adapted for table links
const tableLinkStyles = {
  display: "inline-flex",
  alignItems: "center",
  h: "8",
  px: 3,
  borderRadius: "xl",
  bg: "bg.panel",
  borderWidth: "1px",
  borderColor: "border.subtle",
  color: "blue.500", // Default text/icon color
  transition: "all 0.2s ease-in-out",
  textDecoration: "none", 
  outline: "none", 
  _hover: { 
    borderColor: "blue.400",
    bg: "blue.50",
    color: "blue.600", // Text gets slightly darker blue on hover
    textDecoration: "none",
    _dark: { bg: "blue.900/20", color: "blue.300" }
  },
  _active: { 
    // KEEP the badge background and border blue
    borderColor: "blue.400", 
    bg: "blue.50", 
    // ONLY change the text and icon to green on click!
    color: "green.500", 
    _dark: { bg: "blue.900/20", color: "green.400" }
  }
};

// Smart renderer for generic field types
const renderCellValue = (item: any, col: any) => {
  if (col.render) return col.render(item);
  
  const value = item[col.key];
  
  if (value === null || value === undefined || value === "") {
    return <Text color="fg.muted">-</Text>;
  }

  switch (col.type) {
    case "email":
      return (
        <Link 
          href={`mailto:${value}`} 
          onClick={(e) => e.stopPropagation()}
          {...tableLinkStyles}
        >
          {/* Explicitly using HStack as requested */}
          <HStack gap={2}>
            <Icon size="sm" color="inherit" opacity={0.8}><Mail size={14} /></Icon>
            <Text fontSize="sm" fontWeight="medium" color="inherit">{value}</Text>
          </HStack>
        </Link>
      );
    case "mobile":
      return (
        <Link 
          href={`tel:${value.replace(/\s+/g, '')}`} 
          dir="ltr"
          onClick={(e) => e.stopPropagation()}
          {...tableLinkStyles}
        >
          {/* Explicitly using HStack as requested */}
          <HStack gap={2}>
            <Icon size="sm" color="inherit" opacity={0.8}><Smartphone size={14} /></Icon>
            <Text fontSize="sm" fontWeight="medium" color="inherit">{value}</Text>
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
      return <Text>{new Date(value).toLocaleDateString()}</Text>;
    default:
      return value; 
  }
};

export const TableRow = ({ 
  item, id, columns, showSelect, isSelected, toggleOne, 
  isExpanded, setExpandedRowId, renderExpansion, colorPalette 
}: any) => (
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
      {columns.map((col: any, idx: number) => (
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