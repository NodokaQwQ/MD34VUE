<template>
  <div class="md34-list" :class="density === 'compact' ? 'md34-list--compact' : ''" role="list">
    <component
      :is="item.href ? 'a' : 'button'"
      v-for="item in items"
      :key="item.key"
      class="md34-list-item md34-state-layer md34-focus-ring"
      :class="[item.selected ? 'md34-list-item--selected' : '', item.disabled ? 'md34-list-item--disabled' : '']"
      role="listitem"
      :href="item.href"
      :type="item.href ? undefined : 'button'"
      :disabled="!item.href && item.disabled ? true : undefined"
      :aria-disabled="item.href && item.disabled ? 'true' : undefined"
      @click="onSelect(item, $event)"
    >
      <span v-if="$slots.leading" class="md34-list-item__leading">
        <slot name="leading" :item="item" />
      </span>
      <span class="md34-list-item__content">
        <span v-if="item.overline" class="md34-list-item__overline">{{ item.overline }}</span>
        <span class="md34-list-item__headline">{{ item.headline }}</span>
        <span v-if="item.supportingText" class="md34-list-item__supporting">{{ item.supportingText }}</span>
      </span>
      <span v-if="$slots.trailing || item.badge !== undefined" class="md34-list-item__trailing">
        <slot name="trailing" :item="item">
          <MdBadge v-if="item.badge !== undefined" variant="secondary">{{ item.badge }}</MdBadge>
        </slot>
      </span>
    </component>
  </div>
</template>

<script setup lang="ts">
import MdBadge from './MdBadge.vue'
import type { MdDensity, MdListItem } from '@/types'

withDefaults(
  defineProps<{
    items: MdListItem[]
    density?: MdDensity
  }>(),
  {
    density: 'comfortable'
  }
)

const emit = defineEmits<{
  select: [item: MdListItem]
}>()

function onSelect(item: MdListItem, event: MouseEvent) {
  if (item.disabled) {
    event.preventDefault()
    return
  }
  emit('select', item)
}
</script>
