<template>
  <component
    :is="tag"
    class="md34-chip md34-state-layer md34-focus-ring"
    :class="[
      `md34-chip--${kind}`,
      selected ? 'md34-chip--selected' : '',
      elevated ? 'md34-chip--elevated' : ''
    ]"
    :type="tag === 'button' ? 'button' : undefined"
    :href="href"
    :disabled="tag === 'button' ? disabled : undefined"
    :aria-disabled="tag !== 'button' && disabled ? 'true' : undefined"
    :aria-pressed="kind === 'filter' ? selected : undefined"
    @click="onClick"
  >
    <span v-if="$slots.leading || selected" class="md34-chip__leading" aria-hidden="true">
      <slot name="leading">
        <span v-if="selected">✓</span>
      </slot>
    </span>
    <span class="md34-chip__label">
      <slot>{{ label }}</slot>
    </span>
    <button
      v-if="removable"
      class="md34-chip__remove"
      type="button"
      :aria-label="removeLabel"
      @click.stop="emit('remove')"
    >
      ×
    </button>
    <span v-else-if="$slots.trailing" class="md34-chip__trailing" aria-hidden="true">
      <slot name="trailing" />
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { MdChipKind } from '@/types'

const props = withDefaults(
  defineProps<{
    label?: string
    kind?: MdChipKind
    selected?: boolean
    elevated?: boolean
    disabled?: boolean
    removable?: boolean
    removeLabel?: string
    href?: string
  }>(),
  {
    kind: 'assist',
    selected: false,
    elevated: false,
    disabled: false,
    removable: false,
    removeLabel: 'Remove'
  }
)

const emit = defineEmits<{
  click: [event: MouseEvent]
  remove: []
  'update:selected': [value: boolean]
}>()

const tag = computed(() => (props.href ? 'a' : 'button'))

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  if (props.kind === 'filter') emit('update:selected', !props.selected)
  emit('click', event)
}
</script>
