import type { ComponentProps } from "react";
import type NextLink from "next/link";

type NextLinkProps = Omit<ComponentProps<typeof NextLink>, "href">;

export interface LinkProps extends NextLinkProps {
  to: string;
}
