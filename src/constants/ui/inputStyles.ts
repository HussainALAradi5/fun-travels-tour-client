/** Outer shell of composite inputs (icon + input in one bordered group). */
export const COMPOSITE_INPUT_STYLES = {
  h: "10",
  borderRadius: "xl",
  bg: "bg.panel",
  borderWidth: "1px",
  borderColor: "border.subtle",
  transition: "all 0.2s ease-in-out",
  _hover: { borderColor: "blue.400", bg: "blue.50", _dark: { bg: "blue.900/20" } },
};

/** Borderless input placed inside a composite input group. */
export const BARE_INPUT_STYLES = {
  bg: "transparent",
  border: "none",
  outline: "none",
  boxShadow: "none",
  px: 0,
  flex: "1",
  _focus: { boxShadow: "none", outline: "none", border: "none" },
};

export const DEFAULT_COUNTRY_CODE = "BH";
export const MAX_MOBILE_DIGITS = 15;
