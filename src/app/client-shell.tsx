"use client";

import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { useColorModeValue } from "@/components/ui/color-mode";
import { AuthProvider } from "@/utilities/AuthContext";
import { NotificationProvider } from "@/utilities/NotificationContext";

export function ClientShell({ children }: { children: ReactNode }) {
  const background = useColorModeValue("gray.50", "gray.950");

  return (
    <AuthProvider>
      <NotificationProvider>
        <Box minH="100vh" display="flex" flexDirection="column" bg={background}>
          <NavBar />
          <Box as="main" flex="1">{children}</Box>
          <Footer />
          <Toaster />
        </Box>
      </NotificationProvider>
    </AuthProvider>
  );
}
