<template>
  <div class="md34-bulk-actions" :class="selectedCount > 0 ? 'md34-bulk-actions--active' : ''">
    <div class="md34-bulk-actions__summary">
      <slot name="summary" :selected-count="selectedCount">
        {{ selectedCount }}
      </slot>
    </div>
    <div class="md34-bulk-actions__actions">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    selectedCount?: number
  }>(),
  {
    selectedCount: 0
  }
)
</script>
