import { defineStore } from 'pinia'

export type NotificationItem = {
  id: number
  type: 'success' | 'warning' | 'error' | 'info'
  lines: [string, string] | [string]
  dismissable?: boolean
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    queue: [] as NotificationItem[],
    lastId: 0,
  }),
  getters: {
    next: (state) => state.queue.at(0),
  },
  actions: {
    dequeue(id: number) {
      this.queue.splice(
        this.queue.findIndex((item) => item.id === id),
        1
      )
    },
    enqueue(item: Omit<NotificationItem, 'id'>) {
      this.queue.push({ ...item, id: this.lastId + 1 })
      this.lastId = this.lastId + 1
    },
  },
})
