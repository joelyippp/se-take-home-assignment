export default class Queue {
  _watcherInterval = null

  constructor(orderService, botService) {
    this.orderService = orderService
    this.botService = botService
  }

  /* 
    Interval watcher to keep checking if there's a free bot and a pending order 
    and assign the order to the free bot if exists.
  */
  startWatcher () {
    if (!this._watcherInterval) {
      this._watcherInterval = setInterval(async () => {
        const pendingOrder = this.orderService.getNextPendingOrder()
        const idleBot = this.botService.getNextIdleBot()
        if (idleBot && pendingOrder) {
          this.botService.assignJob(idleBot, pendingOrder)
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