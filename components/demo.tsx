"use client"

import { VapiCallButton } from "@/components/vapi-call-button"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export function Demo() {
  const { t } = useLanguage()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <section id="demo" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
              {isHydrated ? t("demo.title", "Try ReAI in Action") : "Try ReAI in Action"}
            </h2>
            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
              {isHydrated ? t("demo.description", "Call ReAI directly from your browser and experience how it handles restaurant calls. Talk to the AI receptionist and see the difference.") : "Call ReAI directly from your browser and experience how it handles restaurant calls. Talk to the AI receptionist and see the difference."}
            </p>
          </div>

          <div className="relative p-8 md:p-12 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <VapiCallButton />
            </div>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-white border border-gray-200 text-center hover:shadow-sm transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-3">1</div>
              <h4 className="font-semibold mb-2 text-gray-900">
                {isHydrated ? t("demo.step1", "Click the button") : "Click the button"}
              </h4>
              <p className="text-sm text-gray-600">
                {isHydrated ? t("demo.step1Desc", "Demo call starts directly in your browser.") : "Demo call starts directly in your browser."}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-gray-200 text-center hover:shadow-sm transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-3">2</div>
              <h4 className="font-semibold mb-2 text-gray-900">
                {isHydrated ? t("demo.step2", "Talk to AI") : "Talk to AI"}
              </h4>
              <p className="text-sm text-gray-600">
                {isHydrated ? t("demo.step2Desc", "Try booking a table or ask anything.") : "Try booking a table or ask anything."}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-white border border-gray-200 text-center hover:shadow-sm transition-shadow">
              <div className="text-3xl font-bold text-blue-600 mb-3">3</div>
              <h4 className="font-semibold mb-2 text-gray-900">
                {isHydrated ? t("demo.step3", "See for yourself") : "See for yourself"}
              </h4>
              <p className="text-sm text-gray-600">
                {isHydrated ? t("demo.step3Desc", "Experience how naturally AI communicates.") : "Experience how naturally AI communicates."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

