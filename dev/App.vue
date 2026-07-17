<template>
  <MdAppShell
    v-model:collapsed="navCollapsed"
    title="MD34VUE"
    :nav-items="navItems"
    active-key="components"
    :rail-mode="railMode"
    collapsible
  >
    <template #navIcon="{ item }">
      <span class="demo-nav-icon">{{ item.label.slice(0, 1) }}</span>
    </template>

    <template #actions>
      <MdSegmentedButton v-model="railMode" :items="railModeItems" aria-label="Rail mode" />
      <MdLanguageSwitcher v-model="locale" :locales="localeOptions" />
      <MdSwitch v-model="darkMode" label="Dark" @update:model-value="syncTheme" />
      <MdButton variant="tonal" size="sm">Refresh</MdButton>
    </template>

    <div class="demo-page">
      <MdPageHeader
        eyebrow="Oproxy component library"
        title="MD3 shape and interaction coverage"
        description="A live catalog for the components Oproxy panel pages need: chrome navigation uses the cyan scope, content and business controls use the magenta scope."
      >
        <template #actions>
          <MdButton @click="snackbarOpen = true">Show snackbar</MdButton>
          <MdButton variant="outlined" @click="sideSheetOpen = true">Open side sheet</MdButton>
        </template>
      </MdPageHeader>

      <section class="demo-section">
        <div class="demo-section__heading">
          <h2>Navigation And Layout</h2>
          <p>Top app bar, side navigation, mini rail, collapsed rail, page header, cards and shell scopes.</p>
        </div>
        <div class="demo-grid demo-grid--stats">
          <MdStatCard label="Requests" value="1.28M" supporting-text="Last 24 hours" trend="+12.4%" trend-tone="positive">
            <template #icon>R</template>
          </MdStatCard>
          <MdStatCard label="Spend" value="$842.19" supporting-text="Billing window" trend="-3.1%" trend-tone="positive">
            <template #icon>$</template>
          </MdStatCard>
          <MdStatCard label="Errors" value="28" supporting-text="Needs review" trend="+4" trend-tone="negative">
            <template #icon>!</template>
          </MdStatCard>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__heading">
          <h2>Actions</h2>
          <p>Filled is the default action style; tonal, outlined, text, elevated and danger variants are available.</p>
        </div>
        <MdCard variant="outlined">
          <div class="demo-row">
            <MdButton>Filled</MdButton>
            <MdButton variant="tonal">Tonal</MdButton>
            <MdButton variant="outlined">Outlined</MdButton>
            <MdButton variant="text">Text</MdButton>
            <MdButton variant="elevated">Elevated</MdButton>
            <MdButton variant="danger">Danger</MdButton>
            <MdIconButton aria-label="Edit">✎</MdIconButton>
            <MdIconButton variant="filled" aria-label="Add">+</MdIconButton>
            <MdIconButton variant="tonal" aria-label="Tune">≡</MdIconButton>
            <MdIconButton variant="outlined" aria-label="More">⋯</MdIconButton>
            <MdLanguageSwitcher v-model="locale" :locales="localeOptions" />
          </div>
        </MdCard>
      </section>

      <section class="demo-section">
        <div class="demo-section__heading">
          <h2>Forms</h2>
          <p>Filled text fields are the default, with outlined available for dense admin filters.</p>
        </div>
        <div class="demo-grid">
          <MdCard variant="outlined" headline="Inputs">
            <div class="demo-form">
              <MdTextField v-model="form.keyword" label="Keyword" placeholder="User, channel, key" hint="Filled text field" />
              <MdSearchField v-model="form.search" placeholder="Search accounts" />
              <MdTextArea v-model="form.notes" label="Notes" placeholder="Operational notes" hint="Multi-line filled field" />
              <MdSlider v-model="form.threshold" label="Risk threshold" />
            </div>
          </MdCard>

          <MdCard variant="outlined" headline="Selection">
            <div class="demo-form">
              <MdSelect v-model="form.provider" label="Provider" :options="providerOptions" />
              <MdSwitch v-model="form.enabled" label="Enabled only" />
              <MdCheckbox v-model="form.notify" label="Quota notification" />
              <MdRadioGroup v-model="form.riskMode" :items="riskItems" aria-label="Risk mode" />
              <MdSegmentedButton v-model="timeRange" :items="rangeItems" aria-label="Time range" />
            </div>
          </MdCard>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__heading">
          <h2>Filters And Status</h2>
          <p>Chips cover assist, filter, input and suggestion use cases; badges cover status semantics.</p>
        </div>
        <MdCard variant="outlined">
          <div class="demo-chip-row">
            <MdChip kind="assist">Refresh balance</MdChip>
            <MdChip v-model:selected="chipSelected" kind="filter">Active</MdChip>
            <MdChip kind="input" selected removable @remove="chipSelected = false">claude-3-5</MdChip>
            <MdChip kind="suggestion" elevated>Recommended</MdChip>
          </div>
          <MdDivider inset="middle" />
          <div class="demo-chip-row demo-chip-row--dense">
            <MdBadge variant="neutral">Idle</MdBadge>
            <MdBadge variant="primary">Primary</MdBadge>
            <MdBadge variant="success">Success</MdBadge>
            <MdBadge variant="warning">Warning</MdBadge>
            <MdBadge variant="danger">Danger</MdBadge>
            <MdBadge variant="info">Info</MdBadge>
          </div>
        </MdCard>
      </section>

      <section class="demo-section">
        <div class="demo-section__heading">
          <h2>Data Operations</h2>
          <p>Table toolbar, filters, row selection, sortable columns, pagination and bulk action surfaces are standardized together.</p>
        </div>

        <MdBulkActionsBar :selected-count="selectedRows.length">
          <template #summary="{ selectedCount }">
            {{ selectedCount }} selected
          </template>
          <MdButton size="sm" variant="tonal">Bulk edit</MdButton>
          <MdButton size="sm" variant="outlined">Refresh token</MdButton>
          <MdButton size="sm" variant="danger">Delete</MdButton>
        </MdBulkActionsBar>

        <MdDataTable
          v-model:selected-keys="selectedRows"
          :columns="columns"
          :rows="rows"
          row-key="name"
          selectable
          sticky-header
        >
          <template #toolbar>
            <MdTableToolbar title="Accounts">
              <template #filters>
                <MdSearchField v-model="form.search" placeholder="Search table" />
                <MdSelect v-model="form.provider" :options="providerOptions" variant="outlined" />
                <MdDateRangeField
                  v-model:start="dateRange.start"
                  v-model:end="dateRange.end"
                  :presets="datePresets"
                  start-label="Start"
                  end-label="End"
                />
              </template>
              <template #actions>
                <MdButton size="sm">Create</MdButton>
                <MdMenu label="More" :items="menuItems" @select="lastAction = $event.label" />
              </template>
            </MdTableToolbar>
          </template>

          <template #cell-status="{ value }">
            <MdBadge :variant="value === 'active' ? 'success' : value === 'error' ? 'danger' : 'neutral'">
              {{ value }}
            </MdBadge>
          </template>
          <template #cell-usage="{ value }">
            <div class="demo-usage-cell">
              <span>{{ value }}%</span>
              <MdProgress :value="Number(value)" />
            </div>
          </template>
          <template #pagination>
            <MdPagination v-model:page="page" v-model:page-size="pageSize" :total="128" />
          </template>
        </MdDataTable>
      </section>

      <section class="demo-section">
        <div class="demo-section__heading">
          <h2>Feedback And Loading</h2>
          <p>Progress indicators, skeletons, empty states and snackbars cover async table and form flows.</p>
        </div>
        <div class="demo-grid">
          <MdCard variant="outlined" headline="Progress">
            <div class="demo-form">
              <MdProgress :value="64" />
              <MdProgress :value="82" variant="success" />
              <MdProgress indeterminate />
              <MdProgress kind="circular" :value="42" />
            </div>
          </MdCard>
          <MdCard variant="outlined" headline="Skeleton And Empty">
            <div class="demo-form">
              <MdSkeleton width="60%" />
              <MdSkeleton variant="rectangle" height="72px" />
              <MdSkeleton variant="circle" />
              <MdEmptyState title="No data" description="Use the consuming app i18n for final text.">
                <template #actions>
                  <MdButton variant="tonal">Reset filters</MdButton>
                </template>
              </MdEmptyState>
            </div>
          </MdCard>
        </div>
      </section>

      <section class="demo-section">
        <div class="demo-section__heading">
          <h2>Overlays And Lists</h2>
          <p>Dialogs, menus, tooltips, side sheets and lists cover Oproxy detail, confirmation and contextual action flows.</p>
        </div>
        <div class="demo-grid">
          <MdCard variant="outlined" headline="List">
            <MdList :items="listItems">
              <template #leading="{ item }">
                <span class="demo-list-icon">{{ item.headline.slice(0, 1) }}</span>
              </template>
              <template #trailing="{ item }">
                <MdBadge v-if="item.badge" variant="secondary">{{ item.badge }}</MdBadge>
              </template>
            </MdList>
          </MdCard>

          <MdCard variant="outlined" headline="Overlay controls">
            <div class="demo-stack">
              <MdButton variant="tonal" @click="dialogOpen = true">Dialog</MdButton>
              <MdButton variant="outlined" @click="sideSheetOpen = true">Side sheet</MdButton>
              <MdTooltip rich>
                <MdButton variant="text">Rich tooltip</MdButton>
                <template #content>
                  <strong>API decrypt failed</strong>
                  <div>Use tooltip for short contextual diagnostics.</div>
                </template>
              </MdTooltip>
              <MdBadge v-if="lastAction" variant="info">{{ lastAction }}</MdBadge>
            </div>
          </MdCard>
        </div>
      </section>

      <MdDialog v-model="dialogOpen" title="Confirm strategy update">
        <p>This dialog follows the M3 extra-large container shape and keeps actions in the footer.</p>
        <template #actions>
          <MdButton variant="text" @click="dialogOpen = false">Cancel</MdButton>
          <MdButton @click="dialogOpen = false">Confirm</MdButton>
        </template>
      </MdDialog>

      <MdSideSheet v-model="sideSheetOpen" title="Account detail">
        <div class="demo-form">
          <MdTextField v-model="form.keyword" label="Account name" />
          <MdSelect v-model="form.provider" label="Provider" :options="providerOptions" />
          <MdTextArea v-model="form.notes" label="Notes" />
        </div>
        <template #actions>
          <MdButton variant="text" @click="sideSheetOpen = false">Cancel</MdButton>
          <MdButton @click="sideSheetOpen = false">Save</MdButton>
        </template>
      </MdSideSheet>

      <MdSnackbar v-model="snackbarOpen" message="Settings saved" action-label="Undo" closable :timeout="4500" />
    </div>
  </MdAppShell>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { MdDataTableColumn, MdDatePreset, MdListItem, MdLocaleOption, MdNavItem, MdSelectOption } from '../src'

