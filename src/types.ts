export type MdSize = 'sm' | 'md' | 'lg'

export type MdButtonVariant = 'filled' | 'tonal' | 'outlined' | 'text' | 'elevated' | 'danger'

export type MdIconButtonVariant = 'standard' | 'filled' | 'tonal' | 'outlined'

export type MdCardVariant = 'elevated' | 'filled' | 'outlined'

export type MdBadgeVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export type MdDensity = 'comfortable' | 'compact'

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
