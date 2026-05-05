import { Calendar, Users, MessageSquare, Send } from "lucide-react"

const features = [
  {
    icon: Calendar,
    title: "Direct system integration",
    description: "Reservations sync instantly with Storyous, Toast, Square, or your custom API. No double-entry, no lost bookings."
  },
  {
    icon: Users,
    title: "Handles peak demand",
    description: "Even during dinner rush with 10 simultaneous calls, every guest gets through immediately. No hold times."
  },
  {
    icon: MessageSquare,
    title: "Answers frequently asked questions",
    description: "Hours, allergies, parking, menu items — handled automatically. Your team stays focused on table service."
  },
  {
    icon: Send,
    title: "SMS confirmation & reminders",
    description: "Guests get instant booking confirmations with directions and menu links. Reduces no-shows significantly."
  }
]

export function Features() {
  return (
    <section id="funkce" className="py-24 md:py-32 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Built for every layer of your restaurant
          </h2>
          <p className="mt-6 text-xl text-gray-600">
            Calls answered. Reservations booked. Questions answered.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
