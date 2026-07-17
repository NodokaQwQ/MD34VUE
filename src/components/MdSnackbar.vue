<template>
  <Teleport to="body">
    <Transition name="md34-snackbar">
      <div
        v-if="modelValue"
        class="md34-snackbar"
        :class="[`md34-snackbar--${placement}`]"
        role="status"
        aria-live="polite"
      >
        <div class="md34-snackbar__message">
          <slot>{{ message }}</slot>
        </div>
        <button
          v-if="actionLabel"
          class="md34-snackbar__action md34-state-layer md34-focus-ring"
          type="button"
          @click="emit('action')"
        >
          {{ actionLabel }}
        </button>
        <button
          v-if="closable"
          class="md34-snackbar__close md34-state-layer md34-focus-ring"
          type="button"
          :aria-label="closeLabel"
          @click="emit('update:modelValue', false)"
        >
          ×
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    message?: string
    actionLabel?: string
    closeLabel?: string
    closable?: boolean
    timeout?: number
    placement?: 'start' | 'center' | 'end'
  }>(),
  {
    closeLabel: 'Close',
    closable: false,
    timeout: 0,
    placement: 'center'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  action: []
}>()

let timer: number | undefined

watch(
  () => props.modelValue,
  (open) => {
    window.clearTimeout(timer)
    if (open && props.timeout > 0) {
      timer = window.setTimeout(() => emit('update:modelValue', false), props.timeout)
    }
  }
)
</script>