interface DemoRow {
  name: string
  provider: string
  status: string
  usage: number
  group: string
}

const darkMode = ref(false)
const navCollapsed = ref(false)
const railMode = ref<'standard' | 'mini'>('standard')
const locale = ref('zh')
const timeRange = ref('today')
const chipSelected = ref(true)
const dialogOpen = ref(false)
const sideSheetOpen = ref(false)
const snackbarOpen = ref(false)
const selectedRows = ref<Array<string | number>>(['default-key'])
const page = ref(1)
const pageSize = ref(20)
const lastAction = ref('')
const dateRange = reactive({ start: '2026-07-10', end: '2026-07-17' })

const form = reactive({
  keyword: 'default-key',
  search: '',
  notes: 'Keep library text supplied by Oproxy i18n at integration time.',
  provider: 'openai',
  enabled: true,
  notify: true,
  riskMode: 'balanced',
  threshold: 64
})

const navItems: MdNavItem[] = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'components', label: 'Components', badge: 33 },
  { key: 'tables', label: 'Tables' },
  { key: 'settings', label: 'Settings' }
]

const railModeItems = [
  { key: 'standard', label: 'Sidebar' },
  { key: 'mini', label: 'Mini rail' }
]

const localeOptions: MdLocaleOption[] = [
  { code: 'zh', label: '简体中文', shortLabel: 'ZH' },
  { code: 'en', label: 'English', shortLabel: 'EN' },
  { code: 'ja', label: '日本語', shortLabel: 'JA' }
]

