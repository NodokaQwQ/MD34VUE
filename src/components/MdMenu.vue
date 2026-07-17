<template>
  <div ref="rootRef" class="md34-menu-root">
    <button
      class="md34-menu-trigger md34-state-layer md34-focus-ring"
      type="button"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="open = !open"
      @keydown.down.prevent="open = true"
    >
      <slot name="trigger">{{ label }}</slot>
    </button>

    <div v-if="open" class="md34-menu" role="menu">
      <button
        v-for="item in items"
        :key="item.key"
        class="md34-menu__item md34-state-layer"
        :class="item.danger ? 'md34-menu__item--danger' : ''"
        type="button"
        role="menuitem"
        :disabled="item.disabled"
        @click="select(item)"
      >
        <slot name="item" :item="item">
          {{ item.label }}
        </slot>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import type { MdMenuItem } from '@/types'

withDefaults(
  defineProps<{
    label?: string
    items: MdMenuItem[]
  }>(),
  {
    label: 'Menu'
  }
)

const emit = defineEmits<{
  select: [item: MdMenuItem]
}>()

const rootRef = ref<HTMLElement | null>(null)
const open = ref(false)

function select(item: MdMenuItem) {
  if (item.disabled) return
  emit('select', item)
  open.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocumentClick))
</script>
