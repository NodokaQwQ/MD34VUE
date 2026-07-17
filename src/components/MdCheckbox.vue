<template>
  <label class="md34-choice" :class="disabled ? 'md34-choice--disabled' : ''">
    <span class="md34-checkbox md34-state-layer">
      <input
        class="md34-sr-only"
        type="checkbox"
        :checked="modelValue"
        :disabled="disabled"
        :aria-label="ariaLabel || label"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span class="md34-checkbox__box" aria-hidden="true">
        <span v-if="modelValue" class="md34-checkbox__mark">✓</span>
      </span>
    </span>
    <span v-if="label || $slots.default" class="md34-choice__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: boolean
    label?: string
    ariaLabel?: string
    disabled?: boolean
  }>(),
  {
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()
</script>
