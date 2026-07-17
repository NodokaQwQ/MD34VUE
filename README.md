# MD34VUE

Material Design 3 styled Vue components and CSS tokens for Oproxy frontends.

This repository is intended to be consumed as a library by the existing Oproxy Vue 3 frontend. It provides low-dependency components plus a CSS-variable theme layer that can be adopted page by page.

## Install

```bash
pnpm add md34vue
```

For local development against Oproxy, use a workspace link or package alias from the frontend project.

## Usage

```ts
import { createApp } from 'vue'
import Md34Vue from 'md34vue'
import 'md34vue/style.css'

createApp(App).use(Md34Vue).mount('#app')
```

Components are also available as named imports:

```vue
<script setup lang="ts">
import { MdButton, MdTextField } from 'md34vue'
</script>
```

## Components

- `MdAppShell`
- `MdBadge`
- `MdBulkActionsBar`
- `MdButton`
- `MdCard`
- `MdCheckbox`
- `MdChip`
- `MdDataTable`
- `MdDateRangeField`
- `MdDialog`
- `MdDivider`
- `MdEmptyState`
- `MdIconButton`
- `MdLanguageSwitcher`
- `MdList`
- `MdMenu`
- `MdPageHeader`
- `MdPagination`
- `MdProgress`
- `MdRadioGroup`
- `MdSearchField`
- `MdSegmentedButton`
- `MdSelect`
- `MdSideSheet`
- `MdSkeleton`
- `MdSlider`
- `MdSnackbar`
- `MdStatCard`
- `MdSwitch`
- `MdTableToolbar`
- `MdTabs`
- `MdTextArea`
- `MdTextField`
- `MdTooltip`

## M3 Guideline Check

The library uses Material Design 3 for component purpose, shape, density, and state behavior. It intentionally keeps Oproxy colors instead of Material Theme Builder output.

| Oproxy need | MD34VUE component | M3 reference | Current coverage |
| --- | --- | --- | --- |
| Top bar, side navigation, mini rail, collapsed sidebar | `MdAppShell` | Navigation rail / drawer / app bar patterns | Covered. Chrome scope uses cyan; main content uses magenta. No breadcrumb by decision. |
| Primary and secondary actions | `MdButton`, `MdIconButton` | Buttons, icon buttons | Covered: filled default, tonal, outlined, text, elevated, danger, icon variants. |
| Locale switching | `MdLanguageSwitcher` | Menus, icon buttons | Covered: topbar-ready language trigger, current locale state, menu selection, icon/check slots. |
| Filled form controls | `MdTextField`, `MdTextArea`, `MdSearchField`, `MdSelect` | Text fields, search | Covered: filled default, outlined optional, supporting/error text, prefix/suffix slots. |
| Binary and option selection | `MdCheckbox`, `MdRadioGroup`, `MdSwitch`, `MdSlider`, `MdSegmentedButton` | Checkbox, radio button, switch, slider, segmented button | Covered: standard states, disabled states, single-select segmented controls. |
| Filtering and status chips | `MdChip`, `MdBadge` | Chips, badges | Covered: assist/filter/input/suggestion chips; badge status variants mapped to Oproxy states. |
| Admin tables | `MdDataTable`, `MdTableToolbar`, `MdPagination`, `MdBulkActionsBar` | Material table conventions plus M3 surfaces/state layers | Covered: sorting, row selection, loading/empty slots, filters/actions toolbar, pagination/footer slots, compact density. |
| Page stats and repeated surfaces | `MdCard`, `MdStatCard`, `MdList`, `MdDivider` | Cards, lists, dividers | Covered: elevated/filled/outlined cards, scan-friendly list rows, dividers and stat cards. |
| Dialog/detail/secondary panels | `MdDialog`, `MdSideSheet`, `MdMenu`, `MdTooltip` | Dialogs, side sheets, menus, tooltips | Covered: modal dialog, modal side sheet, contextual menus, plain/rich tooltips. |
| Async feedback | `MdProgress`, `MdSkeleton`, `MdSnackbar`, `MdEmptyState` | Progress indicators, snackbar | Covered: linear/circular progress, determinate/indeterminate, skeleton placeholders, snackbar action/close. |
| Date range filters | `MdDateRangeField` | Date picker/date input patterns | Covered for Oproxy table filtering: presets plus start/end filled date fields. Full calendar grid can be added later if needed. |

