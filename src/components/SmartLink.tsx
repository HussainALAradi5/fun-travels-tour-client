import React, { useState, useEffect } from "react";
import { Box, Button, VStack, Icon } from "@chakra-ui/react";
import { useNavigate } from "@/lib/navigation";
import { ExternalLink, Monitor } from "lucide-react";
import type { SmartLinkProps } from "@/interface/props/common/SmartLinkProps";

export const SmartLink = ({ to, children }: SmartLinkProps) => {
  const navigate = useNavigate();
  const [menuState, setMenuState] = useState({ isOpen: false, x: 0, y: 0 });

  useEffect(() => {
    if (!menuState.isOpen) return;

    const closeMenu = () => {
      setMenuState((previous) =>
        previous.isOpen ? { ...previous, isOpen: false } : previous,
      );
    };

    window.addEventListener("click", closeMenu);
    window.addEventListener("scroll", closeMenu, { passive: true });

    return () => {
      window.removeEventListener("click", closeMenu);
      window.removeEventListener("scroll", closeMenu);
    };
  }, [menuState.isOpen]);

  const handleClick = (e: React.MouseEvent) => {
    if (e.button === 2) return;

    if (e.ctrlKey || e.metaKey || e.button === 1) {
      window.open(to, "_blank");
      return;
    }

    if (e.shiftKey) {
      window.open(to, "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600");
      return;
    }

    navigate(to);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const menuWidth = 200;
    const xPos = e.clientX + menuWidth > window.innerWidth ? e.clientX - menuWidth : e.clientX;

    setMenuState({
      isOpen: true,
      x: xPos,
      y: e.clientY
    });
  };

  return (
    <>
      <Box
        as="span"
        display="contents"
        onClick={handleClick}
        onAuxClick={handleClick}
        onContextMenu={handleContextMenu}
        cursor="pointer"
      >
        {children}
      </Box>

      {menuState.isOpen && (
        <Box
          position="fixed"
          top={`${menuState.y}px`}
          left={`${menuState.x}px`}
          zIndex={10000}
          bg="white"
          _dark={{ bg: "gray.900", borderColor: "gray.700" }}
          boxShadow="0px 4px 20px rgba(0, 0, 0, 0.15)"
          border="1px solid"
          borderColor="gray.100"
          borderRadius="lg"
          p={1.5}
          minW="200px"
        >
          <VStack gap={0.5} align="stretch">
            <Button
              variant="ghost"
              size="sm"
              height="36px"
              justifyContent="flex-start"
              fontWeight="medium"
              fontSize="xs"
              color="gray.700"
              _dark={{ color: "gray.200" }}
              _hover={{
                bg: "blue.500",
                color: "white"
              }}
              onClick={() => window.open(to, "_blank")}
            >
<Icon as={ExternalLink} mr={2} size="xs" />
              Open in new tab
            </Button>

            <Button
              variant="ghost"
              size="sm"
              height="36px"
              justifyContent="flex-start"
              fontWeight="medium"
              fontSize="xs"
              color="gray.700"
              _dark={{ color: "gray.200" }}
              _hover={{
                bg: "blue.500",
                color: "white"
              }}
              onClick={() => window.open(to, "_blank", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=800,height=600")}
            >
<Icon as={Monitor} mr={2} size="xs" />
              Open in new window
            </Button>
          </VStack>
        </Box>
      )}
    </>
  );
};
