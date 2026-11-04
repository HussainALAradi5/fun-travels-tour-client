import { useEffect, useMemo, useState } from "react";
import { ALL_USER_ROLES } from "@/constants/user/userDirectory";
import type { User } from "@/interfaces/user/User";
import { userService } from "@/services/user/userService";

/** All users or one role from the server, with a local name/email/username search. */
export function useUserDirectory() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [role, setRole] = useState<string>(ALL_USER_ROLES);

  useEffect(() => {
    let active = true;
    (role === ALL_USER_ROLES ? userService.getAllUsers() : userService.getUsersByRole(role))
      .then((res) => active && setUsers(res || []))
      .catch((error) => console.error("Failed to fetch users", error))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [role]);

  const visible = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return q ? users.filter((u) => [u.name, u.email, u.userName].some((v) => v?.toLowerCase().includes(q))) : users;
  }, [users, searchQuery]);

  return { visible, loading, searchQuery, setSearchQuery, role, setRole, reset: () => { setSearchQuery(""); setRole(ALL_USER_ROLES); } };
}
