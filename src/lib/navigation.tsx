"use client";

import NextLink from "next/link";
import { useParams as useNextParams, usePathname, useRouter } from "next/navigation";
import type { ComponentProps } from "react";

export function useNavigate() {
  const router = useRouter();

  return (destination: string | number, options?: { replace?: boolean }) => {
    if (typeof destination === "number") {
      if (destination < 0) router.back();
      else if (destination > 0) router.forward();
      return;
    }

    if (options?.replace) router.replace(destination);
    else router.push(destination);
  };
}

export function useLocation() {
  return { pathname: usePathname() };
}

export function useParams<T extends Record<string, string>>() {
  return useNextParams<T>();
}

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & { to: string };

export function Link({ to, ...props }: LinkProps) {
  return <NextLink href={to} {...props} />;
}
