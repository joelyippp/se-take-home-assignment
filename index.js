import express from 'express'
import Queue from './models/Queue.js'
import OrderService from './models/OrderService.js'
import BotService from './models/BotService.js'

const app  = express()
import cors from 'cors'
const orderService = new OrderService()
const botService = new BotService()
const queue = new Queue(orderService, botService)

queue.startWatcher()

orderService.createOrder('Chicken McNuggets', "normal")
orderService.createOrder('Big Mac', "VIP")
orderService.createOrder('Ice Cream', "VIP")
orderService.createOrder('Fries', "VIP")

botService.addBot()
botService.addBot()
botService.addBot()
botService.addBot()

setTimeout(() => {
  botService.removeBot()
}, 1000)


setTimeout(() => {
  botService.addBot()
}, 2000)

setTimeout(() => {
  orderService.createOrder('Chocolate Sundae', "normal")
}, 10000)

setTimeout(() => {
  botService.removeBot()
  botService.removeBot()
  botService.removeBot()
}, 2000)

setTimeout(() => {
  botService.addBot()
}, 3000)

setTimeout(() => {
  orderService.createOrder('Chocolate Sundae', "normal")
}, 20000)

// console.log(queue.orders)

app.use(cors());

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/orders', (req, res) => {
  res.send(orderService.ordersQueue)
})

app.get('/bots', (req, res) => {
  res.send(botService.botQueue)
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})