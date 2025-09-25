"use client"

import { useState, useEffect } from 'react'
import { Hotel, Users, Calendar, TrendingUp, Eye, RefreshCw, Filter } from 'lucide-react'

export default function DashboardPage() {
  const [rooms, setRooms] = useState([])
  const [filter, setFilter] = useState('all')
  const [lastUpdated, setLastUpdated] = useState(new Date())

  useEffect(() => {
    // Sample data - in real app, this would come from API
    const sampleRooms = [
      {
        id: 1,
        roomNumber: '101',
        bedrooms: 1,
        maxGuests: 2,
        viewType: 'sea',
        status: 'available',
        guestName: null,
        checkIn: null,
        checkOut: null,
        basePrice: 300,
        summerPrice: 450,
        winterPrice: 250
      },
      {
        id: 2,
        roomNumber: '102',
        bedrooms: 2,
        maxGuests: 4,
        viewType: 'pool',
        status: 'occupied',
        guestName: 'John Smith',
        checkIn: '2024-01-15',
        checkOut: '2024-01-18',
        basePrice: 400,
        summerPrice: 600,
        winterPrice: 350
      },
      {
        id: 3,
        roomNumber: '201',
        bedrooms: 1,
        maxGuests: 2,
        viewType: 'sea',
        status: 'maintenance',
        guestName: null,
        checkIn: null,
        checkOut: null,
        basePrice: 350,
        summerPrice: 500,
        winterPrice: 300
      },
      {
        id: 4,
        roomNumber: '202',
        bedrooms: 3,
        maxGuests: 6,
        viewType: 'pool',
        status: 'cleaning',
        guestName: null,
        checkIn: null,
        checkOut: null,
        basePrice: 500,
        summerPrice: 750,
        winterPrice: 450
      },
      {
        id: 5,
        roomNumber: '301',
        bedrooms: 2,
        maxGuests: 4,
        viewType: 'specific',
        status: 'available',
        guestName: null,
        checkIn: null,
        checkOut: null,
        basePrice: 450,
        summerPrice: 650,
        winterPrice: 400
      },
      {
        id: 6,
        roomNumber: '302',
        bedrooms: 1,
        maxGuests: 2,
        viewType: 'none',
        status: 'occupied',
        guestName: 'Sarah Johnson',
        checkIn: '2024-01-16',
        checkOut: '2024-01-20',
        basePrice: 280,
        summerPrice: 420,
        winterPrice: 220
      }
    ]
    
    setRooms(sampleRooms)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-200'
      case 'occupied': return 'bg-red-100 text-red-800 border-red-200'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'cleaning': return 'bg-blue-100 text-blue-800 border-blue-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return '✅'
      case 'occupied': return '👤'
      case 'maintenance': return '🔧'
      case 'cleaning': return '🧹'
      default: return '❓'
    }
  }

  const getViewTypeIcon = (viewType) => {
    switch (viewType) {
      case 'sea': return '🌊'
      case 'pool': return '🏊'
      case 'specific': return '🏔️'
      default: return '🏢'
    }
  }

  const filteredRooms = filter === 'all' ? rooms : rooms.filter(room => room.status === filter)

  const stats = {
    total: rooms.length,
    available: rooms.filter(r => r.status === 'available').length,
    occupied: rooms.filter(r => r.status === 'occupied').length,
    maintenance: rooms.filter(r => r.status === 'maintenance').length,
    cleaning: rooms.filter(r => r.status === 'cleaning').length
  }

  const occupancyRate = ((stats.occupied / stats.total) * 100).toFixed(1)

  const refreshData = () => {
    setLastUpdated(new Date())
    // In real app, this would fetch fresh data from API
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-950 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white">
              <Hotel className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Hotel Dashboard</h1>
                <p className="text-blue-200">Real-time room status and occupancy monitoring</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-blue-200 text-sm">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </div>
              <button
                onClick={refreshData}
                className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <RefreshCw className="h-5 w-5" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div 
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg ${
              filter === 'all' ? 'ring-2 ring-blue-800 bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setFilter('all')}
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Hotel className="h-6 w-6 text-blue-800" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div 
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg ${
              filter === 'available' ? 'ring-2 ring-green-800 bg-green-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setFilter('available')}
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <div className="h-6 w-6 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-gray-900">{stats.available}</p>
              </div>
            </div>
          </div>

          <div 
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg ${
              filter === 'occupied' ? 'ring-2 ring-red-800 bg-red-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setFilter('occupied')}
          >
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <div className="h-6 w-6 bg-red-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Occupied</p>
                <p className="text-2xl font-bold text-gray-900">{stats.occupied}</p>
              </div>
            </div>
          </div>

          <div 
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg ${
              filter === 'maintenance' ? 'ring-2 ring-yellow-800 bg-yellow-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setFilter('maintenance')}
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <div className="h-6 w-6 bg-yellow-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Maintenance</p>
                <p className="text-2xl font-bold text-gray-900">{stats.maintenance}</p>
              </div>
            </div>
          </div>

          <div 
            className={`bg-white p-6 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg ${
              filter === 'cleaning' ? 'ring-2 ring-blue-800 bg-blue-50' : 'hover:bg-gray-50'
            }`}
            onClick={() => setFilter('cleaning')}
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <div className="h-6 w-6 bg-blue-500 rounded-full"></div>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cleaning</p>
                <p className="text-2xl font-bold text-gray-900">{stats.cleaning}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Occupancy Rate */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Occupancy Rate</h3>
              <p className="text-sm text-gray-600">Current hotel occupancy percentage</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-800">{occupancyRate}%</div>
              <div className="text-sm text-gray-600">{stats.occupied} of {stats.total} rooms occupied</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-800 h-2 rounded-full transition-all duration-300"
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Filter and Room Status */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Room Status Overview</h3>
                {filter !== 'all' && (
                  <p className="text-sm text-gray-600 mt-1">
                    Showing {filteredRooms.length} {filter} room{filteredRooms.length !== 1 ? 's' : ''}
                    <button
                      onClick={() => setFilter('all')}
                      className="ml-2 text-blue-600 hover:text-blue-800 underline"
                    >
                      Clear filter
                    </button>
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-800"
                >
                  <option value="all">All Rooms</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="cleaning">Cleaning</option>
                </select>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <div key={room.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-gray-900">Room {room.roomNumber}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(room.status)}`}>
                      {getStatusIcon(room.status)} {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <span>🛏️</span>
                      <span>{room.bedrooms} bedroom{room.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>👥</span>
                      <span>Max {room.maxGuests} guests</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>{getViewTypeIcon(room.viewType)}</span>
                      <span className="capitalize">{room.viewType} view</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span>💰</span>
                      <span>Base: {room.basePrice} TND</span>
                    </div>
                  </div>

                  {room.status === 'occupied' && room.guestName && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">Current Guest:</div>
                        <div className="text-gray-600">{room.guestName}</div>
                        <div className="text-gray-500 text-xs mt-1">
                          Check-in: {room.checkIn} | Check-out: {room.checkOut}
                        </div>
                      </div>
                    </div>
                  )}

                  {room.status === 'available' && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="text-sm text-green-600 font-medium">
                        Ready for booking
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Summer: {room.summerPrice} TND | Winter: {room.winterPrice} TND
                      </div>
                    </div>
                  )}

                  {room.status === 'maintenance' && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="text-sm text-yellow-600 font-medium">
                        Under maintenance
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Not available for booking
                      </div>
                    </div>
                  )}

                  {room.status === 'cleaning' && (
                    <div className="mt-4 pt-3 border-t border-gray-200">
                      <div className="text-sm text-blue-600 font-medium">
                        Being cleaned
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Will be available shortly
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredRooms.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🏨</div>
                <div className="text-gray-500 text-lg">No rooms found</div>
                <div className="text-gray-400 text-sm mt-2">
                  {filter === 'all' ? 'No rooms configured yet' : `No ${filter} rooms at the moment`}
                </div>
                {filter !== 'all' && (
                  <button
                    onClick={() => setFilter('all')}
                    className="mt-4 text-blue-600 hover:text-blue-800 underline"
                  >
                    View all rooms
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="/dashboard/management"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-blue-100 rounded-lg mr-3">
                <Hotel className="h-6 w-6 text-blue-800" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Room Management</div>
                <div className="text-sm text-gray-600">Configure rooms and pricing</div>
              </div>
            </a>

            <a
              href="/dashboard/bookings"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-green-100 rounded-lg mr-3">
                <Calendar className="h-6 w-6 text-green-800" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Bookings</div>
                <div className="text-sm text-gray-600">Manage reservations</div>
              </div>
            </a>

            <a
              href="/dashboard/reports"
              className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="p-2 bg-purple-100 rounded-lg mr-3">
                <TrendingUp className="h-6 w-6 text-purple-800" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Reports</div>
                <div className="text-sm text-gray-600">View analytics and reports</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
