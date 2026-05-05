"use client"

import { useEffect, useRef, useState } from "react"
import { X, Calendar, Clock } from "lucide-react"

interface CalPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  calLink: string
}

export function CalPopup({ open, onOpenChange, calLink }: CalPopupProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      setIsLoading(true)
      // Load Cal.com embed script
      const script = document.createElement("script")
      script.src = "https://app.cal.com/embed.js"
      script.async = true
      script.onload = () => {
        setIsLoading(false)
      }
      document.body.appendChild(script)

      // Prevent body scroll when popup is open
      document.body.style.overflow = "hidden"
    } else {
      // Restore body scroll when popup closes
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [open])

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false)
      }
    }

    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [open, onOpenChange])

  if (!open) return null

  return (
    <>
      {/* Backdrop overlay - Click outside to close */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 backdrop-blur-sm"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Popup container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div
          ref={containerRef}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300 ease-out"
        >
          {/* Header with visual cues */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-5 sm:px-8 sm:py-6 border-b border-blue-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-600 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Schedule a Call</h2>
                <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Find a time that works for you
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-white rounded-lg ml-2 flex-shrink-0"
              aria-label="Close scheduling popup"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Loading state */}
          {isLoading && (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                  <div className="h-8 w-8 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
                </div>
                <p className="text-gray-600 font-medium">Loading scheduling...</p>
              </div>
            </div>
          )}

          {/* Cal.com embed container */}
          <div className="flex-1 overflow-y-auto bg-white">
            <div
              className="cal-embed w-full"
              data-callink={calLink}
              style={{
                width: "100%",
                minHeight: "500px",
              }}
            />
          </div>

          {/* Footer with helpful text */}
          <div className="bg-gray-50 px-6 py-3 sm:px-8 sm:py-4 border-t border-gray-200 text-center text-xs sm:text-sm text-gray-600">
            <p>💡 Tip: Use the Escape key to close this popup anytime</p>
          </div>
        </div>
      </div>
    </>
  )
}
