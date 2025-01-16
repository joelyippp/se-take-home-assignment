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