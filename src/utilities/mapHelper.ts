import type { SelectOption } from "@/interface/common/SelectOption";

export function mapEntitiesToOptions<T>(
  entities: T[],
  labelKey: keyof T,
  valueKey: keyof T,
  additionalTransform?: (entity: T) => React.ReactNode
): SelectOption[] {
  return entities
    .filter(e => e[labelKey] != null)
    .map(e => ({
      label: additionalTransform ? String(e[labelKey]) : String(e[labelKey]),
      value: e[valueKey] as string | number,
    }));
}

export function mapEntitiesToReactNodeOptions<T>(
  entities: T[],
  labelKey: keyof T,
  valueKey: keyof T,
  renderLabel: (entity: T) => React.ReactNode
): (SelectOption & { labelNode: React.ReactNode })[] {
  return entities
    .filter(e => e[labelKey] != null)
    .map(e => ({
      label: String(e[labelKey]),
      value: e[valueKey] as string | number,
      labelNode: renderLabel(e),
    }));
}
