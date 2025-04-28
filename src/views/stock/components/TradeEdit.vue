<template>
  <MeModal ref="modalRef">
    <n-form
      ref="formRef"
      label-placement="left"
      require-mark-placement="left"
      :label-width="100"
      :model="formModel"
    >
      <n-grid :cols="24" :x-gap="24">
        <n-form-item-gi :span="12" label="类型" path="type">
          <n-select v-model:value="formModel.type" :options="typeOptions" />
        </n-form-item-gi>

        <n-form-item-gi :span="12" path="amount" :rule="numberRule">
          <template #label>
            数量
          </template>
          <n-input-number v-model:value="formModel.amount" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="price" :rule="numberRule">
          <template #label>
            价格
          </template>
          <n-input-number v-model:value="formModel.price" class="n-input n-input--resizable n-input--stateful" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" path="fee">
          <template #label>
            费用
          </template>
          <n-input-number v-model:value="formModel.fee" />
        </n-form-item-gi>
        <n-form-item-gi :span="12" label="时间" path="timestamp">
          <n-date-picker
            v-model:formatted-value="formModel.timestamp" value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime" clearable class="n-input n-input--resizable n-input--stateful"
          />
        </n-form-item-gi>
      </n-grid>
    </n-form>
  </MeModal>
</template>

<script setup>
import { MeModal } from '@/components'
import { useForm, useModal } from '@/composables'
import api from '../api'

const emit = defineEmits(['refresh'])

const typeOptions = computed(() => {
  return [{ label: '买入', value: 'buy' }, { label: '卖出', value: 'sell' }]
})

const numberRule = {
  required: true,
  type: 'number',
  message: '此为必填项',
  trigger: ['blur', 'change'],
}

const [formRef, formModel, validation] = useForm()
const [modalRef, okLoading] = useModal()

const modalAction = ref('')
function handleOpen(options = {}) {
  const { action, row = {}, ...rest } = options
  modalAction.value = action
  formModel.value = { ...row }
  modalRef.value.open({ ...rest, onOk: onSave })
}

async function onSave() {
  console.warn('modalForm.amount:', formModel.value.amount)

  await validation()

  okLoading.value = true
  try {
    if (modalAction.value === 'add') {
      if (!formModel.value.holdingId) {
        formModel.value.holdingId = api.addHolding(formModel.value)
      }

      await api.addTrade(formModel.value)
    }
    else if (modalAction.value === 'edit') {
      await api.saveTrade(formModel.value)
    }
    okLoading.value = false
    $message.success('保存成功')
    emit('refresh')
  }
  catch (error) {
    console.error(error)
    okLoading.value = false
    return false
  }
}

defineExpose({
  handleOpen,
})
</script>
