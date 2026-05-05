import { useCallback, useEffect, useRef, useState } from 'react'
import Vapi from '@vapi-ai/web'

interface UseVapiOptions {
  onCallStart?: () => void
  onCallEnd?: () => void
  onError?: (error: string) => void
}

export function useVapi(options: UseVapiOptions = {}) {
  const [isCallActive, setIsCallActive] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const vapiRef = useRef<InstanceType<typeof Vapi> | null>(null)
  const volumeIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    try {
      const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY
      if (!publicKey) {
        throw new Error('VAPI public key not configured')
      }

      vapiRef.current = new Vapi({
        publicKey,
      })

      // Listen to call events
      vapiRef.current.on('call-start', () => {
        setIsCallActive(true)
        setError(null)
        options.onCallStart?.()
      })

      vapiRef.current.on('call-end', () => {
        setIsCallActive(false)
        setVolumeLevel(0)
        options.onCallEnd?.()
        if (volumeIntervalRef.current) {
          clearInterval(volumeIntervalRef.current)
        }
      })

      vapiRef.current.on('error', (error: Error) => {
        const errorMessage = error.message || 'Call failed'
        setError(errorMessage)
        setIsCallActive(false)
        options.onError?.(errorMessage)
      })

      vapiRef.current.on('message', (message: any) => {
        if (message.type === 'volume-level') {
          setVolumeLevel(message.data)
        }
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize VAPI'
      setError(errorMessage)
      options.onError?.(errorMessage)
    }

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop()
      }
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current)
      }
    }
  }, [options])

  const startCall = useCallback(async () => {
    try {
      setError(null)
      if (!vapiRef.current) {
        throw new Error('VAPI not initialized')
      }

      await vapiRef.current.start({
        assistantId: process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY,
      })

      // Update volume level periodically
      volumeIntervalRef.current = setInterval(() => {
        if (vapiRef.current) {
          const volume = vapiRef.current.getVolume?.()
          if (volume !== undefined) {
            setVolumeLevel(volume)
          }
        }
      }, 100)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start call'
      setError(errorMessage)
      options.onError?.(errorMessage)
    }
  }, [options])

  const endCall = useCallback(async () => {
    try {
      if (vapiRef.current) {
        await vapiRef.current.stop()
      }
      if (volumeIntervalRef.current) {
        clearInterval(volumeIntervalRef.current)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to end call'
      setError(errorMessage)
    }
  }, [])

  const toggleMute = useCallback(async () => {
    try {
      if (vapiRef.current) {
        if (isMuted) {
          await vapiRef.current.unmute?.()
        } else {
          await vapiRef.current.mute?.()
        }
        setIsMuted(!isMuted)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to toggle mute'
      setError(errorMessage)
    }
  }, [isMuted])

  const resetError = useCallback(() => {
    setError(null)
  }, [])

  return {
    isCallActive,
    isMuted,
    volumeLevel,
    error,
    startCall,
    endCall,
    toggleMute,
    resetError,
  }
}
