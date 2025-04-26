<template>
  <div>
    <n-space vertical :size="12">
      <div class="flex">
        <n-input v-model:value="pattern" placeholder="搜索(股票编码、名称)" clearable />
        <NButton class="ml-12" type="primary" @click="handleAdd()">
          <i class="i-material-symbols:add mr-4 text-14" />
          新增
        </NButton>
      </div>

      <n-tree
        :show-irrelevant-nodes="false"
        :pattern="pattern"
        :data="treeData"
        :selected-keys="[currentMenu?.code]"
        :render-prefix="renderPrefix"
        :render-label="renderLabel"
        :render-suffix="renderSuffix"
        :on-update:selected-keys="onSelect"
        :filter="searchFilter"
        key-field="code"
        label-field="name code"

        block-line default-expand-all
      />
    </n-space>

    <StockEditer ref="modalRef" :menus="treeData" @refresh="(data) => emit('refresh', data)" />
  </div>
</template>

<script setup>
import { NButton } from 'naive-ui'
import { withModifiers } from 'vue'
import api from '../api'
import StockEditer from './StockEdit.vue'

defineProps({
  treeData: {
    type: Array,
    default: () => [],
  },
  currentMenu: {
    type: Object,
    default: () => null,
  },
})
const emit = defineEmits(['refresh', 'update:currentMenu'])

const pattern = ref('')
function searchFilter(pattern, node) {
  if (!pattern) {
    return true
  }
  const name = node.name || ''
  const code = node.code || ''
  return name.toLowerCase().includes(pattern.toLowerCase()) || code.toLowerCase().includes(pattern.toLowerCase())
}

const modalRef = ref(null)
async function handleAdd(data = {}) {
  modalRef.value?.handleOpen({
    action: 'add',
    title: '新增股票',
    row: { type: 'MENU', ...data },
    okText: '保存',
  })
}

function handleEdit(item = {}) {
  modalRef.value?.handleOpen({
    action: 'edit',
    title: `编辑股票 - ${item.name}`,
    row: item,
    okText: '保存',
  })
}

function handleDelete(item) {
  $dialog.confirm({
    content: `确认删除【${item.name}】？`,
    async confirm() {
      try {
        $message.loading('正在删除', { key: 'deleteMenu' })
        await api.deletePermission(item.code)
        $message.success('删除成功', { key: 'deleteMenu' })
        emit('refresh')
        emit('update:currentMenu', null)
      }
      catch (error) {
        console.error(error)
        $message.destroy('deleteMenu')
      }
    },
  })
}

function onSelect(keys, option, { action, node }) {
  emit('update:currentMenu', action === 'select' ? node : null)
}

function renderPrefix({ option }) {
  return h('span', { style: 'color: red;' }, option.market)
}

function renderLabel({ option }) {
  return `${option.name}(${option.code})`
}

function renderSuffix({ option }) {
  return [
    h(
      NButton,
      {
        text: true,
        type: 'primary',
        title: '编辑股票',
        size: 'tiny',
        onClick: withModifiers(() => handleEdit(option), ['stop']),
      },
      { default: () => '编辑' },
    ),

    h(
      NButton,
      {
        text: true,
        type: 'error',
        title: '删除股票',
        size: 'tiny',
        style: 'margin-left: 12px;',
        onClick: withModifiers(() => handleDelete(option), ['stop']),
      },
      { default: () => '删除' },
    ),
  ]
}
</script>
