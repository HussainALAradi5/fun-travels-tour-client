import type { SelectOption } from "@/interfaces/common/SelectOption";
import type { User } from "@/interfaces/user/User";

export const toUserOptions = (users: User[] | null | undefined): SelectOption[] =>
  (users ?? []).map((u) => ({ label: u.name ? `${u.name} (@${u.userName})` : u.userName, value: String(u.id) }));
