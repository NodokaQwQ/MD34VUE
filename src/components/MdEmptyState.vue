<template>
  <div class="md34-empty-state">
    <div class="md34-empty-state__inner">
      <div v-if="$slots.icon" class="md34-empty-state__icon">
        <slot name="icon" />
      </div>
      <h3 v-if="title" class="md34-empty-state__title">{{ title }}</h3>
      <p v-if="description" class="md34-empty-state__description">{{ description }}</p>
      <div v-if="$slots.actions" class="md34-empty-state__actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>
