<template>
  <button
    class="md34-icon-button md34-state-layer md34-focus-ring"
    :class="[`md34-icon-button--${variant}`, size !== 'md' ? `md34-icon-button--${size}` : '']"
    type="button"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :title="title || ariaLabel"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { MdIconButtonVariant, MdSize } from '@/types'

withDefaults(
  defineProps<{
    ariaLabel: string
    title?: string
    variant?: MdIconButtonVariant
    size?: MdSize
    disabled?: boolean
  }>(),
  {
    variant: 'standard',
    size: 'md',
    disabled: false
  }
)
</script>
