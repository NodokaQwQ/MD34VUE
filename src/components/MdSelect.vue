<template>
  <div
    ref="rootRef"
    class="md34-field md34-select"
    :class="[
      variant === 'outlined' ? 'md34-field--outlined' : '',
      open ? 'md34-select--open' : '',
      error ? 'md34-field--error' : '',
      disabled ? 'md34-field--disabled' : ''
    ]"
  >
    <div v-if="label" class="md34-field__label-row">
      <label class="md34-field__label" :id="labelId">
        {{ label }}
        <span v-if="required" class="md34-field__required">*</span>
      </label>
    </div>

    <div class="md34-field__control">
      <button
        :id="buttonId"
        ref="buttonRef"
        class="md34-select__button"
        type="button"
        :disabled="disabled"
        :aria-labelledby="label ? `${labelId} ${buttonId}` : undefined"
        :aria-haspopup="'listbox'"
        :aria-expanded="open"
        @click="toggle"
        @keydown.down.prevent="openMenu(0)"
        @keydown.up.prevent="openMenu(options.length - 1)"
        @keydown.enter.prevent="toggle"
        @keydown.space.prevent="toggle"
      >
        <span class="md34-select__value" :class="!selectedOption ? 'md34-select__placeholder' : ''">
          <slot name="selected" :option="selectedOption">
            {{ selectedOption?.label ?? placeholder }}
          </slot>
        </span>
        <span class="md34-select__chevron" aria-hidden="true">⌄</span>
      </button>
    </div>

    <div v-if="open" class="md34-select__menu" role="listbox" :aria-labelledby="labelId" @keydown="onMenuKeydown">
      <template v-if="options.length">
        <div
          v-for="(option, index) in options"
          :key="`${String(option.value)}-${index}`"
          class="md34-select__option"
          :class="[
            index === activeIndex ? 'md34-select__option--active' : '',
            isSelected(option) ? 'md34-select__option--selected' : '',
            option.disabled ? 'md34-select__option--disabled' : ''
          ]"
          role="option"
          :aria-selected="isSelected(option)"
          :aria-disabled="option.disabled || undefined"
          @mouseenter="activeIndex = index"
          @click="selectOption(option)"
        >
          <slot name="option" :option="option" :selected="isSelected(option)">
            <span class="md34-select__option-label">{{ option.label }}</span>
            <span v-if="option.description" class="md34-select__option-description">
              {{ option.description }}
            </span>
          </slot>
        </div>
      </template>
      <div v-else class="md34-select__empty">{{ emptyText }}</div>
    </div>

    <div v-if="supportingText" class="md34-field__supporting-text">
      {{ supportingText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import type { MdSelectOption } from '@/types'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | boolean | null
    options: MdSelectOption[]
    id?: string
    label?: string
    placeholder?: string
    emptyText?: string
    variant?: 'filled' | 'outlined'
    disabled?: boolean
    required?: boolean
    error?: string
    hint?: string
  }>(),
  {
    placeholder: '请选择',
    emptyText: '暂无选项',
    variant: 'filled',
    disabled: false,
    required: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: MdSelectOption['value']]
  change: [value: MdSelectOption['value'], option: MdSelectOption]
}>()

const uid = Math.random().toString(36).slice(2, 10)
const buttonId = computed(() => props.id ?? `md34-select-${uid}`)
const labelId = computed(() => `${buttonId.value}-label`)
const rootRef = ref<HTMLElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const open = ref(false)
const activeIndex = ref(-1)

const selectedOption = computed(() => props.options.find((option) => option.value === props.modelValue) ?? null)
const supportingText = computed(() => props.error || props.hint || '')

function isSelected(option: MdSelectOption) {
  return option.value === props.modelValue
}

function toggle() {
  if (props.disabled) return
  if (open.value) {
    closeMenu()
  } else {
    openMenu(Math.max(0, props.options.findIndex(isSelected)))
  }
}

function openMenu(index: number) {
  if (props.disabled) return
  open.value = true
  activeIndex.value = normalizeIndex(index)
}

function closeMenu() {
  open.value = false
  activeIndex.value = -1
  buttonRef.value?.focus()
}

function normalizeIndex(index: number) {
  if (!props.options.length) return -1
  if (index < 0) return props.options.length - 1
  if (index >= props.options.length) return 0
  return index
}

function selectOption(option: MdSelectOption) {
  if (option.disabled) return
  emit('update:modelValue', option.value)
  emit('change', option.value, option)
  closeMenu()
}

function onMenuKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMenu()
    return
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault()
    activeIndex.value = normalizeIndex(activeIndex.value + 1)
    return
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    activeIndex.value = normalizeIndex(activeIndex.value - 1)
    return
  }

  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    const option = props.options[activeIndex.value]
    if (option) selectOption(option)
  }
}

function onDocumentClick(event: MouseEvent) {
  if (!rootRef.value?.contains(event.target as Node)) {
    open.value = false
  }
}

onMounted(() => document.addEventListener('mousedown', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('mousedown', onDocumentClick))
</script>