M3 pages used for this pass include:

- https://m3.material.io/components
- https://m3.material.io/components/buttons/guidelines
- https://m3.material.io/components/text-fields/guidelines
- https://m3.material.io/components/chips/guidelines
- https://m3.material.io/components/dialogs/guidelines
- https://m3.material.io/components/menus/guidelines
- https://m3.material.io/components/navigation-rail/guidelines
- https://m3.material.io/components/navigation-drawer/guidelines
- https://m3.material.io/components/tabs/guidelines
- https://m3.material.io/components/segmented-buttons/guidelines
- https://m3.material.io/components/progress-indicators/guidelines
- https://m3.material.io/components/snackbar/guidelines
- https://m3.material.io/components/tooltips/guidelines
- https://m3.material.io/components/lists/guidelines
- https://m3.material.io/components/cards/guidelines
- https://m3.material.io/components/side-sheets/guidelines
- https://m3.material.io/styles/shape/corner-radius-scale

Data tables do not currently have a full standalone M3 guideline page with the same coverage as the other components, so `MdDataTable` follows Material table conventions and the real Oproxy table usage: fixed toolbar/filter/action zones, row selection, sortable headers, loading/empty states, compact density, pagination, and bulk actions.

## Oproxy Coverage

The current Oproxy frontend in `Oproxy.sub2api/frontend` uses these common UI categories:

- Layout: `AppLayout`, `AppHeader`, `AppSidebar`, `TablePageLayout`
- Forms: `Input`, `TextArea`, `SearchInput`, `Select`, `Toggle`, `DateRangePicker`
- Tables: `DataTable`, `Pagination`, sticky/action columns, bulk action bars, table filters
- Feedback: `Toast`, `Skeleton`, `LoadingSpinner`, `NavigationProgress`, `EmptyState`
- Overlays: `BaseDialog`, `ConfirmDialog`, detail dialogs, payment dialogs, export progress dialogs
- Status and data display: `StatusBadge`, `GroupBadge`, `PlatformTypeBadge`, `VersionBadge`, `StatCard`, usage progress bars
- Contextual help and menus: `HelpTooltip`, action popovers, endpoint popovers
- Locale switching: existing `LocaleSwitcher` can wrap `MdLanguageSwitcher` while keeping `vue-i18n` and `setLocale` in Oproxy.

MD34VUE now provides standardized primitives for those categories. Business-specific components such as payment method cards, provider selectors, group selectors, model whitelist selectors, QR payment panels, and account OAuth flows should be migrated as Oproxy-side wrappers around these primitives, not moved wholesale into this library.

## Theme

The color tokens follow the Oproxy design spec in `Art/配色与图标/设计规范.ai`. The component shape tokens follow the Material shape scale, but the color palette does not use Material Theme Builder output.

```css
:root {
  --md34-primary: #2297a6;
  --md34-secondary: #b9569a;
  --md34-background: #f1f1f1;
  --md34-surface: #f0efef;
  --md34-outline: #b6b4b5;
}
```

Shape tokens:

- `--md34-shape-extra-small: 4px`
- `--md34-shape-small: 8px`
- `--md34-shape-medium: 12px`
- `--md34-shape-large: 16px`
- `--md34-shape-extra-large: 28px`
- `--md34-shape-full: 999px`

Color scopes:

- `.md34-scope-chrome` is for app chrome: top bar, side navigation, mini rail, and global navigation. It uses the cyan palette from `color-blue.md`.
- `.md34-scope-content` is for page content and business operations. It uses the magenta palette from `color-red.md`.
- Price and warning states use `#E8A11F`.
- Success, completion, and positive balance states use `#35BD9A`.

The app shell applies chrome scope to the top bar and rail, and content scope to the main panel by default.

Layout decisions:

- Desktop shell uses an edgeless top bar + side navigation + content panel.
- The side rail owns the full viewport height, and the top bar starts after the rail instead of drawing over it.
- Mini rail and collapsed side navigation are supported.
- Breadcrumbs are intentionally not part of the base shell.
- Form controls default to `filled`.
- Component text is provided by the consuming Oproxy app i18n layer.

## Development

```bash
pnpm install
pnpm dev
pnpm build
```
