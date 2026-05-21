"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, ArrowRight, Check } from "lucide-react"
import { useDemoModal } from "@/components/demo-context"
import { useLanguage } from "@/lib/language-context"

export function ContactClient() {
  const { setDemoModalOpen } = useDemoModal()
  const { t } = useLanguage()
  const [isHydrated, setIsHydrated] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  const copyToClipboard = (email: string) => {
    navigator.clipboard.writeText(email)
    setCopiedEmail(email)
    setTimeout(() => setCopiedEmail(null), 2000)
  }

  return (
    <section id="kontakt" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left side - CTA */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                {isHydrated ? t("contact.title", "Seeing is believing. Experience it live.") : "Seeing is believing. Experience it live."}
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                {isHydrated ? t("contact.description", "Get in touch with us — we'll show you how ReAI works for your restaurant in minutes.") : "Get in touch with us — we'll show you how ReAI works for your restaurant in minutes."}
              </p>
              <div className="mt-8">
                <Button 
                  size="lg" 
                  className="text-base px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  onClick={() => setDemoModalOpen(true)}
                >
                  {isHydrated ? t("contact.cta", "Get free demo") : "Get free demo"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>

            {/* Right side - Contact info */}
            <div className="space-y-6">
              <button
                onClick={() => copyToClipboard("cernikfilipcz@gmail.com")}
                className="flex items-center gap-4 p-6 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group w-full text-left"
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  {copiedEmail === "cernikfilipcz@gmail.com" ? (
                    <Check className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Mail className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    {isHydrated ? t("contact.email", "Email") : "Email"}
                  </p>
                  <p className="font-medium text-gray-900">cernikfilipcz@gmail.com</p>
                </div>
              </button>

              <button
                onClick={() => copyToClipboard("vojdus10@gmail.com")}
                className="flex items-center gap-4 p-6 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group w-full text-left"
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  {copiedEmail === "vojdus10@gmail.com" ? (
                    <Check className="h-5 w-5 text-blue-600" />
                  ) : (
                    <Mail className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    {isHydrated ? t("contact.email", "Email") : "Email"}
                  </p>
                  <p className="font-medium text-gray-900">vojdus10@gmail.com</p>
                </div>
              </button>

              <div className="flex items-center gap-4 p-6 rounded-lg bg-white border border-gray-200">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    {isHydrated ? t("contact.location", "Location") : "Location"}
                  </p>
                  <p className="font-medium text-gray-900">Prague, Czech Republic</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
