import Link from 'next/link'
import { Hotel, Star, Users, Calendar, Shield, CreditCard } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: <Users className="h-8 w-8" />,
      title: "Guest Management",
      description: "Manage guest information, check-ins, and check-outs efficiently"
    },
    {
      icon: <Hotel className="h-8 w-8" />,
      title: "Room Management",
      description: "Track room availability, maintenance, and cleaning status"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Booking System",
      description: "Handle reservations, cancellations, and room assignments"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Billing & Payments",
      description: "Process payments, generate invoices, and track revenue"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Security",
      description: "Secure data handling and user authentication"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Reviews & Ratings",
      description: "Manage guest feedback and improve service quality"
    }
  ]

  const stats = [
    { number: "500+", label: "Happy Guests" },
    { number: "50+", label: "Rooms Available" },
    { number: "99%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support" }
  ]

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to Hotel Management System
            </h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto text-blue-100">
              Streamline your hotel operations with our comprehensive management solution. 
              From booking to checkout, we&apos;ve got you covered.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/login" 
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                Get Started
              </Link>
              <Link 
                href="/contact" 
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-blue-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">Powerful Features</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to manage your hotel efficiently and provide excellent guest experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <div className="text-blue-900 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of hotels that are already using our system to streamline their operations and enhance guest satisfaction.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/signup" 
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Sign Up Now
            </Link>
            <Link 
              href="/dashboard" 
              className="border-2 border-white text-white px-8py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition duration-300"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}