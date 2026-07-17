<template>
  <header class="md34-page-header">
    <div class="md34-page-header__content">
      <p v-if="eyebrow" class="md34-page-header__eyebrow">{{ eyebrow }}</p>
      <h1 v-if="title" class="md34-page-header__title">{{ title }}</h1>
      <p v-if="description" class="md34-page-header__description">{{ description }}</p>
    </div>
    <div v-if="$slots.actions" class="md34-page-header__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<script setup lang="ts">
defineProps<{
  eyebrow?: string
  title?: string
  description?: string
}>()
</script>
