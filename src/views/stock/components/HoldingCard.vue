<template>
  <n-flex vertical>
    <template v-if="currentStock">
      <div class="flex justify-between">
        <h3 class="mb-12">
          持仓情况
        </h3>
      </div>
      <n-descriptions label-placement="left" bordered :column="2">
        <n-descriptions-item label="股票">
          {{ currentStock.market }}  {{ currentStock.name }} ({{ currentStock.code }})
        </n-descriptions-item>
        <n-descriptions-item label="币种">
          {{ currentStock.money }}
        </n-descriptions-item>
        <n-descriptions-item label="持仓盈亏">
          {{ holding.profit ?? '--' }}
        </n-descriptions-item>
        <n-descriptions-item label="税费合计">
          {{ holding.totalFee ?? '--' }}
        </n-descriptions-item>
        <n-descriptions-item label="买均成本">
          {{ holding.avgCost }}
        </n-descriptions-item>
        <n-descriptions-item label="持仓数量">
          {{ holding.count }}
        </n-descriptions-item>
        <n-descriptions-item label="持仓市值">
          {{ holding.total }}
        </n-descriptions-item>
        <n-descriptions-item label="持股天数">
          {{ holding.days }}
        </n-descriptions-item>
      </n-descriptions>

      <div class="mt-32 flex justify-between">
        <h3 class="mb-12">
          交易记录
        </h3>
        <NButton size="small" type="primary" @click="handleAddBtn">
          <i class="i-fe:plus mr-4 text-14" />
          新增
        </NButton>
      </div>

      <n-data-table
        :remote="true"
        :loading="loading"
        :columns="tradeColumns"
        :data="tradeData"
        :pagination="false"
        :bordered="false"
      />
    </template>
    <n-empty v-else class="h-450 f-c-c" size="large" description="请选择股票查看持仓详情" />
    <TradeEdit ref="modalRef" @refresh="initHolding" />
  </n-flex>
</template>

<script setup>
import { NButton } from 'naive-ui'
import api from '../api.js'
import TradeEdit from './TradeEdit.vue'

const props = defineProps({
  currentStock: {
    type: Object,
    default: () => null,
  },
})

// const currentStock = ref(null)

const holding = ref({})
const tradeData = ref([])
const loading = ref(false)

const tradeColumns = [
  { title: '类型', key: 'type' },
  { title: '数量', key: 'amount' },
  { title: '价格', key: 'price' },
  { title: '金额', key: 'sumary' },
  { title: '费用', key: 'fee' },
  {
    title: '时间',
    key: 'timestamp',
  },
  {
    title: '操作',
    key: 'actions',
    width: 320,
    align: 'center',
    fixed: 'right',
    render(row) {
      return [
        h(
          NButton,
          {
            size: 'small',
            type: 'primary',
            style: 'margin-left: 12px;',
            onClick: () => handleEditBtn(row),
          },
          {
            default: () => '编辑',
            icon: () => h('i', { class: 'i-material-symbols:edit-outline text-14' }),
          },
        ),

        h(
          NButton,
          {
            size: 'small',
            type: 'error',
            style: 'margin-left: 12px;',
            onClick: () => handleDeleteBtn(row.id),
          },
          {
            default: () => '删除',
            icon: () => h('i', { class: 'i-material-symbols:delete-outline text-14' }),
          },
        ),
      ]
    },
  },
]
function initHolding() {
  loading.value = true
  try {
    // 查找持仓信息
    const res = api.getHolding(props.currentStock.code)
    if (res?.data) {
      holding.value = { ...res?.data }
      tradeData.value = res?.data?.trades || []
    }
    else {
      holding.value = {}
      tradeData.value = []
    }
    loading.value = false
  }
  catch (error) {
    console.error(error)
    loading.value = false
  }
}

watch(
  () => props.currentStock,
  async (v) => {
    await nextTick()

    if (v) {
      initHolding()
    }
  },
)

const modalRef = ref(null)
function handleAddBtn() {
  modalRef.value?.handleOpen({
    action: 'add',
    title: '新增交易',
    row: { stockCode: props.currentStock.code, holdingId: holding.value.id },
    okText: '保存',
  })
}

function handleEditBtn(row) {
  modalRef.value?.handleOpen({
    action: 'edit',
    title: '编辑交易',
    row: { stockCode: props.currentStock.code, ...row },
    okText: '保存',
  })
}

function handleDeleteBtn(id) {
  const d = $dialog.warning({
    content: '确定删除交易？',
    title: '提示',
    positiveText: '确定',
    negativeText: '取消',
    async onPositiveClick() {
      try {
        d.loading = true
        await api.deleteStock(id)
        $message.success('删除成功')
        // tradeRef.value.handleSearch()
        d.loading = false
      }
      catch (error) {
        console.error(error)
        d.loading = false
      }
    },
  })
}
</script>
