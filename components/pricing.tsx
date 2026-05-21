"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export function Pricing() {
  const { t } = useLanguage()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <section id="cenik" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            {isHydrated ? t("pricing.title", "Simple, transparent pricing") : "Simple, transparent pricing"}
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            {isHydrated ? t("pricing.description", "Pay only for what you use. No hidden fees.") : "Pay only for what you use. No hidden fees."}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Main pricing card */}
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-blue-50 to-white border border-blue-200 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 mb-12">
              {/* Setup fee */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">One-time setup</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold text-gray-900">$599</span>
                </div>
                <p className="text-sm text-gray-600">
                  Configuration, AI training on your menu, and system integration.
                </p>
              </div>

              {/* Monthly fee */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Monthly subscription</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold text-gray-900">$49</span>
                  <span className="text-lg text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600">
                  Maintenance, updates, and 24/7 support included.
                </p>
              </div>

              {/* Per minute */}
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-3">Pay as you go</p>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className="text-4xl font-bold text-gray-900">$0.50</span>
                  <span className="text-lg text-gray-600">/min</span>
                </div>
                <p className="text-sm text-gray-600">
                  Only charged for actual call duration.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t border-blue-200">
              <p className="text-sm font-semibold text-gray-900 mb-6">
                {isHydrated ? t("pricing.features", "What's included:") : "What's included:"}
              </p>
              <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                {isHydrated && [
                  t("features.customDesign", "Unlimited calls"),
                  t("features.responsive", "Native English speaker"),
                  t("features.performance", "24/7 availability"),
                  t("features.seo", "System integration"),
                  t("features.cms", "SMS confirmations"),
                  t("features.support", "Smart Q&A handling"),
                  t("features.customization", "No long-term contracts"),
                  t("features.security", "Priority support")
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="text-base px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                asChild
              >
                <a href="#kontakt">
                  {isHydrated ? t("pricing.getStarted", "Get started free") : "Get started free"}
                </a>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8 h-12 border-2 border-gray-300 text-gray-900 hover:bg-gray-50 rounded-lg font-semibold shadow-lg"
                asChild
              >
                <a href="#demo">
                  {isHydrated ? t("demo.startDemo", "Try demo") : "Try demo"}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
