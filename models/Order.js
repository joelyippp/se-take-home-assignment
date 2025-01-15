export default class Order {
  constructor({ id, item, priority, status }) {
    this.id = id
    this.item = item
    this.priority = priority
    this.status = status
  }

  setStatusPending() {
    this.status = 'pending'
  }

  setStatusProcessing() {
    this.status = 'processing'
  }

  setStatusComplete() {
    this.status = 'complete'
  }
}