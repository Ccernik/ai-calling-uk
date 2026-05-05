import { Button } from "@/components/ui/button"
import { Mail, MapPin, ArrowRight } from "lucide-react"
import { ContactClient } from "@/components/contact-client"

export function Contact() {
  return <ContactClient />
  return (
    <section id="kontakt" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left side - CTA */}
            <div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                Seeing is believing. Experience it live.
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Get in touch with us — we'll show you how ReAI works for your restaurant in minutes.
              </p>
              <div className="mt-8">
                <Button 
                  size="lg" 
                  className="text-base px-8 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
                  asChild
                >
                  <a href="mailto:cernikfilipcz@gmail.com" className="flex items-center gap-2">
                    Get free demo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Right side - Contact info */}
            <div className="space-y-6">
              <a
                href="mailto:cernikfilipcz@gmail.com"
                className="flex items-center gap-4 p-6 rounded-lg bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">cernikfilipcz@gmail.com</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-6 rounded-lg bg-white border border-gray-200">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Location</p>
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
