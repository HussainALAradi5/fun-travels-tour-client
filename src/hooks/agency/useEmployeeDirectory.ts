import { useMemo, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { ALL_ROLES, STAFF_MANAGEMENT_ROLES } from "@/constants/agency/staff";
import type { User } from "@/interfaces/user/User";
import { userService } from "@/services/user/userService";
import { authUtils } from "@/utilities/AuthUtils";
import type { EmployeeCreateRequestDto } from "@/dtos/user/EmployeeCreateRequestDto";

/** Filtering, export rows, and staff creation for one agency's directory. */
export function useEmployeeDirectory(employees: User[], agencyId: number, onRefresh: () => void) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState(ALL_ROLES);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addDialog = useDisclosure();
  const role = authUtils.getUser()?.userType;
  const canManage = Boolean(role && STAFF_MANAGEMENT_ROLES.has(role));

  const visible = useMemo(() => {
    const q = searchTerm.toLowerCase().trim();
    return employees
      .filter((e) => roleFilter === ALL_ROLES || e.userType === roleFilter)
      .filter((e) => !q || [e.name, e.email, e.userName].some((v) => v.toLowerCase().includes(q)));
  }, [employees, searchTerm, roleFilter]);

  const exportRows = visible.map((u) => ({
    Name: u.name, Username: u.userName, Email: u.email, Mobile: u.mobileNumber, Role: u.userType,
    Status: u.active ? "Active" : "Inactive",
  }));

  const addEmployee = async (form: EmployeeCreateRequestDto) => {
    setIsSubmitting(true);
    try {
      await userService.addEmployee(form, agencyId);
      toaster.create({ title: "Added successfully", type: "success" });
      addDialog.onClose();
      onRefresh();
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    searchTerm, setSearchTerm, roleFilter, setRoleFilter, isExportOpen, setIsExportOpen, isSubmitting,
    addDialog, canManage, visible, exportRows, addEmployee, reset: () => { setSearchTerm(""); setRoleFilter(ALL_ROLES); },
  };
}
