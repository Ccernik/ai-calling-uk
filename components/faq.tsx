"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export function FAQ() {
  const { t } = useLanguage()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            {isHydrated ? t("faq.title", "Frequently asked questions") : "Frequently asked questions"}
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            {isHydrated ? t("faq.description", "Everything you need to know about ReAI.") : "Everything you need to know about ReAI."}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {isHydrated && [
              {
                q: "faq.q1",
                a: "faq.a1",
                qFallback: "How does ReAI work?",
                aFallback: "ReAI is an AI receptionist that answers phone calls for your restaurant. It speaks fluent English, answers guest questions, and automatically logs reservations into your system. It works 24/7, so you never miss a call."
              },
              {
                q: "faq.q2",
                a: "faq.a2",
                qFallback: "Which booking systems does ReAI integrate with?",
                aFallback: "ReAI connects with most major systems — Toast, Square, OpenTable, or any system with an API. If you use something else, we'll find a solution."
              },
              {
                q: "faq.q3",
                a: "faq.a3",
                qFallback: "How many calls can ReAI handle at once?",
                aFallback: "ReAI has no limits. Even with 10 calls ringing simultaneously during peak hours, every guest gets an immediate answer. No holds, no missed reservations."
              },
              {
                q: "faq.q4",
                a: "faq.a4",
                qFallback: "How long does setup take?",
                aFallback: "Usually 72 hours. We configure everything, train AI on your menu, hours, and special policies, then integrate with your system."
              }
            ].map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-6 text-gray-900 hover:text-blue-600 transition-colors">
                  {t(faq.q, faq.qFallback)}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                  {t(faq.a, faq.aFallback)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
