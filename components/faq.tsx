"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "How does ReAI work?",
    answer:
      "ReAI is an AI receptionist that answers phone calls for your restaurant. It speaks fluent English, answers guest questions, and automatically logs reservations into your system. It works 24/7, so you never miss a call."
  },
  {
    question: "Which booking systems does ReAI integrate with?",
    answer:
      "ReAI connects with most major systems — Toast, Square, OpenTable, or any system with an API. If you use something else, we'll find a solution."
  },
  {
    question: "How many calls can ReAI handle at once?",
    answer:
      "ReAI has no limits. Even with 10 calls ringing simultaneously during peak hours, every guest gets an immediate answer. No holds, no missed reservations."
  },
  {
    question: "How long does setup take?",
    answer:
      "Usually 72 hours. We configure everything, train AI on your menu, hours, and special policies, then integrate with your system."
  },
  {
    question: "Can I cancel ReAI anytime?",
    answer:
      "Yes, no commitment required. You can end our partnership anytime. We believe quality service keeps you, not contracts."
  },
  {
    question: "What if a guest wants to talk to a human?",
    answer:
      "ReAI knows when to transfer — for complaints, complex requests, or special situations. We alert you and pass along the details."
  }
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Everything you need to know about ReAI.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left text-base font-semibold hover:no-underline py-6 text-gray-900 hover:text-blue-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
