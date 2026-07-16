<template>
  <span class="md34-badge" :class="`md34-badge--${variant}`">
    <slot name="leading" />
    <slot />
  </span>
</template>

<script setup lang="ts">
import type { MdBadgeVariant } from '@/types'

withDefaults(
  defineProps<{
    variant?: MdBadgeVariant
  }>(),
  {
    variant: 'neutral'
  }
)
</script>
