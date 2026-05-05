"use client"

import { createContext, useContext, ReactNode } from "react"

interface DemoContextType {
  demoModalOpen: boolean
  setDemoModalOpen: (open: boolean) => void
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export function DemoProvider({
  children,
  demoModalOpen,
  setDemoModalOpen,
}: {
  children: ReactNode
  demoModalOpen: boolean
  setDemoModalOpen: (open: boolean) => void
}) {
  return (
    <DemoContext.Provider value={{ demoModalOpen, setDemoModalOpen }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemoModal() {
  const context = useContext(DemoContext)
  if (context === undefined) {
    throw new Error("useDemoModal must be used within DemoProvider")
  }
  return context
}
