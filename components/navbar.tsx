"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import { useState } from "react"
import { useDemoModal } from "@/components/demo-context"
import { useSwipeNavigation } from "@/hooks/use-swipe-navigation"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { setDemoModalOpen } = useDemoModal()
  const { navigateWithSwipe } = useSwipeNavigation()

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigateWithSwipe("/")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white">
      <nav className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <button 
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 hover:opacity-80 transition-opacity cursor-pointer"
        >
          <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-xl tracking-tight text-gray-900">ReAI</span>
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#funkce" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Features
          </Link>
          <Link href="#cenik" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Pricing
          </Link>
          <Link href="#reference" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            References
          </Link>
          <Link href="#kontakt" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
            Contact
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Button 
            size="sm" 
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6"
            onClick={() => setDemoModalOpen(true)}
          >
            Get AI
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-900"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link 
              href="#funkce" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-3 px-2 rounded-lg hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="#cenik" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-3 px-2 rounded-lg hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              href="#reference" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-3 px-2 rounded-lg hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              References
            </Link>
            <Link 
              href="#kontakt" 
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-3 px-2 rounded-lg hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-gray-200">
              <LanguageSwitcher />
              <Button 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                onClick={() => {
                  setDemoModalOpen(true)
                  setMobileMenuOpen(false)
                }}
              >
                Get AI
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
