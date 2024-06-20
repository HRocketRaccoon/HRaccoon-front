import { EventSourcePolyfill } from 'event-source-polyfill'
import { useAuthStore } from '@/stores/useAuthStore.js'
import { useSSEStore } from '@/stores/useSSEStore.js'

let eventSource = null

export const connectSSE = () => {
  const authStore = useAuthStore()
  const sseStore = useSSEStore()

  const userId = authStore.userId
  const accessToken = authStore.accessToken

  if (!userId) {
    console.error('[ERROR] connectSSE: User ID is not found.')
    return
  }

  if (eventSource) {
    console.log('[INFO] EventSource is already connected.')
    return
  }

  try {
    eventSource = new EventSourcePolyfill(`${import.meta.env.VITE_API_BASE_URL}/notification/connect`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      heartbeatTimeout: 86400000, //sse 연결 시간 (토큰 유지 24시간)
      withCredentials: true,
    })

    sseStore.setConnected(true)
  } catch (error) {
    console.error('[ERROR] connectSSE got error:', error)
    sseStore.setError(error)
    sseStore.setConnected(false)
  }

  eventSource.onopen = () => {
    console.log('[INFO] EventSource connection opened.')
  }

  eventSource.addEventListener('sse', event => {
    console.log('[SUCCESS] Event received:', event)

    if (event.data === 'EventStream Created. [userId = ' + userId + ']') {
      console.log('[INFO] Initial event stream message received')
      return
    }

    try {
      const parsedData = JSON.parse(event.data)
      console.log('::::::::::SSEResponse::::::::::', parsedData)

      sseStore.addNotification(parsedData)
    } catch (error) {
      console.error('[ERROR] Failed to parse event data:', error)
    }
  })

  eventSource.onerror = () => {
    console.error('[ERROR] EventSource failed. Reconnecting...')
    disconnectSSE()

    setTimeout(() => {
      connectSSE()
    }, 5000)
  }
}

export const disconnectSSE = () => {
  const sseStore = useSSEStore()

  if (eventSource) {
    eventSource.close()
    eventSource = null
    console.log('[INFO] EventSource is disconnected.')

    sseStore.setConnected(false)
  }
}
