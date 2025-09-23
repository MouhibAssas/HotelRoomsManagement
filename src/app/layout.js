import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '../components/navbar/index.js'
import Footer from '../components/footer/index.js'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Hotel Management System',
  description: 'Manage your hotel bookings, rooms, and guests efficiently',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}