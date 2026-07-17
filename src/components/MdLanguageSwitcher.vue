<template>
  <div ref="rootRef" class="md34-language-switcher">
    <button
      class="md34-language-switcher__trigger md34-state-layer md34-focus-ring"
      type="button"
      :disabled="disabled || switching"
      :aria-label="ariaLabel"
      :aria-expanded="open"
      aria-haspopup="menu"
      @click="toggle"
      @keydown.down.prevent="openMenu"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <span v-if="$slots.icon" class="md34-language-switcher__icon" aria-hidden="true">
        <slot name="icon" :locale="currentLocale" />
      </span>
      <span v-if="showFlag && currentLocale?.flag" class="md34-language-switcher__flag" aria-hidden="true">
        {{ currentLocale.flag }}
      </span>
      <span class="md34-language-switcher__label">
        {{ currentLocale?.shortLabel ?? currentLocale?.code?.toUpperCase() ?? fallbackLabel }}
      </span>
      <span class="md34-language-switcher__chevron" aria-hidden="true">⌄</span>
    </button>

    <Teleport to="body">
      <div
        v-if="open"
        ref="menuRef"
        class="md34-language-switcher__menu"
        role="menu"
        :style="menuStyle"
      >
        <button
          v-for="locale in locales"
          :key="locale.code"
          class="md34-language-switcher__item md34-state-layer"
          :class="locale.code === modelValue ? 'md34-language-switcher__item--active' : ''"
          type="button"
          role="menuitemradio"
          :aria-checked="locale.code === modelValue"
          :disabled="locale.disabled || disabled || switching"
          @click="selectLocale(locale)"
        >
          <span v-if="showFlag && locale.flag" class="md34-language-switcher__item-flag" aria-hidden="true">
            {{ locale.flag }}
          </span>
          <span class="md34-language-switcher__item-label">
            <span>{{ locale.label }}</span>
            <span v-if="locale.shortLabel" class="md34-language-switcher__item-code">
              {{ locale.shortLabel }}
            </span>
          </span>
          <span v-if="locale.code === modelValue" class="md34-language-switcher__check" aria-hidden="true">
            <slot name="checkIcon">✓</slot>
          </span>
        </button>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import type { MdLocaleOption } from '@/types'

const props = withDefaults(
  defineProps<{
    modelValue: string
    locales: MdLocaleOption[]
    ariaLabel?: string
    fallbackLabel?: string
    showFlag?: boolean
    disabled?: boolean
    switching?: boolean
  }>(),
  {
    ariaLabel: 'Switch language',
    fallbackLabel: 'Lang',
    showFlag: false,
    disabled: false,
    switching: false
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string, locale: MdLocaleOption]
}>()

const rootRef = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)
const open = ref(false)
const menuStyle = ref<Record<string, string>>({})

const currentLocale = computed(() => props.locales.find((locale) => locale.code === props.modelValue) ?? null)

function toggle() {
  if (props.disabled || props.switching) return
  if (open.value) {
    closeMenu()
  } else {
    openMenu()
  }
}

function openMenu() {
  if (props.disabled || props.switching) return
  open.value = true
  updateMenuPosition()
}

function closeMenu() {
  open.value = false
}

function selectLocale(locale: MdLocaleOption) {
  if (locale.disabled || props.disabled || props.switching) return
  emit('update:modelValue', locale.code)
  emit('change', locale.code, locale)
  closeMenu()
}

function updateMenuPosition() {
  nextTick(() => {
    if (!open.value || !rootRef.value) return
    const rect = rootRef.value.getBoundingClientRect()
    const gap = 8
    const menuWidth = Math.max(176, rect.width)
    const left = Math.min(Math.max(gap, rect.right - menuWidth), Math.max(gap, window.innerWidth - menuWidth - gap))
    const menuHeight = Math.min(menuRef.value?.scrollHeight ?? props.locales.length * 48 + 16, 320)
    const spaceBelow = window.innerHeight - rect.bottom - gap
    const spaceAbove = rect.top - gap
    const openUp = spaceBelow < Math.min(menuHeight, 160) && spaceAbove > spaceBelow
    const top = openUp ? Math.max(gap, rect.top - menuHeight - 6) : rect.bottom + 6

    menuStyle.value = {
      left: `${Math.round(left)}px`,
      top: `${Math.round(top)}px`,
      minWidth: `${Math.round(menuWidth)}px`,
      maxWidth: `calc(100vw - ${gap * 2}px)`,
      maxHeight: `${Math.round(Math.min(320, openUp ? spaceAbove - gap : spaceBelow - gap))}px`,
      transformOrigin: openUp ? 'bottom right' : 'top right'
    }
  })
}

function onDocumentClick(event: MouseEvent) {
  const target = event.target as Node
  if (!rootRef.value?.contains(target) && !menuRef.value?.contains(target)) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onDocumentClick)
  window.addEventListener('resize', updateMenuPosition)
  window.addEventListener('scroll', updateMenuPosition, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onDocumentClick)
  window.removeEventListener('resize', updateMenuPosition)
  window.removeEventListener('scroll', updateMenuPosition, true)
})
</script>
