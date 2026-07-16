<template>
  <MdAppShell title="MD34VUE" :nav-items="navItems" active-key="dashboard">
    <template #actions>
      <MdSwitch v-model="darkMode" label="深色" @update:model-value="syncTheme" />
      <MdIconButton aria-label="刷新">↻</MdIconButton>
    </template>

    <div class="demo-page">
      <section class="demo-header">
        <div>
          <p class="demo-eyebrow">Oproxy Material Design 3 Library</p>
          <h1>给现有 Oproxy 前端用的 MD3 组件和主题层</h1>
          <p>
            组件只依赖 Vue，样式通过 CSS variables 暴露，便于按页面逐步替换当前 common
            组件。
          </p>
        </div>
        <div class="demo-header__actions">
          <MdButton>主要操作</MdButton>
          <MdButton variant="outlined">次要操作</MdButton>
        </div>
      </section>

      <section class="demo-grid">
        <MdCard headline="账号状态" subtitle="MD3 elevated card">
          <div class="demo-stack">
            <MdBadge variant="success">运行中</MdBadge>
            <MdBadge variant="warning">待同步</MdBadge>
            <MdBadge variant="danger">异常</MdBadge>
          </div>
          <template #actions>
            <MdButton variant="text">查看</MdButton>
          </template>
        </MdCard>

        <MdCard variant="outlined" headline="筛选条件" subtitle="常用表单控件">
          <div class="demo-form">
            <MdTextField v-model="keyword" label="关键词" placeholder="搜索用户、渠道或 key" />
            <MdSelect v-model="provider" label="服务商" :options="providerOptions" />
            <MdSwitch v-model="enabled" label="只看启用" />
          </div>
        </MdCard>
      </section>

      <MdDataTable :columns="columns" :rows="rows">
        <template #cell-status="{ value }">
          <MdBadge :variant="value === 'active' ? 'success' : 'neutral'">
            {{ value === 'active' ? '启用' : '停用' }}
          </MdBadge>
        </template>
      </MdDataTable>
    </div>
  </MdAppShell>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { MdDataTableColumn, MdNavItem, MdSelectOption } from '../src'

interface DemoRow {
  name: string
  provider: string
  status: string
  quota: string
}

const darkMode = ref(false)
const keyword = ref('')
const provider = ref('openai')
const enabled = ref(true)

const navItems: MdNavItem[] = [
  { key: 'dashboard', label: '概览' },
  { key: 'accounts', label: '账号', badge: 12 },
  { key: 'channels', label: '渠道' },
  { key: 'settings', label: '设置' }
]

const providerOptions: MdSelectOption[] = [
  { label: 'OpenAI', value: 'openai', description: '主力模型服务' },
  { label: 'Gemini', value: 'gemini' },
  { label: 'Claude', value: 'claude' }
]

const columns: MdDataTableColumn<DemoRow>[] = [
  { key: 'name', label: '名称', sortable: true },
  { key: 'provider', label: '服务商', sortable: true },
  { key: 'status', label: '状态' },
  { key: 'quota', label: '额度', align: 'right' }
]

const rows: DemoRow[] = [
  { name: 'default-key', provider: 'OpenAI', status: 'active', quota: '89%' },
  { name: 'gemini-pool', provider: 'Gemini', status: 'active', quota: '64%' },
  { name: 'fallback', provider: 'Claude', status: 'inactive', quota: '12%' }
]

function syncTheme(value: boolean) {
  document.documentElement.classList.toggle('dark', value)
}

onMounted(() => syncTheme(darkMode.value))
</script>

<style>
body {
  margin: 0;
}

.demo-page {
  display: grid;
  gap: 20px;
}

.demo-header {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 20px;
}

.demo-header h1 {
  max-width: 780px;
  margin: 0;
  color: var(--md34-on-background);
  font-size: clamp(1.75rem, 3vw, 2.75rem);
  line-height: 1.1;
}

.demo-header p {
  max-width: 680px;
  margin: 10px 0 0;
  color: var(--md34-on-surface-variant);
  line-height: 1.6;
}

.demo-eyebrow {
  margin: 0 0 8px !important;
  color: var(--md34-secondary) !important;
  font-size: 0.75rem;
  font-weight: 750;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.demo-header__actions,
.demo-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.demo-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.demo-form {
  display: grid;
  gap: 14px;
}

@media (max-width: 860px) {
  .demo-header,
  .demo-grid {
    grid-template-columns: 1fr;
  }

  .demo-header {
    display: grid;
  }
}
</style>
