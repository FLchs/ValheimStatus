import { useState, useEffect, useRef, useCallback } from 'react'
import { ServerStatusSchema, type ServerStatus } from './types'

export interface LatencyDataPoint {
  timestamp: number
  latency: number | null
}

interface UsePingLatencyReturn {
  latencyData: LatencyDataPoint[]
  serverStatus: ServerStatus | null
  isLoading: boolean
  error: Error | null
}

const MAX_DATA_POINTS = 300
const PING_INTERVAL = 1000
const STATUS_REFRESH_INTERVAL = 5000

export const usePingLatency = (): UsePingLatencyReturn => {
  const [latencyData, setLatencyData] = useState<LatencyDataPoint[]>([])
  const [serverStatus, setServerStatus] = useState<ServerStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  
  const abortControllerRef = useRef<AbortController | null>(null)
  const pingIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const statusIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const measurePing = useCallback(async () => {
    const startTime = performance.now()
    const controller = new AbortController()
    abortControllerRef.current = controller
    const apiUrl = import.meta.env.VITE_API_URL
    // Use relative path for proxy in dev, full URL in production
    const url = apiUrl ? `${apiUrl}/status.json` : '/status.json'

    try {
      const response = await fetch(url, {
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const endTime = performance.now()
      const latency = Math.round(endTime - startTime)

      setLatencyData((prev) => {
        const newData = [...prev, { timestamp: Date.now(), latency }]
        if (newData.length > MAX_DATA_POINTS) {
          return newData.slice(newData.length - MAX_DATA_POINTS)
        }
        return newData
      })
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }

      setLatencyData((prev) => {
        const newData = [...prev, { timestamp: Date.now(), latency: null }]
        if (newData.length > MAX_DATA_POINTS) {
          return newData.slice(newData.length - MAX_DATA_POINTS)
        }
        return newData
      })
    }
  }, [])

  const fetchServerStatus = useCallback(async () => {
    const apiUrl = import.meta.env.VITE_API_URL
    // Use relative path for proxy in dev, full URL in production
    const url = apiUrl ? `${apiUrl}/status.json` : '/status.json'
    try {
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      const parsed = ServerStatusSchema.parse(data)
      setServerStatus(parsed)
      setIsLoading(false)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'))
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial fetch for both
    fetchServerStatus()
    measurePing()

    // Set up intervals
    pingIntervalRef.current = setInterval(measurePing, PING_INTERVAL)
    statusIntervalRef.current = setInterval(fetchServerStatus, STATUS_REFRESH_INTERVAL)

    return () => {
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current)
      }
      if (statusIntervalRef.current) {
        clearInterval(statusIntervalRef.current)
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchServerStatus, measurePing])

  return { latencyData, serverStatus, isLoading, error }
}
