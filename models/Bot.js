export default class Bot {
  _processing = false

  constructor(id) {
    console.log(`----- bot ${id} created -----`)
    this.id = id
    this.processingOrder = null
    this.processingTimer = 0
    this.processingJobInterval = null
  }

  get processing() {
    return this._processing
  }

  processJob (pendingOrder) {
    console.log(`----- bot ${this.id} picked up order ${pendingOrder.id} -----`)
    this._processing = true
    this.processingOrder = pendingOrder
    this.processingOrder.setStatusProcessing()
    /* simulate order processing */
    this.processingJobInterval = setInterval(() => {
      if (this.processingTimer === 3) {
        console.log(`----- bot ${this.id} finished processing order ${pendingOrder.id} -----`)
        this.processingOrder.setStatusComplete()
        this.processingOrder = null
        this._processing = false
        this.processingTimer = 0
        clearInterval(this.processingJobInterval)
      }
      this.processingTimer++
    }, 1000)
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     console.log(`----- bot ${this.id} finished processing order ${pendingOrder.id} -----`)
    //     this.processingOrder.setStatusComplete()
    //     this._processing = false
    //     resolve()
    //     // console.log(this.queue.orders)
    //   }, 3000)
    // })
  }

  destroy() {
    if (this._processing) {
      console.log(`----- bot ${this.id} processing ${this.processingOrder.id} removed -----`)
      this.processingOrder.setStatusPending()
    }
    this._processing = false
    clearInterval(this.processingJobInterval)
    console.log(`----- bot ${this.id} removed -----`)
  }
}