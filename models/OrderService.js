import Order from './Order.js'

export default class OrderService {
  pendingOrderQueue = []
  completedOrderQueue = []
  
  constructor() {
    this._orderId = 1
    // this.queue = queue
  }

  createOrder ({item, priority}) {
    const orderObj = {
      id: this.paddedOrderId(),
      item,
      priority,
      status: 'pending'
    }
    this.pushOrder(new Order(orderObj))
    this._orderId++
    console.log(`----- Order ${orderObj.id} created -----`)
  }

  pushOrder(order) {
    if (order.priority === 'VIP') {
      const vipOrders = this.pendingOrderQueue.filter(existingOrder => existingOrder.priority === 'VIP')
      if (!vipOrders.length) {
        this.pendingOrderQueue.unshift(order)
        return
      } else {
        this.pendingOrderQueue.splice(vipOrders.length, 0, order)
        return
      }
    }
    this.pendingOrderQueue.push(order)
    // this.queue.startWatcher()
  }

  checkNextPendingOrder() {
    if (this.pendingOrderQueue.length) return true
    return false
  }

  getNextPendingOrder() {
    return this.pendingOrderQueue.find(order => order.status === 'pending')
  }

  // getNextPendingOrder() {
  //   if (this.pendingOrderQueue.length) {
  //     return this.pendingOrderQueue.shift()
  //   }
  // }

  paddedOrderId() {
    return String(this._orderId). padStart(5, '0')
  }

  moveToSuccess(order) {
    const ind = this.pendingOrderQueue.findIndex(el => el.id === order.id)
    this.pendingOrderQueue.splice(ind, 1)
    this.completedOrderQueue.push(order)
  }

  throwtoPending(order) {
    this.pendingOrderQueue.push(order)
  }
}