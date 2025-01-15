import Order from './Order.js'

export default class OrderService {
  orderQueue = []

  constructor() {
    this._orderId = 1
  }

  get ordersQueue () {
    return this.orderQueue
  }

  createOrder (item, priority) {
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
      const vipOrders = this.orderQueue.filter(existingOrder => existingOrder.priority === 'VIP')
      if (!vipOrders.length) {
        this.orderQueue.unshift(order)
        return
      } else {
        this.orderQueue.splice(vipOrders.length, 0, order)
        return
      }
    }
    this.orderQueue.push(order)
  }

  getNextPendingOrder() {
    return this.orderQueue.find(order => order.status === 'pending')
  }

  paddedOrderId() {
    return String(this._orderId). padStart(5, '0')
  }
}