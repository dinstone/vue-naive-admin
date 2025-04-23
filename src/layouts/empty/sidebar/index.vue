<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/05 21:24:09
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <div class="mt-10">
    <UserAvatar />
  </div>

  <SideMenu class="cus-scroll-y mt-4 h-0 flex-1" />

  <SettingMenu />

  <div class="f-c-c cursor-pointer rounded-4 p-6 text-22 transition-all-300">
    <n-tooltip trigger="hover" placement="left">
      <template #trigger>
        <i class="i-fe:github cursor-pointer" @click="handleLinkClick('https://github.com/zclzone/vue-naive-admin/tree/2.x')" />
      </template>
      源码工程
    </n-tooltip>
  </div>

  <MenuCollapse />
</template>

<script setup>
import { MenuCollapse, SettingMenu, SideMenu, UserAvatar } from '@/layouts/components'

function handleLinkClick(link) {
  window.open(link)
}
</script>
