"use client";

import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { useColorModeValue } from "@/components/ui/color-mode";
import { AuthProvider } from "@/utilities/AuthContext";
import { NotificationProvider } from "@/utilities/NotificationContext";
import { NotificationEscapeListener } from "@/components/ui/Custom/GenericNotification";

interface ClientShellProps {
  children: ReactNode;
  currentYear: number;
}

export function ClientShell({ children, currentYear }: ClientShellProps) {
  const background = useColorModeValue("gray.50", "gray.950");

  return (
    <AuthProvider>
      <NotificationProvider>
        <Box minH="100vh" display="flex" flexDirection="column" bg={background}>
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
