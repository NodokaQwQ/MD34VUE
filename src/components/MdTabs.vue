<template>
  <div class="md34-tabs" :class="[`md34-tabs--${variant}`]" role="tablist" :aria-label="ariaLabel">
    <button
      v-for="item in items"
      :key="item.key"
      class="md34-tab md34-state-layer md34-focus-ring"
      :class="item.key === modelValue ? 'md34-tab--active' : ''"
      type="button"
      role="tab"
      :disabled="item.disabled"
      :aria-selected="item.key === modelValue"
      @click="select(item)"
    >
      <slot name="item" :item="item" :active="item.key === modelValue">
        <span>{{ item.label }}</span>
        <span v-if="item.badge !== undefined" class="md34-tab__badge">{{ item.badge }}</span>
      </slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import type { MdTabItem } from '@/types'

const props = withDefaults(
  defineProps<{
    modelValue: string
    items: MdTabItem[]
    variant?: 'primary' | 'secondary'
    ariaLabel?: string
  }>(),
  {
    variant: 'primary',
    ariaLabel: 'Tabs'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, item: MdTabItem]
}>()

function select(item: MdTabItem) {
  if (item.disabled || item.key === props.modelValue) return
  emit('update:modelValue', item.key)
  emit('change', item.key, item)
}
</script>
