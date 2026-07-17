<template>
  <span
    ref="rootRef"
    class="md34-tooltip-root"
    @mouseenter="open = true"
    @mouseleave="open = false"
    @focusin="open = true"
    @focusout="open = false"
  >
    <span :aria-describedby="open ? tooltipId : undefined">
      <slot />
    </span>
    <span
      v-if="open"
      :id="tooltipId"
      class="md34-tooltip"
      :class="[`md34-tooltip--${placement}`, rich ? 'md34-tooltip--rich' : '']"
      role="tooltip"
    >
      <slot name="content">{{ text }}</slot>
    </span>
  </span>
</template>

<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    text?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
    rich?: boolean
  }>(),
  {
    placement: 'top',
    rich: false
  }
)

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const tooltipId = `md34-tooltip-${Math.random().toString(36).slice(2, 10)}`
</script>
