# MD34VUE

Material Design 3 styled Vue components and CSS tokens for Oproxy frontends.

This repository is intended to be consumed as a library by the existing Oproxy Vue 3 frontend. It provides a small set of low-dependency components plus a CSS-variable theme layer that can be adopted page by page.

## Install

```bash
pnpm add md34vue
```

For local development against Oproxy, use a workspace link or package alias from the frontend project.

## Usage

```ts
import { createApp } from 'vue'
import Md34Vue from 'md34vue'
import 'md34vue/style.css'

createApp(App).use(Md34Vue).mount('#app')
```

Components are also available as named imports:

```vue
<script setup lang="ts">
import { MdButton, MdTextField } from 'md34vue'
</script>
```

## Components

- `MdAppShell`
- `MdBadge`
- `MdButton`
- `MdCard`
- `MdDataTable`
- `MdEmptyState`
- `MdIconButton`
- `MdSelect`
- `MdSwitch`
- `MdTextField`

## Theme

The default theme maps Oproxy's current cyan and magenta accent system into Material Design 3 color roles. Override CSS variables under `.md34-theme`, `.dark`, or `[data-theme="dark"]` to customize.

```css
:root {
  --md34-primary: #2297a6;
  --md34-secondary: #b9569a;
  --md34-background: #f8f9f9;
}
```

## Development

```bash
pnpm install
pnpm dev
pnpm build
```
