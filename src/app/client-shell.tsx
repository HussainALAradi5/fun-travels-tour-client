"use client";

import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/utilities/AuthContext";
import { NotificationProvider } from "@/utilities/NotificationContext";
import { NotificationEscapeListener } from "@/components/ui/Custom/GenericNotification";

interface ClientShellProps {
  children: ReactNode;
  currentYear: number;
}

export function ClientShell({ children, currentYear }: ClientShellProps) {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Box minH="100vh" display="flex" flexDirection="column" bg={{ base: "gray.50", _dark: "gray.950" }}>
          <NavBar />
          <Box as="main" flex="1">{children}</Box>
          <Footer currentYear={currentYear} />
          <Toaster />
          <NotificationEscapeListener />
        </Box>
      </NotificationProvider>
    </AuthProvider>
  );
}
