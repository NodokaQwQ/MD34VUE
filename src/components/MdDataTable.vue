<template>
  <div
    class="md34-data-table"
    :class="[
      density === 'compact' ? 'md34-data-table--compact' : '',
      stickyHeader ? 'md34-data-table--sticky-header' : ''
    ]"
  >
    <div v-if="$slots.toolbar || $slots.actions || $slots.filters" class="md34-data-table__toolbar">
      <slot name="toolbar">
        <div v-if="$slots.filters" class="md34-data-table__filters">
          <slot name="filters" />
        </div>
        <div v-if="$slots.actions" class="md34-data-table__actions">
          <slot name="actions" />
        </div>
      </slot>
    </div>

    <div class="md34-data-table__scroller">
      <table :style="{ minWidth }">
        <thead>
          <tr>
            <th v-if="selectable" class="md34-data-table__select-cell" scope="col">
              <label class="md34-data-table__checkbox">
                <input
                  type="checkbox"
                  :checked="allRowsSelected"
                  :indeterminate.prop="someRowsSelected && !allRowsSelected"
                  :aria-label="selectAllLabel"
                  @change="toggleAll(($event.target as HTMLInputElement).checked)"
                />
              </label>
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              :class="column.headerClass"
              :style="{ width: column.width, textAlign: column.align ?? 'left' }"
              scope="col"
            >
              <button
                v-if="column.sortable"
                class="md34-data-table__sort"
                type="button"
                @click="toggleSort(column.key)"
              >
                <span>{{ column.label }}</span>
                <span class="md34-data-table__sort-indicator" aria-hidden="true">
                  {{ sortKey === column.key ? (sortOrder === 'asc' ? '↑' : '↓') : '↕' }}
                </span>
              </button>
              <template v-else>{{ column.label }}</template>
            </th>
          </tr>
        </thead>
        <tbody v-if="loading">
          <tr>
            <td :colspan="visibleColumnCount">
              <slot name="loading">
                <div class="md34-data-table__loading">{{ loadingText }}</div>
              </slot>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="!sortedRows.length">
          <tr>
            <td :colspan="visibleColumnCount">
              <slot name="empty">
                <div class="md34-data-table__empty">{{ emptyText }}</div>
              </slot>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr
            v-for="(row, rowIndex) in sortedRows"
            :key="resolveRowKey(row, rowIndex)"
            :class="isSelected(row, rowIndex) ? 'md34-data-table__row--selected' : ''"
            @click="emit('rowClick', row, rowIndex)"
          >
            <td v-if="selectable" class="md34-data-table__select-cell" @click.stop>
              <label class="md34-data-table__checkbox">
                <input
                  type="checkbox"
                  :checked="isSelected(row, rowIndex)"
                  :aria-label="selectRowLabel"
                  @change="toggleRow(row, rowIndex, ($event.target as HTMLInputElement).checked)"
                />
              </label>
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
              :class="column.class"
              :style="{ textAlign: column.align ?? 'left' }"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="getCellValue(row, column.key)">
                {{ formatCell(row, column) }}
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="$slots.pagination || $slots.footer" class="md34-data-table__footer">
      <slot name="footer">
        <slot name="pagination" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts" generic="Row extends Record<string, unknown>">
import { computed, ref } from 'vue'
import type { MdDataTableColumn, MdDensity } from '@/types'

const props = withDefaults(
  defineProps<{
    columns: MdDataTableColumn<Row>[]
    rows: Row[]
    rowKey?: keyof Row | ((row: Row, index: number) => string | number)
    loading?: boolean
    loadingText?: string
    emptyText?: string
    density?: MdDensity
    selectable?: boolean
    selectedKeys?: Array<string | number>
    selectAllLabel?: string
    selectRowLabel?: string
    stickyHeader?: boolean
    minWidth?: string
    serverSideSort?: boolean
  }>(),
  {
    loading: false,
    loadingText: '加载中',
    emptyText: '暂无数据',
    density: 'comfortable',
    selectable: false,
    selectedKeys: () => [],
    selectAllLabel: 'Select all rows',
    selectRowLabel: 'Select row',
    stickyHeader: false,
    minWidth: '560px',
    serverSideSort: false
  }
)

const emit = defineEmits<{
  sort: [key: string, order: 'asc' | 'desc']
  rowClick: [row: Row, index: number]
  'update:selectedKeys': [keys: Array<string | number>]
}>()

const sortKey = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const sortedRows = computed(() => {
  if (!sortKey.value || props.serverSideSort) return props.rows

  const direction = sortOrder.value === 'asc' ? 1 : -1
  return [...props.rows].sort((a, b) => {
    const left = getCellValue(a, sortKey.value)
    const right = getCellValue(b, sortKey.value)
    return String(left ?? '').localeCompare(String(right ?? ''), undefined, { numeric: true }) * direction
  })
})

const visibleColumnCount = computed(() => props.columns.length + (props.selectable ? 1 : 0))
const selectedSet = computed(() => new Set(props.selectedKeys.map(String)))
const selectableKeys = computed(() => sortedRows.value.map((row, index) => String(resolveRowKey(row, index))))
const allRowsSelected = computed(() => selectableKeys.value.length > 0 && selectableKeys.value.every((key) => selectedSet.value.has(key)))
const someRowsSelected = computed(() => selectableKeys.value.some((key) => selectedSet.value.has(key)))

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', key, sortOrder.value)
}

function toggleAll(checked: boolean) {
  const next = new Set(props.selectedKeys.map(String))
  selectableKeys.value.forEach((key) => {
    if (checked) next.add(key)
    else next.delete(key)
  })
  emit('update:selectedKeys', Array.from(next))
}

function toggleRow(row: Row, index: number, checked: boolean) {
  const key = String(resolveRowKey(row, index))
  const next = new Set(props.selectedKeys.map(String))
  if (checked) next.add(key)
  else next.delete(key)
  emit('update:selectedKeys', Array.from(next))
}

function isSelected(row: Row, index: number) {
  return selectedSet.value.has(String(resolveRowKey(row, index)))
}

function getCellValue(row: Row, key: string) {
  return row[key]
}

function formatCell(row: Row, column: MdDataTableColumn<Row>) {
  const value = getCellValue(row, column.key)
  return column.formatter ? column.formatter(value, row) : String(value ?? '')
}

function resolveRowKey(row: Row, index: number) {
  if (typeof props.rowKey === 'function') return props.rowKey(row, index)
  if (props.rowKey) return String(row[props.rowKey])
  return index
}
</script>
