"use client"

import { Code, Palette, Zap, Shield, Smartphone, BarChart3, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Code,
    title: "Custom Development",
    description: "Bespoke web applications built with modern tech stack (React, Next.js, TypeScript). Scalable, performant, and built for your exact needs."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful, intuitive interfaces that users love. From wireframes to polished designs, we craft experiences that convert."
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Seamless experience across all devices. Mobile-first approach ensures your site looks perfect on phones, tablets, and desktops."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Lightning-fast load times and smooth interactions. Optimized Core Web Vitals, image compression, and caching strategies included."
  },
  {
    icon: Shield,
    title: "Security & Compliance",
    description: "Enterprise-grade security, SSL certificates, data protection, and compliance with GDPR, CCPA, and industry standards."
  },
  {
    icon: BarChart3,
    title: "Analytics & Growth",
    description: "Integrated analytics, conversion tracking, and SEO optimization to help your business grow and understand user behavior."
  }
]

const process = [
  {
    step: "01",
    title: "Discovery & Strategy",
    description: "We understand your business goals, target audience, and competitive landscape to create a winning strategy."
  },
  {
    step: "02",
    title: "Design & Prototyping",
    description: "Beautiful wireframes and interactive prototypes that show exactly how your website will work and look."
  },
  {
    step: "03",
    title: "Development",
    description: "Clean, scalable code built with the latest technologies. Full-stack development with testing and quality assurance."
  },
  {
    step: "04",
    title: "Launch & Support",
    description: "Smooth deployment, monitoring, and ongoing support to ensure your website runs perfectly 24/7."
  }
]

export function WebsiteServices() {
  return (
    <section id="website-services" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-blue-600 font-semibold mb-3">Website Development</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
            Custom websites that drive results
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            From concept to launch, we build beautiful, fast, and conversion-optimized websites that help your business grow. Every project is crafted with precision and delivered on time.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <service.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 md:p-12 border border-blue-200 mb-20">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Process</h3>
            <p className="text-lg text-gray-600">
              A streamlined approach that ensures your project stays on track from start to finish.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+32px)] right-0 h-0.5 bg-gradient-to-r from-blue-300 to-transparent" />
                )}
                
                <div className="relative z-10 bg-white rounded-lg p-6 border border-blue-100 h-full">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold mb-4">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build something amazing?
          </h3>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a custom plan that delivers results. Schedule a consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-base px-8 h-12 bg-white hover:bg-gray-100 text-blue-600 rounded-lg font-semibold transition-colors"
              asChild
            >
              <a href="#kontakt">Start Your Project</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-base px-8 h-12 border-2 border-white text-white hover:bg-blue-600 rounded-lg font-semibold"
              asChild
            >
              <a href="#demo" className="flex items-center gap-2">
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-20 pt-20 border-t border-gray-200">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Why choose us?</h3>
            <p className="text-gray-600">Proven expertise, reliable delivery, and exceptional results</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <p className="text-gray-600">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100%</div>
              <p className="text-gray-600">On-Time Delivery</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">12+</div>
              <p className="text-gray-600">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
              <p className="text-gray-600">Support Available</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
