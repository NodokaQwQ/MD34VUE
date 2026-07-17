<template>
  <nav class="md34-pagination" :aria-label="ariaLabel">
    <div class="md34-pagination__summary">
      <slot name="summary" :from="fromItem" :to="toItem" :total="total" :total-pages="totalPages">
        {{ fromItem }}-{{ toItem }} / {{ total }}
      </slot>
    </div>

    <div v-if="showPageSize" class="md34-pagination__size">
      <span class="md34-pagination__size-label">{{ pageSizeLabel }}</span>
      <MdSelect
        :model-value="pageSize"
        :options="pageSizeSelectOptions"
        variant="outlined"
        @update:model-value="onPageSizeChange"
      />
    </div>

    <div class="md34-pagination__pages">
      <button
        class="md34-pagination__button md34-state-layer md34-focus-ring"
        type="button"
        :disabled="page <= 1"
        :aria-label="previousLabel"
        @click="goTo(page - 1)"
      >
        ‹
      </button>
      <button
        v-for="(item, index) in visiblePages"
        :key="`${item}-${index}`"
        class="md34-pagination__button md34-state-layer md34-focus-ring"
        :class="item === page ? 'md34-pagination__button--active' : ''"
        type="button"
        :disabled="typeof item !== 'number'"
        :aria-current="item === page ? 'page' : undefined"
        @click="typeof item === 'number' && goTo(item)"
      >
        {{ item }}
      </button>
      <button
        class="md34-pagination__button md34-state-layer md34-focus-ring"
        type="button"
        :disabled="page >= totalPages"
        :aria-label="nextLabel"
        @click="goTo(page + 1)"
      >
        ›
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import MdSelect from './MdSelect.vue'

const props = withDefaults(
  defineProps<{
    page: number
    pageSize: number
    total: number
    pageSizeOptions?: number[]
    showPageSize?: boolean
    ariaLabel?: string
    previousLabel?: string
    nextLabel?: string
    pageSizeLabel?: string
  }>(),
  {
    pageSizeOptions: () => [10, 20, 50, 100],
    showPageSize: true,
    ariaLabel: 'Pagination',
    previousLabel: 'Previous page',
    nextLabel: 'Next page',
    pageSizeLabel: 'Rows'
  }
)

const emit = defineEmits<{
  'update:page': [value: number]
  'update:pageSize': [value: number]
}>()

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))
const fromItem = computed(() => (props.total === 0 ? 0 : (props.page - 1) * props.pageSize + 1))
const toItem = computed(() => Math.min(props.page * props.pageSize, props.total))
const pageSizeSelectOptions = computed(() => props.pageSizeOptions.map((size) => ({ label: String(size), value: size })))

const visiblePages = computed(() => {
  const total = totalPages.value
  const current = Math.min(Math.max(props.page, 1), total)
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const pages: Array<number | string> = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  if (start > 2) pages.push('...')
  for (let page = start; page <= end; page += 1) pages.push(page)
  if (end < total - 1) pages.push('...')
  pages.push(total)
  return pages
})

function goTo(value: number) {
  const next = Math.min(Math.max(value, 1), totalPages.value)
  if (next !== props.page) emit('update:page', next)
}

function onPageSizeChange(value: string | number | boolean | null) {
  if (typeof value !== 'number') return
  emit('update:pageSize', value)
}
</script>
