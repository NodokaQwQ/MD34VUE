<template>
  <Teleport to="body">
    <Transition name="md34-sheet-fade">
      <div v-if="modelValue" class="md34-sheet-host" :class="`md34-sheet-host--${mode}`">
        <div v-if="mode === 'modal'" class="md34-sheet-scrim" @click="closeOnScrim && close()" />
        <aside
          class="md34-side-sheet"
          :class="[`md34-side-sheet--${side}`, `md34-side-sheet--${mode}`]"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="title ? titleId : undefined"
        >
          <header v-if="title || $slots.header" class="md34-side-sheet__header">
            <slot name="header">
              <h2 :id="titleId" class="md34-side-sheet__title">{{ title }}</h2>
              <button class="md34-side-sheet__close md34-state-layer md34-focus-ring" type="button" :aria-label="closeLabel" @click="close">
                ×
              </button>
            </slot>
          </header>
          <div class="md34-side-sheet__content">
            <slot />
          </div>
          <footer v-if="$slots.actions" class="md34-side-sheet__actions">
            <slot name="actions" />
          </footer>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import type { MdSheetMode, MdSheetSide } from '@/types'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    mode?: MdSheetMode
    side?: MdSheetSide
    closeLabel?: string
    closeOnScrim?: boolean
  }>(),
  {
    mode: 'modal',
    side: 'right',
    closeLabel: 'Close',
    closeOnScrim: true
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const titleId = `md34-sheet-${Math.random().toString(36).slice(2, 10)}`

function close() {
  emit('update:modelValue', false)
  emit('close')
}
</script>
