"use client";

import { Center, Spinner, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/utilities/AuthContext";
import { UserType, type UserType as UserTypeValue } from "@/enums/UserType";

interface RouteGuardProps {
  children: ReactNode;
  admin?: boolean;
  allowedUserTypes?: readonly UserTypeValue[];
}

export function RouteGuard({ children, admin = false, allowedUserTypes }: RouteGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated, loading } = useAuth();
  const requiredUserTypes: readonly UserTypeValue[] | undefined = admin
    ? [UserType.ADMIN]
    : allowedUserTypes;
  const allowed = Boolean(isAuthenticated && (
    !requiredUserTypes || (user && requiredUserTypes.includes(user.userType))
  ));

  useEffect(() => {
    if (!loading && !allowed) router.replace(isAuthenticated ? "/" : "/login");
  }, [allowed, isAuthenticated, loading, router]);

  if (loading || !allowed) {
    return (
      <Center minH="50vh">
        <VStack gap={4}>
          <Spinner size="xl" color="blue.500" />
          <Text color="fg.muted">{loading ? "Authenticating..." : "Checking access..."}</Text>
        </VStack>
      </Center>
    );
  }

  return children;
}
