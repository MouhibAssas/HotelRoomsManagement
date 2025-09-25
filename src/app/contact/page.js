"use client"

import { useState } from 'react'
import { Hotel, Mail, Phone, MapPin, Clock, Send } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      // Simulate sending message. Replace with real API call when backend is ready.
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setStatus({ type: 'success', message: 'Your message has been sent successfully.' })
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setStatus({ type: 'error', message: 'Something went wrong. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800">
  <div className="container mx-auto px-6 py-16">
    <div className="flex items-center gap-4 text-white">
      <div className="p-3 bg-blue-800/50 rounded-2xl shadow-md">
        <Hotel className="h-10 w-10 text-blue-200" />
      </div>
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Contact Us
        </h1>
        <p className="mt-2 text-blue-200 text-lg">
          We’re here to help you manage your hotel efficiently.
        </p>
      </div>
    </div>
  </div>
</div>


      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-blue-950 text-white rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4">Get in touch</h2>
              <p className="text-blue-200 mb-6">
                Questions about rooms, bookings, or integrations? Reach out and our team will get back to you.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-blue-300 mt-0.5" />
                  <span className="text-blue-100">support@hotelmanager.app</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Phone className="h-5 w-5 text-blue-300 mt-0.5" />
                  <span className="text-blue-100">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-300 mt-0.5" />
                  <span className="text-blue-100">123 Ocean Drive, Suite 200, Miami, FL</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-300 mt-0.5" />
                  <span className="text-blue-100">Mon - Fri: 9:00 AM - 6:00 PM</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 h-48 bg-blue-900 rounded-lg shadow-inner flex items-center justify-center">
              <span className="text-blue-200 text-sm">Map placeholder</span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-blue-950 mb-1">Send us a message</h2>
              <p className="text-gray-600 mb-6">Fill out the form and we will get back to you shortly.</p>

              {status && (
                <div
                  className={`mb-4 rounded-md p-3 text-sm ${
                    status.type === 'success'
                      ? 'bg-green-50 text-green-700 border border-green-200'
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                    Subject
                  </label>
                  <input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
                    placeholder="Booking inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-800"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">We typically reply within one business day.</p>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`inline-flex items-center rounded-md px-4 py-2 font-medium text-white transition-colors ${
                      isSubmitting ? 'bg-blue-800/60 cursor-not-allowed' : 'bg-blue-800 hover:bg-blue-700'
                    }`}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


