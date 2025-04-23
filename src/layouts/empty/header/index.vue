<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/16 18:52:48
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <AppCard class="flex items-center px-12" border-b="1px solid light_border dark:dark_border">

    <HeaderLogo border-b="1px solid light_border dark:dark_border" />

    <AppTab class="w-0 flex-1 px-12" />

    <span class="opacity-1">|</span>

  </AppCard>
</template>

<script setup>
import { AppTab, HeaderLogo } from '@/layouts/components'
</script>
