// Data service for managing room data
// This will make it easy to switch to a database later
//
// CURRENT IMPLEMENTATION:
// - Uses localStorage for persistence (survives page refreshes)
// - Falls back to API route (/api/rooms) if no localStorage data
// - Falls back to default data if API fails
//
// FUTURE DATABASE MIGRATION:
// - Replace localStorage with actual database calls
// - Update API routes to connect to database
// - Keep the same interface for easy migration

export class RoomDataService {
  static async getRooms() {
    try {
      // Try to get data from localStorage first
      const savedRooms = localStorage.getItem('hotelRooms')
      if (savedRooms) {
        return JSON.parse(savedRooms)
      }

      // If not in localStorage, try to fetch from API
      const response = await fetch('/api/rooms')
      if (response.ok) {
        const data = await response.json()
        return data.rooms
      }
      
      // Fallback to default data
      return this.getDefaultRooms()
    } catch (error) {
      console.error('Error loading rooms:', error)
      return this.getDefaultRooms()
    }
  }

  static async saveRooms(rooms) {
    try {
      // In a real app, this would be an API call to save to database
      // For now, we'll simulate saving to localStorage for persistence
      localStorage.setItem('hotelRooms', JSON.stringify(rooms))
      return true
    } catch (error) {
      console.error('Error saving rooms:', error)
      return false
    }
  }

  static async addRoom(room) {
    try {
      const rooms = await this.getRooms()
      const newRoom = {
        ...room,
        id: Date.now(), // Generate unique ID
        amenities: room.amenities || ['WiFi', 'Air Conditioning'],
        floor: room.floor || 1,
        roomType: room.roomType || 'Standard'
      }
      rooms.push(newRoom)
      await this.saveRooms(rooms)
      return newRoom
    } catch (error) {
      console.error('Error adding room:', error)
      return null
    }
  }

  static async updateRoom(roomId, updatedRoom) {
    try {
      const rooms = await this.getRooms()
      const roomIndex = rooms.findIndex(room => room.id === roomId)
      if (roomIndex !== -1) {
        rooms[roomIndex] = { ...rooms[roomIndex], ...updatedRoom }
        await this.saveRooms(rooms)
        return rooms[roomIndex]
      }
      return null
    } catch (error) {
      console.error('Error updating room:', error)
      return null
    }
  }

  static async deleteRoom(roomId) {
    try {
      const rooms = await this.getRooms()
      const filteredRooms = rooms.filter(room => room.id !== roomId)
      await this.saveRooms(filteredRooms)
      return true
    } catch (error) {
      console.error('Error deleting room:', error)
      return false
    }
  }

  static getDefaultRooms() {
    return [
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
        winterPrice: 250,
        amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Sea View'],
        floor: 1,
        roomType: 'Standard'
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
        winterPrice: 350,
        amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Pool View', 'Balcony'],
        floor: 1,
        roomType: 'Deluxe'
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
        winterPrice: 300,
        amenities: ['WiFi', 'Air Conditioning', 'Sea View', 'Balcony'],
        floor: 2,
        roomType: 'Standard'
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
        winterPrice: 450,
        amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Pool View', 'Balcony', 'Kitchenette'],
        floor: 2,
        roomType: 'Suite'
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
        winterPrice: 400,
        amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Mountain View', 'Balcony'],
        floor: 3,
        roomType: 'Deluxe'
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
        winterPrice: 220,
        amenities: ['WiFi', 'Air Conditioning'],
        floor: 3,
        roomType: 'Economy'
      },
      {
        id: 7,
        roomNumber: '401',
        bedrooms: 2,
        maxGuests: 4,
        viewType: 'sea',
        status: 'available',
        guestName: null,
        checkIn: null,
        checkOut: null,
        basePrice: 550,
        summerPrice: 800,
        winterPrice: 500,
        amenities: ['WiFi', 'Air Conditioning', 'Mini Bar', 'Sea View', 'Balcony', 'Jacuzzi'],
        floor: 4,
        roomType: 'Premium'
      },
      {
        id: 8,
        roomNumber: '402',
        bedrooms: 1,
        maxGuests: 2,
        viewType: 'pool',
        status: 'available',
        guestName: null,
        checkIn: null,
        checkOut: null,
        basePrice: 320,
        summerPrice: 480,
        winterPrice: 280,
        amenities: ['WiFi', 'Air Conditioning', 'Pool View'],
        floor: 4,
        roomType: 'Standard'
      }
    ]
  }

  // Initialize data from localStorage or JSON file
  static async initializeData() {
    try {
      // Check if we have data in localStorage first
      const savedRooms = localStorage.getItem('hotelRooms')
      if (savedRooms) {
        return JSON.parse(savedRooms)
      }

      // If not, try to load from JSON file
      const rooms = await this.getRooms()
      await this.saveRooms(rooms)
      return rooms
    } catch (error) {
      console.error('Error initializing data:', error)
      const defaultRooms = this.getDefaultRooms()
      await this.saveRooms(defaultRooms)
      return defaultRooms
    }
  }
}
