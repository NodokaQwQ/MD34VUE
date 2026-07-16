<template>
  <div
    class="md34-field"
    :class="[
      variant === 'outlined' ? 'md34-field--outlined' : '',
      error ? 'md34-field--error' : '',
      disabled ? 'md34-field--disabled' : ''
    ]"
  >
    <div v-if="label || $slots.labelEnd" class="md34-field__label-row">
      <label v-if="label" class="md34-field__label" :for="inputId">
        {{ label }}
        <span v-if="required" class="md34-field__required">*</span>
      </label>
      <slot name="labelEnd" />
    </div>

    <div class="md34-field__control">
      <span v-if="$slots.prefix" class="md34-field__prefix">
        <slot name="prefix" />
      </span>
      <input
        :id="inputId"
        ref="inputRef"
        class="md34-text-field__input"
        :type="type"
        :value="modelValue ?? ''"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        @input="onInput"
        @change="emit('change', ($event.target as HTMLInputElement).value)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @keyup.enter="emit('enter', $event)"
      />
      <span v-if="$slots.suffix" class="md34-field__suffix">
        <slot name="suffix" />
      </span>
    </div>

    <div v-if="supportingText" class="md34-field__supporting-text">
      {{ supportingText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    id?: string
    label?: string
    placeholder?: string
    type?: string
    variant?: 'filled' | 'outlined'
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    error?: string
    hint?: string
    autocomplete?: string
  }>(),
  {
    type: 'text',
    variant: 'filled',
    disabled: false,
    readonly: false,
    required: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
  enter: [event: KeyboardEvent]
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const fallbackId = `md34-field-${Math.random().toString(36).slice(2, 10)}`
const inputId = computed(() => props.id ?? fallbackId)
const supportingText = computed(() => props.error || props.hint || '')

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

defineExpose({
  focus: () => inputRef.value?.focus(),
  select: () => inputRef.value?.select()
})
</script>
