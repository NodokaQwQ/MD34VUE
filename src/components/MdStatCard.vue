<template>
  <MdCard class="md34-stat-card" :variant="variant">
    <div class="md34-stat-card__body">
      <div class="md34-stat-card__main">
        <p class="md34-stat-card__label">{{ label }}</p>
        <p class="md34-stat-card__value">{{ value }}</p>
      </div>
      <div v-if="$slots.icon" class="md34-stat-card__icon">
        <slot name="icon" />
      </div>
    </div>
    <div v-if="supportingText || trend || $slots.supporting" class="md34-stat-card__supporting">
      <slot name="supporting">
        <span>{{ supportingText }}</span>
        <span v-if="trend" class="md34-stat-card__trend" :class="`md34-stat-card__trend--${trendTone}`">
          {{ trend }}
        </span>
      </slot>
    </div>
  </MdCard>
</template>

<script setup lang="ts">
import MdCard from './MdCard.vue'
import type { MdCardVariant } from '@/types'

withDefaults(
  defineProps<{
    label: string
    value: string | number
    supportingText?: string
    trend?: string
    trendTone?: 'positive' | 'negative' | 'neutral'
    variant?: MdCardVariant
  }>(),
  {
    trendTone: 'neutral',
    variant: 'filled'
  }
)
</script>
