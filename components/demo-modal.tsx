"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"

interface DemoModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DemoModal({ open, onOpenChange }: DemoModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    website: "",
    requirements: "",
    agreeTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }



  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.fullName || !formData.email || !formData.agreeTerms) {
      alert("Please fill in all required fields and agree to the terms")
      return
    }

    setIsSubmitting(true)
    
    try {
      // Send to email service or API
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setTimeout(() => {
          onOpenChange(false)
          setSubmitted(false)
          setFormData({
            fullName: "",
            company: "",
            email: "",
            website: "",
            requirements: "",
            agreeTerms: false,
          })
        }, 2000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      alert("Error submitting form. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white [&>button]:hidden">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-3xl font-bold text-gray-900">
            Try AI Calling Assistant
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            Set up your AI-powered calling assistant to handle customer calls with intelligence and efficiency.
          </p>
        </DialogHeader>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
              <svg
                className="h-8 w-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Thank you!</h3>
            <p className="mt-2 text-gray-600 mb-6">
              We've received your AI calling assistant setup request. Let's schedule a call to configure your system.
            </p>
            <Button
              onClick={() => window.open("https://cal.com/filip-cernik/quick-explanation", "_blank")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg inline-flex items-center gap-2"
            >
              Schedule a Call
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <Label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                Full Name <span className="text-blue-600">*</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                required
              />
            </div>

            {/* Company */}
            <div>
              <Label htmlFor="company" className="block text-sm font-semibold text-gray-900 mb-2">
                Company Name
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Enter your company name"
                value={formData.company}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
              />
            </div>

            {/* Work Email */}
            <div>
              <Label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Work Email <span className="text-blue-600">*</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your work email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
                required
              />
            </div>

            {/* Business Website */}
            <div>
              <Label htmlFor="website" className="block text-sm font-semibold text-gray-900 mb-2">
                Business Website
              </Label>
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="https://yourbusiness.com"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors"
              />
            </div>

            {/* Requirements */}
            <div>
              <Label htmlFor="requirements" className="block text-sm font-semibold text-gray-900 mb-2">
                Specific Requirements
              </Label>
              <Textarea
                id="requirements"
                name="requirements"
                placeholder="Any specific features or requirements for your AI calling assistant..."
                value={formData.requirements}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition-colors min-h-24 resize-none"
              />
            </div>

            {/* Terms Agreement */}
            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={formData.agreeTerms}
                onCheckedChange={handleCheckboxChange}
                className="mt-1 border-gray-300 rounded checked:bg-blue-600 checked:border-blue-600"
              />
              <Label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed cursor-pointer">
                I agree with ReAI's{" "}
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </a>
                <span className="text-blue-600"> *</span>
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Set Up AI Calling Assistant"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
