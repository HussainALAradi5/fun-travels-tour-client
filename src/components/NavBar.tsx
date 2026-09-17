import { Box, Flex, Button, Container, HStack, IconButton, Text } from "@chakra-ui/react";
import { ColorModeButton } from "../components/ui/color-mode";
import { UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "@/lib/navigation";
import { useAuth } from "@/utilities/AuthContext";
import { TabsManager } from "./Tabs/TabsManager";
import { SmartLink } from "./SmartLink";

export const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      px={{ base: 2, md: 3 }}
      bg={{ base: "white", _dark: "gray.950" }}
      borderBottom="1px solid"
      borderColor={{ base: "gray.100", _dark: "gray.800" }}
      position="sticky" top="0" zIndex="sticky"
    >
      <Container maxW="7xl">
        <Flex h={{ base: 14, xl: 12 }} alignItems="center" justifyContent="space-between">
          <HStack gap={{ base: 2, xl: 6 }} minW={0}>
            <Box flexShrink={0}>
              <SmartLink to="/">
                <Text fontSize={{ base: "md", md: "lg" }} whiteSpace="nowrap" fontWeight="bold" color="blue.500" cursor="pointer" _hover={{ opacity: 0.8 }}>
                  Fun Travel
                </Text>
              </SmartLink>
            </Box>
            <Box display={{ base: "none", xl: "block" }}>
              <TabsManager />
            </Box>
          </HStack>

          <HStack gap={1}>
            <ColorModeButton size="xs" />

            {user ? (
              <HStack gap={2}>
                <SmartLink to="/profile">
<HStack gap={1} color="blue.500" cursor="pointer" _hover={{ opacity: 0.8 }}>
                    <UserCircle size={18} />
                    <Text fontSize="xs" display={{ base: "none", sm: "inline" }}>{String(user.name ?? "")}</Text>
                  </HStack>
                </SmartLink>

                <IconButton variant="ghost" size="xs" color="red.500" onClick={() => { logout(); navigate("/login"); }}>
                  <LogOut size={16} />
                </IconButton>
              </HStack>
            ) : (
              <HStack gap={1}>
                <SmartLink to="/login">
<Button variant="ghost" size="xs">Login</Button>
                </SmartLink>
                <SmartLink to="/register">
<Button bg="blue.500" color="white" size="xs">Sign Up</Button>
                </SmartLink>
              </HStack>
            )}
          </HStack>
        </Flex>
        <Box
          display={{ base: "block", xl: "none" }}
          overflowX="auto"
          overscrollBehaviorX="contain"
          css={{ scrollbarWidth: "none", "&::-webkit-scrollbar": { display: "none" } }}
        >
          <TabsManager mobile />
        </Box>
      </Container>
    </Box>
  );
};
