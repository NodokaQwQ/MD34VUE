<template>
  <label class="md34-slider" :class="disabled ? 'md34-slider--disabled' : ''">
    <span v-if="label || $slots.label" class="md34-slider__label">
      <slot name="label">{{ label }}</slot>
      <span class="md34-slider__value">{{ modelValue }}</span>
    </span>
    <input
      class="md34-slider__input"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="modelValue"
      :disabled="disabled"
      :aria-label="ariaLabel || label"
      @input="emit('update:modelValue', Number(($event.target as HTMLInputElement).value))"
      @change="emit('change', Number(($event.target as HTMLInputElement).value))"
    />
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
    step?: number
    label?: string
    ariaLabel?: string
    disabled?: boolean
  }>(),
  {
    min: 0,
    max: 100,
    step: 1,
    disabled: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: number]
  change: [value: number]
}>()
</script>
