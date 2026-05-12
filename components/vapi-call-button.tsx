"use client"

import { useRef, useState, useEffect } from "react"
import { Phone, PhoneOff } from "lucide-react"
import Vapi from "@vapi-ai/web"

export function VapiCallButton() {
  const vapiRef = useRef<Vapi | null>(null)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Initialize Vapi on mount
  useEffect(() => {
    vapiRef.current = new Vapi("16640049-abcd-470c-9fa5-305314f2771f")

    // Handle call events
    vapiRef.current.on("call-start", () => {
      setIsCallActive(true)
      setIsLoading(false)
    })

    vapiRef.current.on("call-end", () => {
      setIsCallActive(false)
      setIsLoading(false)
    })

    vapiRef.current.on("error", (error) => {
      console.error("[v0] Vapi error:", error)
      setIsLoading(false)
      setIsCallActive(false)
    })

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop()
      }
    }
  }, [])

  async function startCall() {
    if (!vapiRef.current) return

    try {
      setIsLoading(true)
      await vapiRef.current.start("0f65379c-c211-4c50-9b6c-3cd705d1de34")
    } catch (error) {
      console.error("[v0] Failed to start call:", error)
      setIsLoading(false)
    }
  }

  function endCall() {
    if (vapiRef.current) {
      vapiRef.current.stop()
      setIsCallActive(false)
    }
  }

  return (
    <button
      onClick={isCallActive ? endCall : startCall}
      disabled={isLoading}
      className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
        isCallActive
          ? "bg-red-600 hover:bg-red-700 text-white"
          : "bg-blue-600 hover:bg-blue-700 text-white"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isCallActive ? (
        <>
          <PhoneOff className="h-5 w-5" />
          End Call
        </>
      ) : isLoading ? (
        <>
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Connecting...
        </>
      ) : (
        <>
          <Phone className="h-5 w-5" />
          Start Call
        </>
      )}
    </button>
  )
}