const providerOptions: MdSelectOption[] = [
  { label: 'OpenAI', value: 'openai', description: 'Primary model provider' },
  { label: 'Gemini', value: 'gemini' },
  { label: 'Claude', value: 'claude' }
]

const riskItems = [
  { key: 'loose', label: 'Loose' },
  { key: 'balanced', label: 'Balanced' },
  { key: 'strict', label: 'Strict' }
]

const rangeItems = [
  { key: 'today', label: 'Today' },
  { key: 'week', label: 'Week' },
  { key: 'month', label: 'Month' }
]

const menuItems = [
  { key: 'sync', label: 'Sync data' },
  { key: 'export', label: 'Export config' },
  { key: 'delete', label: 'Delete strategy', danger: true }
]

const datePresets: MdDatePreset[] = [
  { key: 'today', label: 'Today', start: '2026-07-17', end: '2026-07-17' },
  { key: '7d', label: '7 days', start: '2026-07-10', end: '2026-07-17' },
  { key: '30d', label: '30 days', start: '2026-06-18', end: '2026-07-17' }
]

const columns: MdDataTableColumn<DemoRow>[] = [
  { key: 'name', label: 'Name', sortable: true, width: '220px' },
  { key: 'provider', label: 'Provider', sortable: true },
  { key: 'group', label: 'Group' },
  { key: 'status', label: 'Status' },
  { key: 'usage', label: 'Usage', align: 'right', formatter: (value) => String(value) }
]

