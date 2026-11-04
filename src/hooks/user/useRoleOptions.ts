import { useEffect, useState } from "react";
import type { SelectOption } from "@/interfaces/common/SelectOption";
import type { User } from "@/interfaces/user/User";
import { toUserOptions } from "@/utilities/userOptions";

/** Users of one role as select options, loaded while `enabled`. */
export function useRoleOptions(enabled: boolean, load: () => Promise<User[]>) {
  const [options, setOptions] = useState<SelectOption[]>([]);
  useEffect(() => {
    if (enabled) load().then((users) => setOptions(toUserOptions(users))).catch(console.error);
  }, [enabled, load]);
  return options;
}
