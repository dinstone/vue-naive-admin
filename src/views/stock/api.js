const stockMap = new Map()
let stocks = [{ code: '00368', name: '比亚迪', market: 'A股' }, { code: '600000', name: '浦发银行', market: 'A股' }, { code: '72723', name: '浦发银行', market: 'H股' }]
stocks.forEach((item) => {
  stockMap.set(item.code, item)
})

const holding = { id: 12, profit: 1000, totalFee: 23, days: 15, count: 100, avgCost: 10, total: 1000, trades: [{ id: 1, hid: 12, type: 'buy', amount: 100, price: 10, sumary: 1000, fee: 23, timestamp: '2023-04-01 14:20:32' }, { id: 2, hid: 12, type: 'sell', amount: 100, price: 10, sumary: 1000, fee: 23, timestamp: '2023-04-01 14:20:32' }, { id: 3, hid: 12, type: 'buy', amount: 100, price: 10, sumary: 1000, fee: 23, timestamp: '2023-04-01 14:20:32' }, { id: 4, hid: 12, type: 'sell', amount: 100, price: 10, sumary: 1000, fee: 23, timestamp: '2023-04-01 14:20:32' }, { id: 5, hid: 12, type: 'buy', amount: 100, price: 10, sumary: 1000, fee: 23, timestamp: '2023-04-01 14:20:32' }, { id: 6, hid: 12, type: 'sell', amount: 100, price: 10, sumary: 1000, fee: 23, timestamp: '2023-01-09 14:20:32' }, { id: 7, hid: 12, type: 'sell', amount: 100, price: 10, sumary: 1000, fee: 23, timestamp: '2023-01-09 14:20:32' }, { id: 8, hid: 12, type: 'buy', amount: 100, price: 10, sumary: 1000, fee: 23, timestamp: '2023-09-01 14:20:32' },
] }

export default {
  getStcoks: () => {
    return { data: [...stockMap.values()] }
  },
  addStock: data => stockMap.set(data.code, data),
  saveStock: data => stockMap.set(data.code, data),
  deleteStock: (code) => { stockMap.delete(code) },
  getHolding: (stockCode) => {
    if (stockCode === '00368') {
      return { data: holding }
    }
    return { data: null }
  },
  addHolding: (data) => {
    return 12
  },
  getTrades: ({ holdingId }) => {
    if (holdingId === 12) {
      return { data: holding.trades }
    }
    return { data: [] }
  },
  addTrade: (data) => {
    return 1
  },
  saveTrade: (data) => {
    return 1
  },
}
