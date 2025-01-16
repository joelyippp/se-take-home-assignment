export default class Bot {
  _processing = false
  processingTimer = 1
  processingOrder = null
  processingJobInterval = null

  constructor(id) {
    console.log(`----- bot ${id} created -----`)
    this.id = id
  }

  isProcessing() {
    return this._processing ? true : false
  }

  setProcessingTrue() {
    this._processing = true
  }

  reset() {
    this.processingOrder.setStatusComplete()
    this.processingOrder = null
    this._processing = false
    this.processingTimer = 1
    clearInterval(this.processingJobInterval)
  }

  destroy() {
    if (this._processing) {
      this.processingOrder.setStatusPending()
      console.log(`----- bot ${this.id} to be removed is processing ${this.processingOrder.id} -----`)
    }
    this._processing = false
    clearInterval(this.processingJobInterval)
    console.log(`----- bot ${this.id} removed -----`)
  }
}