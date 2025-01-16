import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import Queue from './models/Queue.js'
import OrderService from './models/OrderService.js'
import BotService from './models/BotService.js'
import cors from 'cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app  = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const orderService = new OrderService()
const botService = new BotService(orderService)
const queue = new Queue(orderService, botService)

queue.startWatcher()

/* pre create mock orders */
const orders = [
  {
    item: 'Chicken McNuggets',
    priority: "normal"
  },
  {
    item: 'Big Mac',
    priority: "VIP"
  },
  {
    item: 'Ice Cream',
    priority: "VIP"
  },
  {
    item: 'Fries',
    priority: "VIP"
  }
]
// orders.forEach(order => {
//   orderService.createOrder(order)
// })

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/ping', (req, res) => {
  res.send('pong')
})

app.get('/orders', (req, res) => {
  res.json({
    pendingOrderQueue: orderService.pendingOrderQueue,
    completedOrderQueue: orderService.completedOrderQueue
  })
})

app.get('/bots', (req, res) => {
  res.send(botService.botQueue)
})

app.get('/add-bot', (req, res) => {
  botService.addBot()
  res.status(204).send('ok')
})

app.get('/remove-bot', (req, res) => {
  botService.removeBot()
  res.status(204).send('ok')
})

app.post('/add-order', (req, res) => {
  const order = req.body
  orderService.createOrder(order)
  res.status(200).send('ok')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
})