<template>
  <div
    class="md34-field md34-textarea"
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
    <div class="md34-field__control md34-textarea__control">
      <textarea
        :id="inputId"
        ref="textareaRef"
        class="md34-textarea__input"
        :value="modelValue ?? ''"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @change="emit('change', ($event.target as HTMLTextAreaElement).value)"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
      />
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
    modelValue?: string | null
    id?: string
    label?: string
    placeholder?: string
    rows?: number
    variant?: 'filled' | 'outlined'
    disabled?: boolean
    readonly?: boolean
    required?: boolean
    error?: string
    hint?: string
  }>(),
  {
    rows: 4,
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
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)
const fallbackId = `md34-textarea-${Math.random().toString(36).slice(2, 10)}`
const inputId = computed(() => props.id ?? fallbackId)
const supportingText = computed(() => props.error || props.hint || '')

defineExpose({
  focus: () => textareaRef.value?.focus(),
  select: () => textareaRef.value?.select()
})
</script>
