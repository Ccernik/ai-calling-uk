"use client"

import { useLanguage } from "@/lib/language-context"
import { Globe } from "lucide-react"

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-full p-1">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === "en"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        aria-label="Switch to English"
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("cs")}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          language === "cs"
            ? "bg-white text-blue-600 shadow-sm"
            : "text-gray-600 hover:text-gray-900"
        }`}
        aria-label="Switch to Czech"
        aria-pressed={language === "cs"}
      >
        CS
      </button>
    </div>
  )
}

export function LanguageSwitcherCompact() {
  const { language, setLanguage } = useLanguage()

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-gray-600" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as "en" | "cs")}
        className="text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-lg px-2 py-1 focus:border-blue-600 focus:outline-none"
        aria-label="Select language"
      >
        <option value="en">English</option>
        <option value="cs">Čeština</option>
      </select>
    </div>
  )
}
