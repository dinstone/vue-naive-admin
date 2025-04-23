<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/05 21:24:32
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <div class="wh-full flex flex-col">
    <AppHeader class="h-60 flex-shrink-0" />

    <div class="flex flex-1">
      <aside
        class="flex-col flex-shrink-0 transition-width-300"
        :class="appStore.collapsed ? 'w-60' : 'w-180'"
        border-r="1px solid light_border dark:dark_border"
      >
        <SideBar />
      </aside>

      <slot class="flex-1" />
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '@/store'
import AppHeader from './header/index.vue'
import SideBar from './sidebar/index.vue'

const appStore = useAppStore()
</script>

<style>
.collapsed {
  width: 64px;
}
</style>
