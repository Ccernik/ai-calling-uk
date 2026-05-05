import { Building2, Phone, ThumbsUp, Clock } from "lucide-react"

const stats = [
  {
    icon: Building2,
    value: "12",
    label: "restaurants",
    description: "Trust ReAI"
  },
  {
    icon: Phone,
    value: "2,400+",
    label: "calls per month",
    description: "Answered automatically"
  },
  {
    icon: ThumbsUp,
    value: "4.8/5",
    label: "average rating",
    description: "From customers"
  },
  {
    icon: Clock,
    value: "8+",
    label: "hours saved",
    description: "Per week, per restaurant"
  }
]

export function Stats() {
  return (
    <section id="reference" className="py-24 md:py-32 bg-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Proven results
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            Real restaurants. Real savings. Real revenue impact.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-6 md:p-8 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 mb-4">
                <stat.icon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-700 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
