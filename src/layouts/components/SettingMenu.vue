<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/16 19:00:00
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <div class="f-c-c cursor-pointer rounded-4 p-6 text-22 transition-all-300">
    <n-dropdown
      :options="staticMenus"
      trigger="click"
      @select="handleMenuSelect"
    >
      <i class="i-fe:settings cursor-pointer text-20" />
    </n-dropdown>
  </div>

  <ThemeLayout ref="themeLayoutRef" />
</template>

<script setup>
import { ThemeLayout } from '@/layouts/components'
import { isExternal } from '@/utils'

// const roleSelectRef = ref(null)
const themeLayoutRef = ref(null)

const router = useRouter()

function handleMenuSelect(key, item) {
  if (isExternal(item.originPath)) {
    $dialog.confirm({
      type: 'info',
      title: '请选择打开方式',
      positiveText: '外链打开',
      negativeText: '在本站内嵌打开',
      confirm() {
        window.open(item.originPath)
      },
      cancel: () => {
        router.push(item.path)
      },
    })
  }
  else {
    if (key === 'theme') {
      themeLayoutRef.value.open()
      return
    }

    if (!item.path)
      return
    router.push(item.path)
  }
}

// 静态菜单数据
const staticMenus = [

  {
    label: '主题设置',
    key: 'theme',
    icon: () => h('i', { class: 'i-fe:layout text-14' }),
  },
  {
    label: '使用指南',
    key: 'surport',
    path: '/',
  },
  {
    label: '关于系统',
    key: 'about',
    path: '/',
  },
]
</script>

<style>
.side-menu:not(.n-menu--collapsed) {
  .n-menu-item-content {
    &::before {
      left: 8px;
      right: 8px;
    }
    &.n-menu-item-content--selected::before {
      border-left: 4px solid rgb(var(--primary-color));
    }
  }
}
</style>
