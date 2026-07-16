<template>
  <component
    :is="tag"
    :class="classes"
    :type="tag === 'button' ? type : undefined"
    :href="href"
    :disabled="tag === 'button' ? disabled || loading : undefined"
    :aria-disabled="tag !== 'button' && (disabled || loading) ? 'true' : undefined"
  >
    <span v-if="loading" aria-hidden="true">...</span>
    <span v-if="$slots.leading" class="md34-button__leading">
      <slot name="leading" />
    </span>
    <span class="md34-button__label">
      <slot />
    </span>
    <span v-if="$slots.trailing" class="md34-button__trailing">
      <slot name="trailing" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MdButtonVariant, MdSize } from '@/types'

const props = withDefaults(
  defineProps<{
    variant?: MdButtonVariant
    size?: MdSize
    type?: 'button' | 'submit' | 'reset'
    href?: string
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
  }>(),
  {
    variant: 'filled',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    fullWidth: false
  }
)

const tag = computed(() => (props.href ? 'a' : 'button'))

const classes = computed(() => [
  'md34-button',
  'md34-state-layer',
  'md34-focus-ring',
  `md34-button--${props.variant}`,
  props.size !== 'md' ? `md34-button--${props.size}` : '',
  props.fullWidth ? 'md34-button--full-width' : ''
])
</script>
