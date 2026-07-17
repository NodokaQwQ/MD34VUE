<template>
  <div
    v-if="kind === 'linear'"
    class="md34-progress md34-progress--linear"
    :class="[`md34-progress--${variant}`, indeterminate ? 'md34-progress--indeterminate' : '']"
    role="progressbar"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : max"
    :aria-valuenow="indeterminate ? undefined : normalizedValue"
    :aria-label="ariaLabel"
  >
    <span class="md34-progress__track">
      <span class="md34-progress__indicator" :style="indicatorStyle" />
    </span>
  </div>
  <div
    v-else
    class="md34-progress md34-progress--circular"
    :class="[`md34-progress--${variant}`, indeterminate ? 'md34-progress--indeterminate' : '']"
    role="progressbar"
    :aria-valuemin="indeterminate ? undefined : 0"
    :aria-valuemax="indeterminate ? undefined : max"
    :aria-valuenow="indeterminate ? undefined : normalizedValue"
    :aria-label="ariaLabel"
  >
    <svg class="md34-progress__circle" viewBox="0 0 48 48" aria-hidden="true">
      <circle class="md34-progress__circle-track" cx="24" cy="24" r="18" />
      <circle class="md34-progress__circle-indicator" cx="24" cy="24" r="18" :style="circleStyle" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MdProgressKind, MdProgressVariant } from '@/types'

const props = withDefaults(
  defineProps<{
    kind?: MdProgressKind
    value?: number
    max?: number
    indeterminate?: boolean
    variant?: MdProgressVariant
    ariaLabel?: string
  }>(),
  {
    kind: 'linear',
    value: 0,
    max: 100,
    indeterminate: false,
    variant: 'primary',
    ariaLabel: 'Progress'
  }
)

const normalizedValue = computed(() => Math.min(Math.max(props.value, 0), props.max))
const percentage = computed(() => (props.max > 0 ? (normalizedValue.value / props.max) * 100 : 0))
const indicatorStyle = computed(() => (props.indeterminate ? undefined : { inlineSize: `${percentage.value}%` }))
const circleStyle = computed(() => {
  if (props.indeterminate) return undefined
  const circumference = 2 * Math.PI * 18
  return {
    strokeDasharray: `${circumference}`,
    strokeDashoffset: `${circumference - (percentage.value / 100) * circumference}`
  }
})
</script>
