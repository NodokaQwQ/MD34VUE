<template>
  <div class="md34-data-table" :class="density === 'compact' ? 'md34-data-table--compact' : ''">
    <div class="md34-data-table__scroller">
      <table>
        <thead>
          <tr>
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
            <td :colspan="columns.length">
              <slot name="loading">
                <div class="md34-data-table__loading">{{ loadingText }}</div>
              </slot>
            </td>
          </tr>
        </tbody>
        <tbody v-else-if="!sortedRows.length">
          <tr>
            <td :colspan="columns.length">
              <slot name="empty">
                <div class="md34-data-table__empty">{{ emptyText }}</div>
              </slot>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="(row, rowIndex) in sortedRows" :key="resolveRowKey(row, rowIndex)">
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
  }>(),
  {
    loading: false,
    loadingText: '加载中',
    emptyText: '暂无数据',
    density: 'comfortable'
  }
)

const emit = defineEmits<{
  sort: [key: string, order: 'asc' | 'desc']
}>()

const sortKey = ref('')
const sortOrder = ref<'asc' | 'desc'>('asc')

const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows

  const direction = sortOrder.value === 'asc' ? 1 : -1
  return [...props.rows].sort((a, b) => {
    const left = getCellValue(a, sortKey.value)
    const right = getCellValue(b, sortKey.value)
    return String(left ?? '').localeCompare(String(right ?? ''), undefined, { numeric: true }) * direction
  })
})

function toggleSort(key: string) {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
  emit('sort', key, sortOrder.value)
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
