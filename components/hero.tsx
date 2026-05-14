"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useDemoModal } from "@/components/demo-context"
import { useLanguage } from "@/lib/language-context"
import { useEffect, useState } from "react"

export function Hero() {
  const { setDemoModalOpen } = useDemoModal()
  const { t } = useLanguage()
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])
  return (
    <section className="relative min-h-screen flex items-center bg-white overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}} />
      </div>
      
      <style>{`
        @keyframes phoneFloat {
          0%, 100% { transform: translateY(0px) rotateX(0deg); }
          50% { transform: translateY(-20px) rotateX(5deg); }
        }
        @keyframes phoneGlow {
          0%, 100% { box-shadow: 0 20px 60px rgba(37, 99, 235, 0.3); }
          50% { box-shadow: 0 30px 80px rgba(37, 99, 235, 0.5); }
        }
        @keyframes pulseIn {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        .animate-phone-float {
          animation: phoneFloat 6s ease-in-out infinite;
          perspective: 1000px;
        }
        .animate-phone-glow {
          animation: phoneGlow 4s ease-in-out infinite;
        }
        .animate-pulse-in {
          animation: pulseIn 2s ease-in-out infinite;
        }
      `}</style>
      
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl">
          {/* Left side - Content */}
          <div className="space-y-8">
            {/* Eyebrow text */}
            <div className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              AI Receptionist for Restaurants
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
              {isHydrated ? t("hero.headline") : "Never miss a call. Ever."}
            </h1>
            
            {/* Subheadline */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              {isHydrated ? t("hero.description") : "Your restaurant stays connected. Calls answered instantly. Reservations booked automatically. Guests never hear a busy signal."}
            </p>
            
            {/* Key points */}
            <div className="space-y-3 pt-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Native English speaker, understands accents</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Works 24/7 — no breaks, no holidays</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Integrates with your reservation system</span>
              </div>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-base"
                onClick={() => setDemoModalOpen(true)}
              >
                {isHydrated ? t("hero.ctaPrimary") : "Get free demo"}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                variant="outline"
                className="bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-900 px-8 py-3 rounded-lg font-semibold text-base transition-all duration-300"
                asChild
              >
                <a href="#demo">{isHydrated ? t("hero.ctaSecondary") : "Try AI receptionist"}</a>
              </Button>
            </div>
          </div>
          
          {/* Right side - Animated Phone */}
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-md h-96">
              {/* Animated phone mockup with 3D floating effect */}
              <div className="absolute inset-0 flex items-center justify-center animate-phone-float">
                <div className="relative w-80 h-full">
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-3xl animate-phone-glow" />
                  
                  {/* Phone body */}
                  <div className="relative bg-gradient-to-br from-blue-600 via-blue-600 to-blue-700 rounded-3xl p-3 shadow-2xl h-full transform transition-transform">
                    {/* Phone screen */}
                    <div className="bg-white rounded-2xl p-6 h-full flex flex-col justify-between overflow-hidden">
                      {/* Top section */}
                      <div>
                        <div className="text-xs font-semibold text-gray-400 mb-4 uppercase tracking-widest">Incoming Call</div>
                        <div className="space-y-6">
                          {/* Avatar circle with pulse animation */}
                          <div className="flex justify-center">
                            <div className="relative w-20 h-20">
                              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-blue-600" />
                              <div className="absolute inset-0 rounded-full bg-blue-400 animate-pulse-in opacity-40" />
                            </div>
                          </div>
                          
                          {/* Caller info */}
                          <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900">Sarah Johnson</h3>
                            <p className="text-sm text-gray-500 mt-1">Restaurant reservation</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Bottom section with animated waveform */}
                      <div className="space-y-4">
                        <p className="text-sm text-gray-600 italic text-center leading-relaxed">{'"I\'d like a table for 4 tomorrow at 7pm"'}</p>
                        
                        {/* Animated waveform bars */}
                        <div className="flex items-end justify-center gap-1 h-12">
                          <div className="w-1.5 bg-gradient-to-t from-green-400 to-green-500 rounded-full animate-pulse-in" style={{height: '60%', animationDelay: '0s'}} />
                          <div className="w-1.5 bg-gradient-to-t from-green-400 to-green-500 rounded-full animate-pulse-in" style={{height: '80%', animationDelay: '0.2s'}} />
                          <div className="w-1.5 bg-gradient-to-t from-green-400 to-green-500 rounded-full animate-pulse-in" style={{height: '100%', animationDelay: '0.4s'}} />
                          <div className="w-1.5 bg-gradient-to-t from-green-400 to-green-500 rounded-full animate-pulse-in" style={{height: '75%', animationDelay: '0.6s'}} />
                          <div className="w-1.5 bg-gradient-to-t from-green-400 to-green-500 rounded-full animate-pulse-in" style={{height: '85%', animationDelay: '0.8s'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
