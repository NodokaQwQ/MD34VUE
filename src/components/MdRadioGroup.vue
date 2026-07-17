<template>
  <div class="md34-radio-group" role="radiogroup" :aria-label="ariaLabel">
    <label
      v-for="item in items"
      :key="item.key"
      class="md34-choice"
      :class="item.disabled ? 'md34-choice--disabled' : ''"
    >
      <span class="md34-radio md34-state-layer">
        <input
          class="md34-sr-only"
          type="radio"
          :name="name"
          :value="item.key"
          :checked="item.key === modelValue"
          :disabled="item.disabled"
          @change="select(item)"
        />
        <span class="md34-radio__ring" aria-hidden="true">
          <span class="md34-radio__dot" />
        </span>
      </span>
      <span class="md34-choice__label">
        <slot name="item" :item="item" :active="item.key === modelValue">
          {{ item.label }}
        </slot>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import type { MdTabItem } from '@/types'

const props = withDefaults(
  defineProps<{
    modelValue: string
    items: MdTabItem[]
    name?: string
    ariaLabel?: string
  }>(),
  {
    ariaLabel: 'Options'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, item: MdTabItem]
}>()

const name = props.name ?? `md34-radio-${Math.random().toString(36).slice(2, 10)}`

function select(item: MdTabItem) {
  if (item.disabled || item.key === props.modelValue) return
  emit('update:modelValue', item.key)
  emit('change', item.key, item)
}
</script>
