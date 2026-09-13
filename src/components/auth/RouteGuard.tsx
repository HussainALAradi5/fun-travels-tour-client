"use client";

import { Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/utilities/AuthContext";

export function RouteGuard({ children, admin = false }: { children: ReactNode; admin?: boolean }) {
  const router = useRouter();
  const { isAdmin, isAuthenticated, loading } = useAuth();
  const allowed = admin ? isAdmin : isAuthenticated;

  useEffect(() => {
    if (!loading && !allowed) router.replace(admin ? "/" : "/login");
  }, [admin, allowed, loading, router]);

  if (loading || !allowed) {
    return (
      <Center minH="50vh">
        <VStack gap={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="fg.muted">Authenticating...</Text>
        </VStack>
      </Center>
    );
  }

  return children;
}
