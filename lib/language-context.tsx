"use client"

import { useEffect, useState, useCallback, createContext, useContext, ReactNode } from "react"

type Language = "en" | "cs"

interface Translations {
  [key: string]: any
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, defaultValue?: string) => string
  translations: Translations
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const LANGUAGE_STORAGE_KEY = "reai-language"
const DEFAULT_LANGUAGE: Language = "en"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)
  const [translations, setTranslations] = useState<Translations>({})
  const [isHydrated, setIsHydrated] = useState(false)

  // Hydratizace - načti jazyk z localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY) as Language | null
    if (savedLanguage && ["en", "cs"].includes(savedLanguage)) {
      setLanguageState(savedLanguage)
    }
    setIsHydrated(true)
  }, [])

  // Načti překlady když se změní jazyk
  useEffect(() => {
    if (!isHydrated) return

    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${language}.json`)
        const data = await response.json()
        setTranslations(data)
        document.documentElement.lang = language
      } catch (error) {
        console.error("Error loading translations:", error)
      }
    }

    loadTranslations()
  }, [language, isHydrated])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
  }, [])

  const t = useCallback((key: string, defaultValue: string = key): string => {
    const keys = key.split(".")
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k]
      } else {
        return defaultValue
      }
    }

    return typeof value === "string" ? value : defaultValue
  }, [translations])

  if (!isHydrated) {
    // Provide a default context during SSR/build
    return (
      <LanguageContext.Provider value={{ language: DEFAULT_LANGUAGE, setLanguage: () => {}, t: (_, defaultValue) => defaultValue || "", translations: {} }}>
        {children}
      </LanguageContext.Provider>
    )
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translations }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider")
  }
  return context
}
