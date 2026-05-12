"use client"

import { useRef, useState, useEffect } from "react"
import { Phone, PhoneOff } from "lucide-react"
import Vapi from "@vapi-ai/web"

interface Message {
  role: "user" | "assistant"
  text: string
  timestamp: Date
}

export function VapiCallButton() {
  const vapiRef = useRef<Vapi | null>(null)
  const [isCallActive, setIsCallActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Initialize Vapi on mount
  useEffect(() => {
    vapiRef.current = new Vapi("0f65379c-c211-4c50-9b6c-3cd705d1de34")

    // Handle call events
    vapiRef.current.on("call-start", () => {
      setIsCallActive(true)
      setIsLoading(false)
      setMessages([])
    })

    vapiRef.current.on("call-end", () => {
      setIsCallActive(false)
      setIsLoading(false)
    })

    // Handle transcription updates
    vapiRef.current.on("message", (message: any) => {
      if (message.type === "transcript" || message.type === "user-transcription") {
        setMessages((prev) => [
          ...prev,
          {
            role: "user",
            text: message.transcription,
            timestamp: new Date(),
          },
        ])
      } else if (message.type === "assistant-transcription") {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            text: message.transcription,
            timestamp: new Date(),
          },
        ])
      }
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
      await vapiRef.current.start("16640049-abcd-470c-9fa5-305314f2771f")
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
    <div className="w-full max-w-3xl mx-auto">
      {isCallActive ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-[600px]">
          {/* Header - Call Status */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-5 border-b border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Call in Progress</h3>
                <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                  <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                  Connected to AI Receptionist
                </p>
              </div>
              <button
                onClick={endCall}
                className="flex-shrink-0 w-12 h-12 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all shadow-md hover:shadow-lg"
                aria-label="End Call"
              >
                <PhoneOff className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Conversation Area - Fixed height to prevent scrolling issues */}
          <div className="flex-1 overflow-y-auto bg-white p-6">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center text-center">
                <div>
                  <p className="text-gray-500 mb-2">Listening...</p>
                  <p className="text-sm text-gray-400">Start speaking to begin the conversation</p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className={`text-xs mt-1 opacity-70`}>
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Info - Fixed at bottom */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 text-center text-xs text-gray-600">
            <p>Your conversation is being transcribed in real-time</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={startCall}
            disabled={isLoading}
            className="flex flex-col items-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition-all">
              {isLoading ? (
                <div className="h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Phone className="h-10 w-10 text-gray-700" />
              )}
            </div>
            <span className="text-lg font-semibold text-gray-900">
              {isLoading ? "Connecting..." : "Start call"}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