const rows: DemoRow[] = [
  { name: 'default-key', provider: 'OpenAI', group: 'paid', status: 'active', usage: 89 },
  { name: 'gemini-pool', provider: 'Gemini', group: 'trial', status: 'active', usage: 64 },
  { name: 'fallback', provider: 'Claude', group: 'free', status: 'idle', usage: 12 },
  { name: 'overflow-risk', provider: 'OpenAI', group: 'ops', status: 'error', usage: 98 }
]

const listItems: MdListItem[] = [
  { key: 'overview', headline: 'Overview', supportingText: 'Usage, spend and health', selected: true },
  { key: 'accounts', headline: 'Accounts', supportingText: 'Pools, credentials and quotas', badge: 12 },
  { key: 'payments', headline: 'Payments', supportingText: 'Orders, providers and plans' }
]

function syncTheme(value: boolean) {
  document.documentElement.classList.toggle('dark', value)
}

onMounted(() => syncTheme(darkMode.value))
</script>

<style>
body {
  margin: 0;
}

.demo-page {
  display: grid;
  gap: 32px;
}

.demo-section {
  display: grid;
  gap: 14px;
}

.demo-section__heading h2,
.demo-section__heading p {
  margin: 0;
}

.demo-section__heading h2 {
  color: var(--md34-on-background);
  font-size: 1.125rem;
  line-height: 1.3;
}

.demo-section__heading p {
  margin-top: 4px;
  color: var(--md34-on-surface-variant);
  font-size: 0.875rem;
  line-height: 1.55;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.demo-grid--stats {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.demo-row,
.demo-stack {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.demo-chip-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.demo-chip-row--dense {
  gap: 8px;
}

.demo-form {
  display: grid;
  gap: 14px;
}

.demo-nav-icon,
.demo-list-icon {
  display: inline-grid;
  width: 28px;
  height: 28px;
  place-items: center;
  flex: 0 0 auto;
  color: currentColor;
  font-size: 0.75rem;
  font-weight: 750;
  border-radius: var(--md34-shape-full);
}

.demo-nav-icon {
  background: transparent;
}

.demo-list-icon {
  background: color-mix(in srgb, currentColor 12%, transparent);
}

.demo-usage-cell {
  display: grid;
  min-width: 120px;
  gap: 6px;
}

@media (max-width: 960px) {
  .demo-grid,
  .demo-grid--stats {
    grid-template-columns: 1fr;
  }

  .md34-page-header {
    align-items: stretch;
    flex-direction: column;
  }
}
</style>
