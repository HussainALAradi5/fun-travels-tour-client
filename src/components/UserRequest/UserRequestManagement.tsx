import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "@/lib/navigation";
import { VStack, HStack, Badge, Icon, Button, Box } from "@chakra-ui/react";
import { UnifiedFilterBar } from "@/components/ui/Custom/UnifiedFilterBar";
import type { FilterGroup } from "@/interface/common/FilterGroup";
import { UserRequestList } from "./UserRequestList";
import { UserRequestCreateDialog } from "./UserRequestCreateDialog";
import { ShieldCheck, Plus } from "lucide-react";
import type { UserRequest } from "@/interface/support/UserRequest";
import { userRequestService } from "@/Api/UserRequest";
import { UserRequestType } from "@/enums/UserRequest/UserRequestType";
import { UserRequestStatus } from "@/enums/UserRequest/UserRequestStatus";
import { useUser } from "@/hooks/User/useUser";

export const UserRequestManager = () => {
  const { user, isAdmin } = useUser();
  const navigate = useNavigate();
  const [data, setData] = useState<UserRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ type: "", status: "", search: "" });
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const fetchRequests = useCallback(async () => {
    if (!user?.id) return;
    const res = await userRequestService.getRequests({
      currentUserId: user.id,
      type: filters.type as UserRequestType,
      status: filters.status as UserRequestStatus
    });
    if (res) setData(res);
    setLoading(false);
  }, [user, filters.type, filters.status]);

  useEffect(() => {
    if (!user?.id) return;
    userRequestService.getRequests({
      currentUserId: user.id,
      type: filters.type as UserRequestType,
      status: filters.status as UserRequestStatus
    }).then((res) => {
      if (res) setData(res);
      setLoading(false);
    });
  }, [user, filters.type, filters.status]);

  const filterConfig: FilterGroup[] = [
    {
      label: "Category",
      value: filters.type,
      options: [
        { label: "All", value: "" },
        { label: "Support", value: "SUPPORT" },
        { label: "Suggestion", value: "SUGGESTION" }
      ],
      onChange: (v) => setFilters(f => ({ ...f, type: v })),
      variant: "select"
    },
    {
      label: "Status",
      value: filters.status,
      options: [{ label: "All Statuses", value: "" }, ...Object.values(UserRequestStatus).map(s => ({ label: s, value: s }))],
      onChange: (v) => setFilters(f => ({ ...f, status: v })),
      variant: "select"
    }
  ];
  const handleViewRequest = (req: UserRequest) => {
    if (isAdmin || user?.userType === "SUPPORT_AGENT") {
      navigate(`/admin/requests/${req.id}`);
    } else {
      navigate(`/my-requests/${req.id}`);
    }
  };

  return (
    <VStack gap={6} align="stretch">
      <HStack justify="space-between" width="full" align="flex-end">
        <HStack gap={4} flex="1" align="flex-end">
          <Box flex="1">
            <UnifiedFilterBar
              searchLabel="Search Requests"
              searchValue={filters.search}
              onSearchTrigger={(v) => setFilters(f => ({ ...f, search: v }))}
              filters={filterConfig}
              count={data.length}
              onReset={() => setFilters({ type: "", status: "", search: "" })}
            />
          </Box>

          <Button
            variant="ghost"
            colorPalette="blue"
            size="sm"
            h="10"
            px={4}
            borderRadius="xl"
            onClick={() => setIsCreateOpen(true)}
            gap={2}
          >
            <Plus size={16} />
            <Box as="span" fontWeight="bold" fontSize="xs">New Request</Box>
          </Button>
        </HStack>

        {isAdmin && (
          <Badge colorPalette="blue" variant="surface" size="lg" px={4} py={2} borderRadius="xl">
            <HStack gap={2}>
              <Icon size="sm"><ShieldCheck /></Icon>
              Admin Mode
            </HStack>
          </Badge>
        )}
      </HStack>

      <UserRequestList
        data={data.filter(d =>
          d.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          d.description.toLowerCase().includes(filters.search.toLowerCase())
        )}
        loading={loading}
        onView={handleViewRequest}
      />
<UserRequestCreateDialog
        open={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        currentUserId={user?.id || 0}
        loading={loading}
        onSubmit={async (val) => {
          await userRequestService.create(val as never);
          setIsCreateOpen(false);
          fetchRequests();
        }}
      />
    </VStack>
  );
};


