<template>
  <div ref="rootRef" class="md34-date-range">
    <button
      class="md34-date-range__trigger md34-state-layer md34-focus-ring"
      type="button"
      :aria-expanded="open"
      aria-haspopup="dialog"
      @click="open = !open"
    >
      <span class="md34-date-range__icon" aria-hidden="true">
        <slot name="leading">□</slot>
      </span>
      <span class="md34-date-range__label">{{ displayValue }}</span>
      <span aria-hidden="true">⌄</span>
    </button>

    <div v-if="open" class="md34-date-range__panel" role="dialog" :aria-label="panelLabel">
      <div v-if="presets.length" class="md34-date-range__presets">
        <button
          v-for="preset in presets"
          :key="preset.key"
          class="md34-date-range__preset md34-state-layer"
          :class="isPresetActive(preset) ? 'md34-date-range__preset--active' : ''"
          type="button"
          @click="selectPreset(preset)"
        >
          {{ preset.label }}
        </button>
      </div>
      <MdDivider v-if="presets.length" />
      <div class="md34-date-range__fields">
        <MdTextField v-model="localStart" :label="startLabel" type="date" />
        <MdTextField v-model="localEnd" :label="endLabel" type="date" />
      </div>
      <div class="md34-date-range__actions">
        <MdButton variant="text" @click="open = false">{{ cancelLabel }}</MdButton>
        <MdButton @click="apply">{{ applyLabel }}</MdButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import MdButton from './MdButton.vue'
import MdDivider from './MdDivider.vue'
import MdTextField from './MdTextField.vue'
import type { MdDatePreset } from '@/types'

const props = withDefaults(
  defineProps<{
    start: string
    end: string
    presets?: MdDatePreset[]
    placeholder?: string
    panelLabel?: string
    startLabel?: string
    endLabel?: string
    cancelLabel?: string
    applyLabel?: string
  }>(),
  {
    presets: () => [],
    placeholder: 'Select date range',
    panelLabel: 'Date range',
    startLabel: 'Start',
    endLabel: 'End',
    cancelLabel: 'Cancel',
    applyLabel: 'Apply'
  }
)

const emit = defineEmits<{
  'update:start': [value: string]
  'update:end': [value: string]
  change: [range: { start: string; end: string; preset: string | null }]
}>()

const rootRef = ref<HTMLElement | null>(null)
const open = ref(false)
const localStart = ref(props.start)
const localEnd = ref(props.end)

const displayValue = computed(() => {
  if (!props.start && !props.end) return props.placeholder
  return `${props.start || '...'} - ${props.end || '...'}`
})

watch(
  () => [props.start, props.end],
  ([start, end]) => {
    localStart.value = start
    localEnd.value = end
  }
)

function isPresetActive(preset: MdDatePreset) {
  return preset.start === localStart.value && preset.end === localEnd.value
}

function selectPreset(preset: MdDatePreset) {
  localStart.value = preset.start
  localEnd.value = preset.end
  apply(preset.key)
}

function apply(preset: string | null = null) {
  emit('update:start', localStart.value)
  emit('update:end', localEnd.value)
  emit('change', { start: localStart.value, end: localEnd.value, preset })
  open.value = false
}

function onDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) open.value = false
}

onMounted(() => document.addEventListener('mousedown', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocumentClick))
</script>
