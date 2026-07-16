<template>
  <component
    :is="tag"
    class="md34-card"
    :class="[
      `md34-card--${variant}`,
      interactive ? 'md34-card--interactive md34-state-layer md34-focus-ring' : ''
    ]"
    :tabindex="interactive ? 0 : undefined"
  >
    <div v-if="$slots.media" class="md34-card__media">
      <slot name="media" />
    </div>

    <div class="md34-card__content">
      <slot name="header">
        <h3 v-if="headline" class="md34-card__headline">{{ headline }}</h3>
        <p v-if="subtitle" class="md34-card__subtitle">{{ subtitle }}</p>
      </slot>
      <slot />
    </div>

    <div v-if="$slots.actions" class="md34-card__actions">
      <slot name="actions" />
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MdCardVariant } from '@/types'

const props = withDefaults(
  defineProps<{
    variant?: MdCardVariant
    headline?: string
    subtitle?: string
    interactive?: boolean
    as?: string
  }>(),
  {
    variant: 'elevated',
    interactive: false,
    as: 'section'
  }
)

const tag = computed(() => props.as)
</script>
