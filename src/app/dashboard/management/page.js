"use client"

import { useState, useEffect } from 'react'
import { Hotel, Plus, Trash2, Edit, Save, X, Bed, Users, Eye, DollarSign } from 'lucide-react'
import { RoomDataService } from '../../../lib/roomDataService'

export default function HotelManagementPage() {
  const [rooms, setRooms] = useState([])
  const [filteredRooms, setFilteredRooms] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [editingRoom, setEditingRoom] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    roomNumber: '',
    bedrooms: 1,
    maxGuests: 2,
    viewType: 'none',
    basePrice: 0,
    summerPrice: 0,
    winterPrice: 0,
    status: 'available'
  })

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const roomsData = await RoomDataService.initializeData()
        setRooms(roomsData)
        setFilteredRooms(roomsData)
      } catch (error) {
        console.error('Error loading rooms:', error)
        // Fallback to default data
        const defaultRooms = RoomDataService.getDefaultRooms()
        setRooms(defaultRooms)
        setFilteredRooms(defaultRooms)
      }
    }
    
    loadRooms()
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = rooms

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(room => room.status === filter)
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(room => 
        room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredRooms(filtered)
  }, [rooms, filter, searchTerm])

  const handleInputChange = (e) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) || 0 : value
    }))
  }

  const handleAddRoom = async () => {
    if (!formData.roomNumber) return

    try {
      const newRoom = await RoomDataService.addRoom({
        ...formData,
        roomNumber: formData.roomNumber.toString()
      })

      if (newRoom) {
        setRooms(prev => [...prev, newRoom])
        setFormData({
          roomNumber: '',
          bedrooms: 1,
          maxGuests: 2,
          viewType: 'none',
          basePrice: 0,
          summerPrice: 0,
          winterPrice: 0,
          status: 'available'
        })
        setShowAddForm(false)
      }
    } catch (error) {
      console.error('Error adding room:', error)
    }
  }

  const handleEditRoom = (room) => {
    setEditingRoom(room.id)
    setFormData(room)
  }

  const handleSaveEdit = async () => {
    try {
      const updatedRoom = await RoomDataService.updateRoom(editingRoom, formData)
      
      if (updatedRoom) {
        setRooms(prev => prev.map(room => 
          room.id === editingRoom ? updatedRoom : room
        ))
        setEditingRoom(null)
        setFormData({
          roomNumber: '',
          bedrooms: 1,
          maxGuests: 2,
          viewType: 'none',
          basePrice: 0,
          summerPrice: 0,
          winterPrice: 0,
          status: 'available'
        })
      }
    } catch (error) {
      console.error('Error updating room:', error)
    }
  }

  const handleDeleteRoom = async (roomId) => {
    if (confirm('Are you sure you want to delete this room?')) {
      try {
        const success = await RoomDataService.deleteRoom(roomId)
        if (success) {
          setRooms(prev => prev.filter(room => room.id !== roomId))
        }
      } catch (error) {
        console.error('Error deleting room:', error)
      }
    }
  }

  const handleStatusChange = async (roomId, newStatus) => {
    try {
      const updatedRoom = await RoomDataService.updateRoom(roomId, { status: newStatus })
      if (updatedRoom) {
        setRooms(prev => prev.map(room => 
          room.id === roomId ? updatedRoom : room
        ))
      }
    } catch (error) {
      console.error('Error updating room status:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'occupied': return 'bg-red-100 text-red-800'
      case 'maintenance': return 'bg-yellow-100 text-yellow-800'
      case 'cleaning': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-950 shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 text-white">
              <Hotel className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Hotel Management</h1>
                <p className="text-blue-200">Configure rooms, pricing, and availability</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-blue-800 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Room</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
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
                <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {rooms.filter(r => r.status === 'available').length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {rooms.filter(r => r.status === 'occupied').length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {rooms.filter(r => r.status === 'maintenance').length}
                </p>
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
                <p className="text-2xl font-bold text-gray-900">
                  {rooms.filter(r => r.status === 'cleaning').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Add Room Form */}
        {showAddForm && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Room</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  placeholder="e.g., 101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                <input
                  type="number"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">View Type</label>
                <select
                  name="viewType"
                  value={formData.viewType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                >
                  <option value="none">None</option>
                  <option value="sea">Sea View</option>
                  <option value="pool">Pool View</option>
                  <option value="specific">Specific View</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (TND)</label>
                <input
                  type="number"
                  name="basePrice"
                  value={formData.basePrice}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summer Price (TND)</label>
                <input
                  type="number"
                  name="summerPrice"
                  value={formData.summerPrice}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Winter Price (TND)</label>
                <input
                  type="number"
                  name="winterPrice"
                  value={formData.winterPrice}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="cleaning">Cleaning</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRoom}
                className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700"
              >
                Add Room
              </button>
            </div>
          </div>
        )}

        {/* Rooms Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Room Configuration</h3>
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
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by room number..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Eye className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pricing (TND)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">Room {room.roomNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-1">
                          <Bed className="h-4 w-4 text-gray-400" />
                          <span>{room.bedrooms} bedroom{room.bedrooms > 1 ? 's' : ''}</span>
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span>Max {room.maxGuests} guests</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{getViewTypeIcon(room.viewType)}</span>
                        <span className="text-sm text-gray-900 capitalize">{room.viewType}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="h-4 w-4 text-gray-400" />
                          <span>Base: {room.basePrice}</span>
                        </div>
                        <div className="text-xs text-gray-500">
                          Summer: {room.summerPrice} | Winter: {room.winterPrice}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={room.status}
                        onChange={(e) => handleStatusChange(room.id, e.target.value)}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(room.status)} border-0 focus:outline-none focus:ring-2 focus:ring-blue-800`}
                      >
                        <option value="available">Available</option>
                        <option value="occupied">Occupied</option>
                        <option value="maintenance">Maintenance</option>
                        <option value="cleaning">Cleaning</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditRoom(room)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteRoom(room.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredRooms.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏨</div>
              <div className="text-gray-500 text-lg">No rooms found</div>
              <div className="text-gray-400 text-sm mt-2">
                {filter === 'all' && !searchTerm ? 'No rooms configured yet' : 
                 filter !== 'all' && !searchTerm ? `No ${filter} rooms at the moment` :
                 searchTerm ? `No rooms found matching "${searchTerm}"` : 'No rooms match the current filters'}
              </div>
              {(filter !== 'all' || searchTerm) && (
                <button
                  onClick={() => {
                    setFilter('all')
                    setSearchTerm('')
                  }}
                  className="mt-4 text-blue-600 hover:text-blue-800 underline"
                >
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Edit Room Modal */}
        {editingRoom && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full mx-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Edit Room</h3>
                <button
                  onClick={() => setEditingRoom(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Room Number</label>
                  <input
                    type="text"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Guests</label>
                  <input
                    type="number"
                    name="maxGuests"
                    value={formData.maxGuests}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">View Type</label>
                  <select
                    name="viewType"
                    value={formData.viewType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  >
                    <option value="none">None</option>
                    <option value="sea">Sea View</option>
                    <option value="pool">Pool View</option>
                    <option value="specific">Specific View</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Base Price (TND)</label>
                  <input
                    type="number"
                    name="basePrice"
                    value={formData.basePrice}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Summer Price (TND)</label>
                  <input
                    type="number"
                    name="summerPrice"
                    value={formData.summerPrice}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Winter Price (TND)</label>
                  <input
                    type="number"
                    name="winterPrice"
                    value={formData.winterPrice}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                  >
                    <option value="available">Available</option>
                    <option value="occupied">Occupied</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="cleaning">Cleaning</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setEditingRoom(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-800 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
