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

  <MenuCollapse />
</template>

<script setup>
import { MenuCollapse, SettingMenu, SideMenu, UserAvatar } from '@/layouts/components'

function handleLinkClick(link) {
  window.open(link)
}
</script>
