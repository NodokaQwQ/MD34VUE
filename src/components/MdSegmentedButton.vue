<template>
  <div class="md34-segmented" role="group" :aria-label="ariaLabel">
    <button
      v-for="item in items"
      :key="item.key"
      class="md34-segment md34-state-layer md34-focus-ring"
      :class="item.key === modelValue ? 'md34-segment--active' : ''"
      type="button"
      :disabled="item.disabled"
      :aria-pressed="item.key === modelValue"
      @click="select(item)"
    >
      <slot name="item" :item="item" :active="item.key === modelValue">
        {{ item.label }}
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
    ariaLabel?: string
  }>(),
  {
    ariaLabel: 'Segmented control'
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
