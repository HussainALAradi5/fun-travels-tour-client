import { Box, HStack, VStack, Text, Icon, Badge, IconButton } from "@chakra-ui/react";
import { Check, CheckCheck, Mail, MailOpen, ArrowUpRight } from "lucide-react";
import { NotificationTypeColors, ReferenceTypeColors } from "@/constants/roles/Colors";
import type { NotificationItemProps } from "@/interface/props/notification/NotificationItemProps";

export const NotificationItem = ({ notif, onMarkAsRead, onNavigate }: NotificationItemProps) => {
  const isRead = notif.isRead;

  // Dynamically map backend Enums to your defined Chakra color palettes
  const typeColor = notif.type ? NotificationTypeColors[notif.type] || "gray" : "gray";
  const refColor = notif.referenceType ? ReferenceTypeColors[notif.referenceType] || "blue" : "blue";

  const getActionText = (type?: string) => {
    if (type === "USER_REQUEST") return "View Request";
    if (type === "TOUR") return "View Tour";
    if (type === "RESERVATION") return "View Booking";
    if (type === "TICKET") return "View Ticket";
    return "View Details";
  };

  const formatEnum = (str?: string) => 
    str ? str.split('_').map(w => w.charAt(0) + w.slice(1).toLowerCase()).join(' ') : "";

  return (
    <Box 
      p={4} 
      borderRadius="2xl" 
      borderWidth="1px" 
      position="relative"
      overflow="hidden"
      // Beautiful unread accent border on the left
      borderLeftWidth={isRead ? "1px" : "4px"}
      borderColor={isRead ? "border.subtle" : `${typeColor}.500`}
      bg={isRead ? "bg.subtle" : "bg.panel"}
      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={{ 
        shadow: "sm", 
        transform: "translateY(-2px)",
        borderColor: isRead ? "border.muted" : `${typeColor}.400`
      }}
    >
      <HStack align="start" justify="space-between" gap={4}>
        <HStack align="start" gap={4} flex="1">
          {/* Subtle Icon Box matching the notification type color */}
          <Box 
            p={2.5} 
            borderRadius="xl" 
            bg={isRead ? "gray.100" : `${typeColor}.50`}
            _dark={{ bg: isRead ? "gray.800" : `${typeColor}.900/30` }}
            color={isRead ? "gray.400" : `${typeColor}.600`}
          >
            <Icon as={isRead ? MailOpen : Mail} size="md" strokeWidth={isRead ? 1.5 : 2} />
          </Box>

          <VStack align="start" gap={1} flex="1">
            <Text 
              fontWeight={isRead ? "medium" : "semibold"} 
              fontSize="md"
              color={isRead ? "fg.muted" : "fg"}
              letterSpacing="tight"
            >
              {notif.title}
            </Text>
            
            <Text 
              fontSize="sm" 
              color={isRead ? "gray.500" : "gray.600"} 
              _dark={{ color: isRead ? "gray.500" : "gray.300" }} 
              lineClamp={2}
            >
              {notif.message}
            </Text>

            <HStack gap={2} mt={2.5} flexWrap="wrap">
               {notif.type && (
                 <Badge 
                   colorPalette={typeColor} 
                   variant={isRead ? "surface" : "solid"} 
                   size="xs" 
                   borderRadius="full" 
                   px={2.5}
                   py={0.5}
                 >
                   {formatEnum(notif.type)}
                 </Badge>
               )}

               {notif.referenceType && (
                 <Badge 
                   onClick={() => onNavigate(notif)}
                   cursor="pointer"
                   size="xs" 
                   colorPalette={refColor} 
                   variant="subtle" 
                   borderRadius="full"
                   px={2.5}
                   py={0.5}
                   display="flex"
                   alignItems="center"
                   gap={1}
                   transition="all 0.2s"
                   _hover={{
                     bg: `${refColor}.200`,
                     _dark: { bg: `${refColor}.700` },
                     transform: "scale(1.02)"
                   }}
                 >
                   {getActionText(notif.referenceType)} 
                   <Icon as={ArrowUpRight} size="xs" />
                 </Badge>
               )}
               
               {notif.createdAt && (
                 <Text fontSize="xs" color="fg.muted" ml="auto" fontWeight="medium">
                   {new Date(notif.createdAt).toLocaleDateString(undefined, {
                     month: 'short', day: 'numeric', year: 'numeric'
                   })}
                 </Text>
               )}
            </HStack>
          </VStack>
        </HStack>

        {!isRead ? (
          <IconButton 
            size="sm" 
            variant="ghost" 
            colorPalette={typeColor} 
            onClick={() => onMarkAsRead(notif.id)}
            aria-label="Mark as read"
            borderRadius="full"
            _hover={{ bg: `${typeColor}.100`, _dark: { bg: `${typeColor}.800` } }}
          >
            <Check size={18} strokeWidth={2.5} />
          </IconButton>
        ) : (
          <Icon as={CheckCheck} color="green.500" size="sm" mt={2} mr={2} opacity={0.7} />
        )}
      </HStack>
    </Box>
  );
};

