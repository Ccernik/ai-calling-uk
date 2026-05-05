"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"

interface CalPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  calLink: string
}

export function CalPopup({ open, onOpenChange, calLink }: CalPopupProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (open && iframeRef.current) {
      // Load Cal.com embed script
      const script = document.createElement("script")
      script.src = "https://app.cal.com/embed.js"
      script.async = true
      document.body.appendChild(script)
    }
  }, [open])

  if (!open) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
        onClick={() => onOpenChange(false)}
        aria-hidden="true"
      />

      {/* Popup container */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Schedule a Call</h2>
            <button
              onClick={() => onOpenChange(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cal.com embed */}
          <div className="flex-1 overflow-y-auto">
            <div
              className="cal-embed"
              data-callink={calLink}
              style={{
                width: "100%",
                height: "100%",
                overflow: "scroll",
              }}
            />
          </div>
        </div>
      </div>
    </>
  )
}
