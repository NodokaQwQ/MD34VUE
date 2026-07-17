<template>
  <Teleport to="body">
    <Transition name="md34-dialog">
      <div v-if="modelValue" class="md34-dialog-host" @keydown.esc="close">
        <div class="md34-dialog-scrim" @click="closeOnScrim && close()" />
        <section class="md34-dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId">
          <header v-if="title || $slots.header" class="md34-dialog__header">
            <slot name="header">
              <h2 :id="titleId" class="md34-dialog__title">{{ title }}</h2>
            </slot>
          </header>
          <div class="md34-dialog__content">
            <slot />
          </div>
          <footer v-if="$slots.actions" class="md34-dialog__actions">
            <slot name="actions" />
          </footer>
        </section>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    closeOnScrim?: boolean
  }>(),
  {
    closeOnScrim: true
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  close: []
}>()

const titleId = `md34-dialog-${Math.random().toString(36).slice(2, 10)}`

function close() {
  if (!props.modelValue) return
  emit('update:modelValue', false)
  emit('close')
}
</script>
