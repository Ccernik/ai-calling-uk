"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Stats } from "@/components/stats"
import { Demo } from "@/components/demo"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WebsiteServices } from "@/components/website-services"
import { DemoModal } from "@/components/demo-modal"
import { DemoProvider } from "@/components/demo-context"

export default function Home() {
  const [demoModalOpen, setDemoModalOpen] = useState(false)

  return (
    <DemoProvider demoModalOpen={demoModalOpen} setDemoModalOpen={setDemoModalOpen}>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <Features />
          <Stats />
          <Demo />
          <WebsiteServices />
          <Pricing />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <DemoModal open={demoModalOpen} onOpenChange={setDemoModalOpen} />
      </div>
    </DemoProvider>
  )
}
