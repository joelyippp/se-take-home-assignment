import Bot from './Bot.js'

export default class BotService {
  _botQueue = []

  constructor() {
    this._botId = 1
  }

  get botQueue () {
    return this._botQueue.map(bot => {
      return {
        id: bot.id,
        isProcessing: bot._processing
      }
    })
  }

  getNextIdleBot() {
    return this._botQueue.find(bot => !bot.processing) || null
  }

  addBot() {
    this._botQueue.push(new Bot(this._botId))
    this._botId++
  }

  removeBot() {
    const bot = this._botQueue.pop()
    bot.destroy()
    console.log(`removed bot ${bot.id}`)
  }
}