import Link from "next/link"
import { Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo and description */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Phone className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold text-lg text-gray-900">ReAI</span>
            </Link>
            <p className="text-sm text-gray-600 text-center md:text-left">
              AI receptionist that never takes a day off.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <Link
              href="#funkce"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#cenik"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#reference"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              References
            </Link>
            <Link
              href="#kontakt"
              className="text-sm font-medium px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Get AI
            </Link>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2024 ReAI. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
