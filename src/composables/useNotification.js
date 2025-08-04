// composables/useNotification.js
import { ref } from 'vue'

const notifications = ref([])
let notificationId = 0

export function useNotification() {
  const showNotification = (message, type = 'info', duration = 5000) => {
    const id = ++notificationId
    const notification = {
      id,
      message,
      type,
      visible: true,
    }

    notifications.value.push(notification)

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id)
    }, duration)

    return id
  }

  const removeNotification = id => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const showSuccess = (message, duration = 5000) => {
    return showNotification(message, 'success', duration)
  }

  const showError = (message, duration = 7000) => {
    return showNotification(message, 'error', duration)
  }

  const showInfo = (message, duration = 5000) => {
    return showNotification(message, 'info', duration)
  }

  const showWarning = (message, duration = 6000) => {
    return showNotification(message, 'warning', duration)
  }

  return {
    notifications,
    showNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeNotification,
  }
}
