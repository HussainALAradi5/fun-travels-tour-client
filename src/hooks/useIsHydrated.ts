"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

/**
 * Returns false during server rendering and the hydration pass, then true in
 * the browser. Use it for UI whose value depends on the browser clock or APIs.
 */
export const useIsHydrated = (): boolean =>
  useSyncExternalStore(subscribe, () => true, () => false);
