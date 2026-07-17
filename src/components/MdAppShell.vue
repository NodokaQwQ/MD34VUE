<template>
  <div
    class="md34-app-shell"
    :class="[
      navItems?.length || $slots.rail ? 'md34-app-shell--with-rail' : '',
      railMode === 'mini' ? 'md34-app-shell--mini-rail' : '',
      collapsed ? 'md34-app-shell--collapsed' : ''
    ]"
  >
    <header class="md34-app-shell__topbar md34-scope-chrome">
      <div class="md34-app-shell__brand">
        <button
          v-if="collapsible"
          class="md34-app-shell__collapse md34-state-layer md34-focus-ring"
          type="button"
          :aria-label="collapsed ? expandLabel : collapseLabel"
          :aria-pressed="collapsed"
          @click="emit('update:collapsed', !collapsed)"
        >
          <slot name="collapseIcon" :collapsed="collapsed">
            {{ collapsed ? '›' : '‹' }}
          </slot>
        </button>
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

    <aside v-if="navItems?.length || $slots.rail" class="md34-app-shell__rail md34-scope-chrome">
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
            <span class="md34-app-shell__nav-label">{{ item.label }}</span>
            <MdBadge v-if="item.badge !== undefined" class="md34-app-shell__nav-badge" variant="secondary">{{ item.badge }}</MdBadge>
          </component>
        </nav>
      </slot>
    </aside>

    <main class="md34-app-shell__main md34-scope-content">
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
    railMode?: 'standard' | 'mini'
    collapsed?: boolean
    collapsible?: boolean
    collapseLabel?: string
    expandLabel?: string
  }>(),
  {
    title: 'Oproxy',
    railMode: 'standard',
    collapsed: false,
    collapsible: false,
    collapseLabel: 'Collapse navigation',
    expandLabel: 'Expand navigation'
  }
)

const emit = defineEmits<{
  nav: [key: string]
  'update:collapsed': [value: boolean]
}>()
</script>
