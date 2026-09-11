import { Box, Flex, Button, Container, HStack, IconButton, Text } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "../components/ui/color-mode";
import { Moon, Sun, UserCircle, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/utilities/AuthContext";
import { TabsManager } from "./Tabs/TabsManager";
import { SmartLink } from "./SmartLink";

export const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      px={3}
      bg={useColorModeValue("white", "gray.950")}
      borderBottom="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.800")}
      position="sticky" top="0" zIndex="sticky"
    >
      <Container maxW="7xl">
        <Flex h={12} alignItems="center" justifyContent="space-between">
          <HStack gap={6}>
            <SmartLink to="/">
<Text fontSize="lg" fontWeight="bold" color="blue.500" cursor="pointer" _hover={{ opacity: 0.8 }}>
                Fun Travel
              </Text>
            </SmartLink>
            <TabsManager />
          </HStack>

          <HStack gap={1}>
            <IconButton onClick={toggleColorMode} variant="ghost" size="xs">
              {colorMode === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </IconButton>

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
      </Container>
    </Box>
  );
};
