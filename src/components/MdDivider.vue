<template>
  <div
    class="md34-divider"
    :class="[`md34-divider--${inset}`, vertical ? 'md34-divider--vertical' : '']"
    role="separator"
    :aria-orientation="vertical ? 'vertical' : 'horizontal'"
  />
</template>

<script setup lang="ts">
import type { MdDividerInset } from '@/types'

withDefaults(
  defineProps<{
    inset?: MdDividerInset
    vertical?: boolean
  }>(),
  {
    inset: 'none',
    vertical: false
  }
)
</script>
