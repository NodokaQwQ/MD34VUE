<template>
  <label class="md34-switch" :class="[modelValue ? 'md34-switch--selected' : '', disabled ? 'md34-switch--disabled' : '']">
    <span class="md34-switch__track md34-state-layer md34-focus-ring">
      <input
        class="md34-sr-only"
        type="checkbox"
        role="switch"
        :checked="modelValue"
        :disabled="disabled"
        :aria-label="ariaLabel || label"
        @change="emit('update:modelValue', ($event.target as HTMLInputElement).checked)"
      />
      <span class="md34-switch__thumb">
        <slot name="thumb" />
      </span>
    </span>
    <span v-if="label || $slots.default" class="md34-switch__label">
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
