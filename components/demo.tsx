"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Phone, PhoneOff, Mic, MicOff, Volume2, AlertCircle } from "lucide-react"

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY || ""
const ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID || ""

type CallStatus = "idle" | "loading-sdk" | "connecting" | "active" | "error"

export function Demo() {
  const [callStatus, setCallStatus] = useState<CallStatus>("idle")
  const [isMuted, setIsMuted] = useState(false)
  const [volumeLevel, setVolumeLevel] = useState(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const vapiRef = useRef<unknown>(null)

  const startCall = useCallback(async () => {
    setCallStatus("loading-sdk")
    setErrorMessage(null)

    try {
      if (!VAPI_PUBLIC_KEY) {
        throw new Error("VAPI public key not configured")
      }
      
      const VapiModule = await import("@vapi-ai/web")
      const Vapi = VapiModule.default

      const vapiInstance = new Vapi(VAPI_PUBLIC_KEY)
      vapiRef.current = vapiInstance

      vapiInstance.on("call-start", () => {
        setCallStatus("active")
      })

      vapiInstance.on("call-end", () => {
        setCallStatus("idle")
        setVolumeLevel(0)
        vapiRef.current = null
      })

      vapiInstance.on("volume-level", (level: number) => {
        setVolumeLevel(level)
      })

      vapiInstance.on("error", (error: { error?: { message?: string } }) => {
        console.error("[v0] Vapi error:", error)
        const message = error?.error?.message || "Failed to connect to AI receptionist"
        setErrorMessage(message)
        setCallStatus("error")
        vapiRef.current = null
      })

      setCallStatus("connecting")
      await vapiInstance.start(ASSISTANT_ID)
    } catch (error) {
      console.error("[v0] Failed to start call:", error)
      const errorMsg = error instanceof Error ? error.message : "Failed to initialize Vapi SDK"
      setErrorMessage(errorMsg)
      setCallStatus("error")
    }
  }, [])

  const endCall = useCallback(() => {
    if (vapiRef.current && typeof (vapiRef.current as { stop?: () => void }).stop === "function") {
      (vapiRef.current as { stop: () => void }).stop()
    }
    setCallStatus("idle")
    setVolumeLevel(0)
    vapiRef.current = null
  }, [])

  const toggleMute = useCallback(() => {
    if (vapiRef.current && typeof (vapiRef.current as { setMuted?: (muted: boolean) => void }).setMuted === "function") {
      const newMutedState = !isMuted
      ;(vapiRef.current as { setMuted: (muted: boolean) => void }).setMuted(newMutedState)
      setIsMuted(newMutedState)
    }
  }, [isMuted])

  const resetError = useCallback(() => {
    setCallStatus("idle")
    setErrorMessage(null)
  }, [])

  const isLoading = callStatus === "loading-sdk" || callStatus === "connecting"
  const isActive = callStatus === "active"
  const hasError = callStatus === "error"

  return (
    <section id="demo" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              What is the demo exactly?
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              Try calling ReAI directly from your browser and experience how it handles restaurant calls. Talk to the AI receptionist and see the difference.
            </p>
          </div>

          <div className="relative p-8 md:p-12 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center text-center">
              {/* Volume indicator */}
              {isActive && (
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
                  <Volume2 className="h-4 w-4" />
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-100 rounded-full"
                      style={{ width: `${Math.min(volumeLevel * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Error message */}
              {hasError && errorMessage && (
                <div className="flex items-start gap-3 p-4 mb-6 rounded-lg bg-red-50 border border-red-200 text-left max-w-md">
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-red-900">Failed to start demo</p>
                    <p className="text-sm text-red-700 mt-1">{errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Call button */}
              <div className="relative mb-8">
                {isActive && (
                  <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" />
                )}
                <Button
                  size="lg"
                  className={`h-24 w-24 rounded-full text-lg transition-all ${
                    isActive 
                      ? "bg-red-600 hover:bg-red-700 text-white" 
                      : hasError
                        ? "bg-gray-300 hover:bg-gray-400 text-gray-900"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                  onClick={hasError ? resetError : (isActive ? endCall : startCall)}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="h-8 w-8 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isActive ? (
                    <PhoneOff className="h-10 w-10" />
                  ) : hasError ? (
                    <AlertCircle className="h-10 w-10" />
                  ) : (
                    <Phone className="h-10 w-10" />
                  )}
                </Button>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
                {isLoading 
                  ? "Connecting..." 
                  : isActive 
                    ? "Call in progress" 
                    : hasError
                      ? "Try again"
                      : "Try AI receptionist live"
                }
              </h3>
              
              <p className="text-gray-600 max-w-lg mb-8 leading-relaxed">
                {isActive 
                  ? "Speak with our AI receptionist — try booking a table, asking about hours, or anything else. Click to end the call."
                  : hasError
                    ? "Click to reset and try again, or contact us for a live demo."
                    : "Click the button above and talk to our AI receptionist. Try booking a table, asking about hours, or dietary restrictions."
                }
              </p>

              {/* Mute button */}
              {isActive && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={toggleMute}
                  className="gap-2 border-2 border-gray-300 text-gray-900 hover:bg-gray-50"
                >
                  {isMuted ? (
                    <>
                      <MicOff className="h-5 w-5" />
                      Unmute
                    </>
                  ) : (
                    <>
                      <Mic className="h-5 w-5" />
                      Mute
                    </>
                  )}
                </Button>
              )}

              {!isActive && !isLoading && !hasError && (
                <p className="text-sm text-gray-500">
                  Demo is free and no commitment required. You'll need a microphone.
                </p>
              )}
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-gray-200 text-center hover:shadow-sm transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-3">1</div>
              <h4 className="font-semibold mb-2 text-gray-900">Click the button</h4>
              <p className="text-sm text-gray-600">Demo call starts directly in your browser.</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-gray-200 text-center hover:shadow-sm transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-3">2</div>
              <h4 className="font-semibold mb-2 text-gray-900">Talk to AI</h4>
              <p className="text-sm text-gray-600">Try booking a table or ask anything.</p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-gray-200 text-center hover:shadow-sm transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-3">3</div>
              <h4 className="font-semibold mb-2 text-gray-900">See for yourself</h4>
              <p className="text-sm text-gray-600">Experience how naturally AI communicates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
