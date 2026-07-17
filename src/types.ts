export type MdSize = 'sm' | 'md' | 'lg'

export type MdButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated' | 'danger'

export type MdIconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined'

export type MdCardVariant = 'elevated' | 'filled' | 'outlined'

export type MdChipKind = 'assist' | 'filter' | 'input' | 'suggestion'

export type MdBadgeVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export type MdDensity = 'comfortable' | 'compact'

export type MdProgressKind = 'linear' | 'circular'

export type MdProgressVariant = 'primary' | 'success' | 'warning' | 'danger'

export type MdSkeletonVariant = 'text' | 'rectangle' | 'circle'

export type MdDividerInset = 'none' | 'start' | 'middle'

export type MdSheetMode = 'modal' | 'standard'

export type MdSheetSide = 'left' | 'right'

export interface MdTabItem {
  key: string
  label: string
  disabled?: boolean
  badge?: string | number
}

export interface MdMenuItem {
  key: string
  label: string
  disabled?: boolean
  danger?: boolean
  description?: string
}

export interface MdSelectOption {
  label: string
  value: string | number | boolean | null
  disabled?: boolean
  description?: string
}

export interface MdDataTableColumn<Row = Record<string, unknown>> {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
  width?: string
  class?: string
  headerClass?: string
  formatter?: (value: unknown, row: Row) => string
}

export interface MdNavItem {
  key: string
  label: string
  href?: string
  badge?: string | number
  disabled?: boolean
}

export interface MdListItem {
  key: string
  headline: string
  supportingText?: string
  overline?: string
  href?: string
  disabled?: boolean
  selected?: boolean
  badge?: string | number
}

export interface MdDatePreset {
  key: string
  label: string
  start: string
  end: string
}

export interface MdLocaleOption {
  code: string
  label: string
  shortLabel?: string
  flag?: string
  disabled?: boolean
}
