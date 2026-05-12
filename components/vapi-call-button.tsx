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
    <div className="w-full max-w-2xl">
      {isCallActive ? (
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header - Call Status */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 px-6 py-4 border-b border-green-200">
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
                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all"
              >
                <PhoneOff className="h-5 w-5" />
                End Call
              </button>
            </div>
          </div>

          {/* Conversation Area */}
          <div className="h-96 overflow-y-auto bg-gray-50 p-6 flex flex-col">
            {messages.length === 0 && (
              <div className="flex-1 flex items-center justify-center text-center">
                <div>
                  <p className="text-gray-500 mb-2">Listening...</p>
                  <p className="text-sm text-gray-400">Start speaking to begin the conversation</p>
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.role === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Footer Info */}
          <div className="bg-white px-6 py-3 border-t border-gray-200 text-center text-xs text-gray-600">
            <p>Your conversation is being transcribed in real-time</p>
          </div>
        </div>
      ) : (
        <button
          onClick={startCall}
          disabled={isLoading}
          className={`w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold text-lg transition-all ${
            "bg-blue-600 hover:bg-blue-700 text-white"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isLoading ? (
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
      )}
    </div>
  )
}
