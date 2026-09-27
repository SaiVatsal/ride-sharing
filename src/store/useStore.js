import { create } from 'zustand';

export const useStore = create((set, get) => ({
  userRole: 'rider', // 'rider' | 'driver'
  activeTab: 'map', // 'map' | 'history' | 'driverCockpit'

  // Locations
  pickup: 'SOHO, 114 Mercer St',
  dropoff: 'JFK Terminal 4 Departure',

  popularLocations: [
    { name: 'JFK International Airport (T4)', address: 'Queens, NY 11430', eta: '28 min', dist: '16.4 mi' },
    { name: 'Financial District, Wall St', address: '11 Wall Street, NY 10005', eta: '12 min', dist: '3.8 mi' },
    { name: 'Williamsburg Waterfront', address: 'Kent Ave & N 6th, Brooklyn', eta: '15 min', dist: '4.9 mi' },
    { name: 'Times Square Central', address: 'Broadway & 45th St, NY 10036', eta: '18 min', dist: '5.2 mi' }
  ],

  selectedTier: 'standard',
  tiers: [
    { id: 'standard', name: 'Volt Economy', price: 28.50, eta: '3 min', capacity: 4, icon: 'Car', description: 'Affordable, everyday reliable sedans' },
    { id: 'comfort', name: 'Volt Green EV', price: 34.00, eta: '4 min', capacity: 4, icon: 'Zap', description: '100% Zero-emission quiet electric luxury' },
    { id: 'black', name: 'Volt Black Executive', price: 58.00, eta: '2 min', capacity: 4, icon: 'ShieldCheck', description: 'Top-rated chauffeurs in pristine black SUVs' },
    { id: 'xl', name: 'Volt Van XL', price: 46.50, eta: '6 min', capacity: 6, icon: 'Users', description: 'Spacious 6-passenger van with trunk capacity' }
  ],

  // Trip state machine
  tripStatus: 'idle', // 'idle' | 'searching' | 'assigned' | 'arriving' | 'in_trip' | 'completed'
  driverLocation: { x: 35, y: 40 }, // percentage on map
  riderLocation: { x: 45, y: 55 },
  destinationLocation: { x: 75, y: 25 },
  etaSeconds: 180,

  assignedDriver: {
    name: 'Marcus Sterling',
    rating: '4.98 ★',
    trips: '4,280 trips',
    vehicle: '2025 Tesla Model S Plaid',
    plate: 'NY • VOLT-88',
    phone: '+1 (555) 839-2041',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  },

  chatMessages: [
    { id: 'msg-1', sender: 'driver', text: 'Hello! I am 2 minutes away in the black Tesla. Hazard lights on.', time: '14:22' }
  ],

  rideHistory: [
    {
      id: 'TRIP-9941',
      date: 'Today, 11:45 AM',
      pickup: '42 Grosvenor St, SoHo',
      dropoff: 'JFK International Airport',
      tier: 'Volt Green EV',
      fare: 34.00,
      tip: 5.00,
      driverName: 'Marcus Sterling',
      ratingGiven: 5,
      status: 'Completed'
    },
    {
      id: 'TRIP-9812',
      date: 'Yesterday, 8:15 PM',
      pickup: 'Hudson Yards Vessel',
      dropoff: '114 Mercer St, SoHo',
      tier: 'Volt Black Executive',
      fare: 58.00,
      tip: 10.00,
      driverName: 'Elena Rostova',
      ratingGiven: 5,
      status: 'Completed'
    }
  ],

  // Actions
  setUserRole: (role) => set({ userRole: role }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setPickup: (p) => set({ pickup: p }),
  setDropoff: (d) => set({ dropoff: d }),
  setSelectedTier: (tier) => set({ selectedTier: tier }),

  // Request ride
  requestRide: () => {
    set({ tripStatus: 'searching' });
    setTimeout(() => {
      set({ tripStatus: 'assigned', etaSeconds: 180 });
    }, 2000);
  },

  // Driver advances trip
  advanceTripStatus: () => set((state) => {
    if (state.tripStatus === 'assigned') return { tripStatus: 'arriving', etaSeconds: 60 };
    if (state.tripStatus === 'arriving') return { tripStatus: 'in_trip', etaSeconds: 420 };
    if (state.tripStatus === 'in_trip') {
      const currentTierObj = state.tiers.find(t => t.id === state.selectedTier) || state.tiers[0];
      const newHistory = {
        id: `TRIP-${Math.floor(1000 + Math.random() * 9000)}`,
        date: 'Just now',
        pickup: state.pickup,
        dropoff: state.dropoff,
        tier: currentTierObj.name,
        fare: currentTierObj.price,
        tip: 0,
        driverName: state.assignedDriver.name,
        ratingGiven: null,
        status: 'Completed'
      };
      return {
        tripStatus: 'completed',
        rideHistory: [newHistory, ...state.rideHistory]
      };
    }
    return state;
  }),

  // Reset to idle
  resetRide: () => set({
    tripStatus: 'idle',
    chatMessages: [{ id: 'msg-1', sender: 'driver', text: 'Hello! I am on my way.', time: 'Just now' }]
  }),

  // Add tip and rating
  submitRating: (tripId, stars, tipAmount) => set((state) => ({
    rideHistory: state.rideHistory.map(r =>
      r.id === tripId ? { ...r, ratingGiven: stars, tip: Number(tipAmount || 0) } : r
    )
  })),

  // Send in-app chat
  sendChatMessage: (text) => set((state) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: state.userRole === 'driver' ? 'driver' : 'rider',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    return {
      chatMessages: [...state.chatMessages, newMsg]
    };
  })
}));
