<template>
  <div class="md34-app-shell" :class="navItems?.length || $slots.rail ? 'md34-app-shell--with-rail' : ''">
    <header class="md34-app-shell__topbar">
      <div class="md34-app-shell__brand">
        <span v-if="logo || $slots.logo" class="md34-app-shell__logo">
          <slot name="logo">
            <img v-if="logo" :src="logo" alt="" />
          </slot>
        </span>
        <slot name="brand">
          <span>{{ title }}</span>
        </slot>
      </div>
      <div class="md34-app-shell__actions">
        <slot name="actions" />
      </div>
    </header>

    <aside v-if="navItems?.length || $slots.rail" class="md34-app-shell__rail">
      <slot name="rail">
        <nav class="md34-app-shell__nav" aria-label="主导航">
          <component
            :is="item.href ? 'a' : 'button'"
            v-for="item in navItems"
            :key="item.key"
            class="md34-app-shell__nav-item md34-state-layer md34-focus-ring"
            :class="item.key === activeKey ? 'md34-app-shell__nav-item--active' : ''"
            :href="item.href"
            :type="item.href ? undefined : 'button'"
            :disabled="!item.href && item.disabled ? true : undefined"
            :aria-disabled="item.href && item.disabled ? 'true' : undefined"
            :aria-current="item.key === activeKey ? 'page' : undefined"
            @click="emit('nav', item.key)"
          >
            <slot name="navIcon" :item="item" />
            <span>{{ item.label }}</span>
            <MdBadge v-if="item.badge !== undefined" variant="secondary">{{ item.badge }}</MdBadge>
          </component>
        </nav>
      </slot>
    </aside>

    <main class="md34-app-shell__main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import MdBadge from './MdBadge.vue'
import type { MdNavItem } from '@/types'

withDefaults(
  defineProps<{
    title?: string
    logo?: string
    navItems?: MdNavItem[]
    activeKey?: string
  }>(),
  {
    title: 'Oproxy'
  }
)

const emit = defineEmits<{
  nav: [key: string]
}>()
</script>
