<template>
  <div class="md34-search" :class="disabled ? 'md34-search--disabled' : ''" role="search">
    <span class="md34-search__icon" aria-hidden="true">
      <slot name="leading">⌕</slot>
    </span>
    <input
      :id="id"
      ref="inputRef"
      class="md34-search__input"
      type="search"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="ariaLabel"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @keydown.enter="emit('search', ($event.target as HTMLInputElement).value)"
    />
    <button
      v-if="modelValue"
      class="md34-search__clear md34-state-layer md34-focus-ring"
      type="button"
      :aria-label="clearLabel"
      @click="clear"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    modelValue: string
    id?: string
    placeholder?: string
    ariaLabel?: string
    clearLabel?: string
    disabled?: boolean
  }>(),
  {
    placeholder: '',
    ariaLabel: 'Search',
    clearLabel: 'Clear',
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [value: string]
}>()

const inputRef = ref<HTMLInputElement | null>(null)

function clear() {
  emit('update:modelValue', '')
  inputRef.value?.focus()
}
</script>
