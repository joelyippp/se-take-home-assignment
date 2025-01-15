export default class Queue {
  _watcherInterval = null

  constructor(orderService, botService) {
    this.orderService = orderService
    this.botService = botService
  }

  startWatcher () {
    if (!this._watcherInterval) {
      this._watcherInterval = setInterval(() => {
        const pendingOrder = this.orderService.getNextPendingOrder()
        const idleBot = this.botService.getNextIdleBot()
        if (idleBot && pendingOrder) {
          idleBot.processJob(pendingOrder)
        } else if (!idleBot) { 
          console.log('All bots busy')
        } else if (!pendingOrder) {
          console.log('All orders processed')
        }
      }, 100)
    }
  }

  stopWatcher() {
    if (this._watcherInterval) {
      clearInterval(this._watcherInterval)
      this._watcherInterval = null
    }
  }
}