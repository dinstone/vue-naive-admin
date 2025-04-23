<!--------------------------------
 - @Author: Ronnie Zhang
 - @LastEditor: Ronnie Zhang
 - @LastEditTime: 2023/12/16 18:49:53
 - @Email: zclzone@outlook.com
 - Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 --------------------------------->

<template>
  <MeModal ref="modalRef" title="主题设置" :show-footer="false" width="600px">
    <n-space vertical>
      <n-card title="颜色">
        <n-space justify="space-between">
          <n-color-picker
            id="theme-color"
            class="h-24 w-24"
            :value="appStore.primaryColor"
            :swatches="primaryColors"
            :on-update:value="(v) => appStore.setPrimaryColor(v)"
            :render-label="() => ''"
          />

          <ThemeToggle />
        </n-space>
      </n-card>
      <n-card title="布局">
        <n-space justify="space-between">
          <div class="flex-col cursor-pointer justify-center" @click="appStore.setLayout('simple')">
            <div class="flex">
              <n-skeleton :width="20" :height="60" />
              <div class="ml-4">
                <n-skeleton :width="80" :height="60" />
              </div>
            </div>
            <n-button
              class="mt-12"
              size="small"
              :type="appStore.layout === 'simple' ? 'primary' : ''"
              ghost
            >
              简约
            </n-button>
          </div>
          <div class="flex-col cursor-pointer justify-center" @click="appStore.setLayout('normal')">
            <div class="flex">
              <n-skeleton :width="20" :height="60" />
              <div class="ml-4">
                <n-skeleton :width="80" :height="10" />
                <n-skeleton class="mt-4" :width="80" :height="46" />
              </div>
            </div>
            <n-button
              class="mt-12"
              size="small"
              :type="appStore.layout === 'normal' ? 'primary' : ''"
              ghost
            >
              通用
            </n-button>
          </div>

          <div class="flex-col cursor-pointer justify-center" @click="appStore.setLayout('full')">
            <div class="flex">
              <n-skeleton :width="20" :height="60" />
              <div class="ml-4">
                <n-skeleton :width="80" :height="6" />
                <n-skeleton class="mt-4" :width="80" :height="4" />
                <n-skeleton class="mt-4" :width="80" :height="42" />
              </div>
            </div>
            <n-button
              class="mt-12"
              size="small"
              :type="appStore.layout === 'full' ? 'primary' : ''"
              ghost
            >
              全面
            </n-button>
          </div>
          <div class="flex-col cursor-pointer justify-center" @click="appStore.setLayout('empty')">
            <div class="flex flex-col">
              <div class="mb-4">
                <n-skeleton :width="100" :height="10" />
              </div>
              <div class="flex">
                <n-skeleton :width="16" :height="46" />
                <div class="ml-4">
                  <n-skeleton :width="80" :height="46" />
                </div>
              </div>
            </div>
            <n-button
              class="mt-12"
              size="small"
              :type="appStore.layout === 'empty' ? 'primary' : ''"
              ghost
            >
              传统
            </n-button>
          </div>
        </n-space>
        <p class="mt-16 opacity-50">
          注: 此设置仅对未设置layout或者设置成跟随系统的页面有效，菜单设置的layout优先级最高
        </p>
      </n-card>
    </n-space>

  </MeModal>
</template>

<script setup>
import { MeModal, ThemeToggle } from '@/components'
import { useModal } from '@/composables'
import { useAppStore } from '@/store'
import { getPresetColors } from '@arco-design/color'

const appStore = useAppStore()
const [modalRef] = useModal()

const primaryColors = Object.entries(getPresetColors()).map(([, value]) => value.primary)

function open() {
  modalRef.value?.open()
}

defineExpose({
  open,
})
</script>
