/**********************************
 * @Author: Ronnie Zhang
 * @LastEditor: Ronnie Zhang
 * @LastEditTime: 2024/04/01 15:52:04
 * @Email: zclzone@outlook.com
 * Copyright © 2023 Ronnie Zhang(大脸怪) | https://isme.top
 **********************************/

import { request } from '@/utils'
import axios from 'axios'

const stockMap = new Map()
let stocks = [{ code: '00368', name: '比亚迪', market: 'A股' }, { code: '600000', name: '浦发银行', market: 'A股' }, { code: '72723', name: '浦发银行', market: 'H股' }]
stocks.forEach((item) => {
  stockMap.set(item.code, item)
})

const holding = { id: 12, profit: 1000, totalFee: 23, days: 15, count: 100, avgCost: 10, total: 1000, trades: [{ id: 1, type: 'buy', amount: 100, price: 10, sumary: 1000, fee: 23, timestamp: '2023-04-01 14:20:32' }] }

export default {
  getStcokTree: () => {
    return { data: [...stockMap.values()] }
  },
  getHolding: () => {
    return { data: holding }
  },
  getTrades: ({ holdingId }) => { return { data: holding.trades } },
  getComponents: () => axios.get(`${import.meta.env.VITE_PUBLIC_PATH}components.json`),
  addStock: data => stockMap.set(data.code, data),
  saveStock: data => stockMap.set(data.code, data),
  deletePermission: (code) => { stockMap.delete(code) },
}
