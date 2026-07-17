<template>
  <div class="md34-table-toolbar">
    <div v-if="title || $slots.title || $slots.actions" class="md34-table-toolbar__header">
      <div v-if="title || $slots.title" class="md34-table-toolbar__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.actions" class="md34-table-toolbar__actions">
        <slot name="actions" />
      </div>
    </div>
    <div v-if="$slots.filters" class="md34-table-toolbar__filters">
      <slot name="filters" />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>
