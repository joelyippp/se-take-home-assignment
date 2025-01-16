import Bot from './Bot.js'

export default class BotService {
  _botQueue = []

  constructor(orderService) {
    this._botId = 1
    this.orderService = orderService
  }

  get botQueue () {
    return this._botQueue.map(bot => {
      return {
        id: bot.id,
        isProcessing: bot.isProcessing()
      }
    })
  }

  getNextIdleBot() {
    return this._botQueue.find(bot => !bot.isProcessing()) || null
  }

  addBot() {
    this._botQueue.push(new Bot(this._botId))
    this._botId++
  }

  removeBot() {
    if (!this._botQueue.length) return
    const bot = this._botQueue.pop()
    bot.destroy()
  }

  assignJob(bot, pendingOrder) {
    console.log(`----- bot ${bot.id} picked up order ${pendingOrder.id} -----`)
    bot.setProcessingTrue()
    bot.processingOrder = pendingOrder
    bot.processingOrder.setStatusProcessing()
    /* simulate order processing */
    bot.processingJobInterval = setInterval(() => {
      if (bot.processingTimer === 10) {
        console.log(`----- bot ${bot.id} finished processing order ${pendingOrder.id} -----`)
        bot.reset()
        this.orderService.moveOrderToComplete(pendingOrder)
      }
      bot.processingTimer++
    }, 1000)
  }
}