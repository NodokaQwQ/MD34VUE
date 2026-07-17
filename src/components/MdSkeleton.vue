<template>
  <span
    class="md34-skeleton"
    :class="[`md34-skeleton--${variant}`, animated ? 'md34-skeleton--animated' : '']"
    :style="styleObject"
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MdSkeletonVariant } from '@/types'

const props = withDefaults(
  defineProps<{
    variant?: MdSkeletonVariant
    width?: string | number
    height?: string | number
    animated?: boolean
  }>(),
  {
    variant: 'text',
    animated: true
  }
)

function toSize(value?: string | number) {
  if (value === undefined) return undefined
  return typeof value === 'number' ? `${value}px` : value
}

const styleObject = computed(() => ({
  inlineSize: toSize(props.width),
  blockSize: toSize(props.height)
}))
</script>
