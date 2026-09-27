import React, { useState } from 'react';
import { useStore } from './store/useStore';
import {
  Car,
  Zap,
  ShieldCheck,
  Users,
  Navigation,
  MapPin,
  Clock,
  DollarSign,
  Star,
  MessageSquare,
  Phone,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  Send,
  Sparkles,
  Award,
  Layers,
  ShieldAlert
} from 'lucide-react';

export default function App() {
  const {
    userRole,
    setUserRole,
    activeTab,
    setActiveTab,
    pickup,
    dropoff,
    setPickup,
    setDropoff,
    popularLocations,
    selectedTier,
    setSelectedTier,
    tiers,
    tripStatus,
    driverLocation,
    riderLocation,
    destinationLocation,
    etaSeconds,
    assignedDriver,
    chatMessages,
    rideHistory,
    requestRide,
    advanceTripStatus,
    resetRide,
    submitRating,
    sendChatMessage
  } = useStore();

  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [tipSelection, setTipSelection] = useState(5);
  const [starRating, setStarRating] = useState(5);

  const selectedTierObj = tiers.find(t => t.id === selectedTier) || tiers[0];

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    sendChatMessage(chatInput);
    setChatInput('');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100 font-sans flex flex-col selection:bg-yellow-400 selection:text-black">
      {/* Top Telemetry Header */}
      <header className="bg-black/90 border-b border-zinc-800/80 backdrop-blur sticky top-0 z-40 px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-yellow-400 flex items-center justify-center font-display font-black text-black text-xl shadow-lg shadow-yellow-400/20">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-lg tracking-wider text-white">VOLTCAB</span>
              <span className="text-[10px] font-mono font-bold bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-2 py-0.5 rounded">
                NYC FLEET TELEMETRY
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-mono">AUTONOMOUS DISPATCH & ZERO-EMISSION RIDES</p>
          </div>
        </div>

        {/* View mode switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-zinc-900 border border-zinc-800 p-1 rounded-xl text-xs font-mono">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'map' ? 'bg-yellow-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Live Map
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg transition ${
                activeTab === 'history' ? 'bg-yellow-400 text-black font-bold' : 'text-zinc-400 hover:text-white'
              }`}
            >
              Trips & Receipts ({rideHistory.length})
            </button>
          </div>

          {/* Driver cockpit simulation trigger */}
          <button
            onClick={() => setUserRole(userRole === 'rider' ? 'driver' : 'rider')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-xl text-xs font-mono transition"
          >
            Role: <span className="text-yellow-400 font-bold uppercase">{userRole}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
        {/* MAP VIEW */}
        {activeTab === 'map' && (
          <>
            {/* Full-bleed interactive Map Canvas / SVG mockup */}
            <div className="relative flex-1 h-[450px] lg:h-auto bg-[#07090e] overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800">
              {/* Grid Roads */}
              <svg className="w-full h-full opacity-30 absolute inset-0" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
                    <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#27272a" strokeWidth="1" />
                    <circle cx="40" cy="40" r="1.5" fill="#3f3f46" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Major Avenues */}
                <path d="M 0 150 Q 400 200 900 120" stroke="#eab308" strokeWidth="2" fill="none" strokeDasharray="6,6" opacity="0.4" />
                <path d="M 200 0 Q 300 400 400 800" stroke="#eab308" strokeWidth="2" fill="none" strokeDasharray="6,6" opacity="0.4" />
                <path d="M 50 450 C 300 400, 600 500, 1000 350" stroke="#3b82f6" strokeWidth="3" fill="none" opacity="0.3" />
              </svg>

              {/* Rider Pickup Pin */}
              <div
                className="absolute z-20 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700"
                style={{ left: `${riderLocation.x}%`, top: `${riderLocation.y}%` }}
              >
                <div className="px-2.5 py-1 rounded bg-black/90 border border-yellow-400 text-yellow-400 text-[10px] font-mono font-bold shadow-xl mb-1 whitespace-nowrap">
                  📍 Pickup: {pickup}
                </div>
                <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black animate-ping absolute"></div>
                <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-black"></div>
              </div>

              {/* Destination Pin */}
              <div
                className="absolute z-20 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${destinationLocation.x}%`, top: `${destinationLocation.y}%` }}
              >
                <div className="px-2.5 py-1 rounded bg-black/90 border border-zinc-700 text-zinc-300 text-[10px] font-mono mb-1 whitespace-nowrap">
                  🏁 Destination: {dropoff}
                </div>
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-black"></div>
              </div>

              {/* Active Driver Taxi Marker */}
              {tripStatus !== 'idle' && (
                <div
                  className="absolute z-30 flex flex-col items-center transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
                  style={{
                    left: tripStatus === 'in_trip' ? `${(riderLocation.x + destinationLocation.x) / 2}%` : `${driverLocation.x}%`,
                    top: tripStatus === 'in_trip' ? `${(riderLocation.y + destinationLocation.y) / 2}%` : `${driverLocation.y}%`
                  }}
                >
                  <div className="bg-yellow-400 text-black font-mono font-bold text-[10px] px-2 py-0.5 rounded shadow-lg flex items-center gap-1 mb-1">
                    <Car className="w-3 h-3" /> {assignedDriver.name}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-black flex items-center justify-center text-black font-bold shadow-xl pulse-gold">
                    🚖
                  </div>
                </div>
              )}

              {/* Map Floating HUD Overlay */}
              <div className="absolute top-4 left-4 z-20 bg-black/80 backdrop-blur border border-zinc-800 p-3 rounded-xl max-w-xs text-xs font-mono space-y-1">
                <div className="text-zinc-400 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-yellow-400" />
                  <span className="text-white font-bold">MANHATTAN CENTRAL ZONE</span>
                </div>
                <div className="text-[11px] text-zinc-500">Live Traffic: Optimal • Surge Pricing: Normal (1.0x)</div>
              </div>

              {/* Trip Advance Controls for testing / driver mode */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-black/90 backdrop-blur border border-zinc-800 p-2 rounded-xl text-xs font-mono">
                <span className="text-zinc-400 px-1">Simulator Status:</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800 text-yellow-400 font-bold uppercase">{tripStatus}</span>
                {tripStatus !== 'idle' && tripStatus !== 'completed' && (
                  <button
                    onClick={advanceTripStatus}
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg flex items-center gap-1 transition"
                  >
                    Next Stage <ArrowRight className="w-3 h-3" />
                  </button>
                )}
                {tripStatus === 'completed' && (
                  <button
                    onClick={resetRide}
                    className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold rounded-lg flex items-center gap-1 transition"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
            </div>

            {/* SIDE DISPATCH & BOOKING PANEL */}
            <div className="w-full lg:w-[450px] bg-zinc-950 border-t lg:border-t-0 p-6 flex flex-col justify-between overflow-y-auto space-y-6">
              {tripStatus === 'idle' ? (
                /* RIDER SEARCH & BOOKING FORM */
                <div className="space-y-5">
                  <div>
                    <h2 className="text-lg font-bold font-display text-white">Where to today?</h2>
                    <p className="text-xs text-zinc-400 font-mono">Select route and vehicle class for instant dispatch.</p>
                  </div>

                  {/* Route inputs */}
                  <div className="space-y-3 bg-zinc-900/60 p-4 rounded-xl border border-zinc-800 text-xs font-mono">
                    <div className="space-y-1">
                      <label className="text-zinc-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-yellow-400"></span> Pickup Location
                      </label>
                      <input
                        type="text"
                        value={pickup}
                        onChange={e => setPickup(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-yellow-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-zinc-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Destination
                      </label>
                      <input
                        type="text"
                        value={dropoff}
                        onChange={e => setDropoff(e.target.value)}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-zinc-200 focus:outline-none focus:border-yellow-400"
                      />
                    </div>
                  </div>

                  {/* Quick destination tags */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">Popular Hotspots</span>
                    <div className="grid grid-cols-2 gap-2">
                      {popularLocations.map(loc => (
                        <button
                          key={loc.name}
                          onClick={() => setDropoff(loc.name)}
                          className="p-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-left transition"
                        >
                          <div className="text-xs font-semibold text-zinc-200 truncate">{loc.name}</div>
                          <div className="text-[10px] text-zinc-500 font-mono">{loc.eta} • {loc.dist}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Vehicle Tiers */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">Select Fleet Class</span>
                    <div className="space-y-2">
                      {tiers.map(tier => (
                        <div
                          key={tier.id}
                          onClick={() => setSelectedTier(tier.id)}
                          className={`p-3 rounded-xl border transition cursor-pointer flex items-center justify-between ${
                            selectedTier === tier.id
                              ? 'bg-yellow-400/10 border-yellow-400'
                              : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-lg bg-zinc-800 flex items-center justify-center text-yellow-400">
                              {tier.id === 'comfort' ? <Zap className="w-4 h-4" /> : <Car className="w-4 h-4" />}
                            </div>
                            <div>
                              <div className="font-bold text-xs text-white">{tier.name}</div>
                              <div className="text-[10px] text-zinc-400 font-mono">{tier.eta} away • {tier.capacity} seats</div>
                            </div>
                          </div>
                          <div className="text-right font-mono">
                            <div className="font-bold text-sm text-yellow-400">${tier.price.toFixed(2)}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dispatch Request Button */}
                  <button
                    onClick={requestRide}
                    className="w-full py-3.5 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-bold text-sm rounded-xl shadow-lg shadow-yellow-400/20 transition flex items-center justify-center gap-2"
                  >
                    Confirm & Request {selectedTierObj.name} (${selectedTierObj.price.toFixed(2)})
                  </button>
                </div>
              ) : tripStatus === 'searching' ? (
                /* SEARCHING ANIMATION */
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 p-8">
                  <div className="w-16 h-16 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
                  <h3 className="font-display font-bold text-lg text-white">Matching Nearby Chauffeurs...</h3>
                  <p className="text-xs text-zinc-400 font-mono">Optimizing route telemetry & battery efficiency</p>
                </div>
              ) : tripStatus === 'completed' ? (
                /* TRIP COMPLETED & RATING MODAL */
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-yellow-400 mx-auto" />
                    <h3 className="font-display font-bold text-xl text-white">You Have Arrived!</h3>
                    <p className="text-xs text-zinc-400 font-mono">Total Fare: ${selectedTierObj.price.toFixed(2)}</p>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 text-center space-y-2">
                    <span className="text-xs font-mono text-zinc-300">Rate your chauffeur, {assignedDriver.name}:</span>
                    <div className="flex justify-center gap-2">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          onClick={() => setStarRating(star)}
                          className={`p-1 text-lg ${star <= starRating ? 'text-yellow-400' : 'text-zinc-600'}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Tip Selection */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-zinc-400">Add an optional tip:</span>
                    <div className="grid grid-cols-4 gap-2 font-mono text-xs">
                      {[0, 2, 5, 10].map(tip => (
                        <button
                          key={tip}
                          onClick={() => setTipSelection(tip)}
                          className={`py-2 rounded-lg border transition ${
                            tipSelection === tip
                              ? 'bg-yellow-400 text-black font-bold border-yellow-400'
                              : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                          }`}
                        >
                          {tip === 0 ? 'No Tip' : `$${tip}`}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      submitRating(rideHistory[0]?.id, starRating, tipSelection);
                      resetRide();
                    }}
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-mono font-bold text-xs rounded-xl shadow-lg transition"
                  >
                    Submit Feedback & Complete Trip
                  </button>
                </div>
              ) : (
                /* LIVE TRIP PROGRESS & DRIVER CARD */
                <div className="space-y-5">
                  <div className="bg-yellow-400/10 border border-yellow-400/30 p-3.5 rounded-xl flex items-center justify-between font-mono">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400 animate-pulse" />
                      <span className="text-xs text-yellow-400 font-bold uppercase">
                        {tripStatus === 'assigned' ? 'Driver is En Route' : tripStatus === 'arriving' ? 'Driver has arrived!' : 'Trip in Progress'}
                      </span>
                    </div>
                    <span className="text-xs text-white font-bold">ETA: 3 mins</span>
                  </div>

                  {/* Driver Dossier */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 space-y-4">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={assignedDriver.avatar}
                        alt={assignedDriver.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
                      />
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm">{assignedDriver.name}</div>
                        <div className="text-xs text-yellow-400 font-mono font-semibold">{assignedDriver.rating} • {assignedDriver.trips}</div>
                        <div className="text-xs text-zinc-400 font-mono mt-0.5">{assignedDriver.vehicle}</div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-mono font-bold bg-zinc-950 px-2 py-1 rounded border border-zinc-700 text-white block">
                          {assignedDriver.plate}
                        </span>
                      </div>
                    </div>

                    {/* Quick Chauffeur Communication actions */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-800">
                      <button
                        onClick={() => setShowChat(!showChat)}
                        className="py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-yellow-400" />
                        In-App Chat ({chatMessages.length})
                      </button>
                      <button
                        onClick={() => alert(`Calling driver at ${assignedDriver.phone}...`)}
                        className="py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-mono flex items-center justify-center gap-1.5 transition"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-400" /> Call Chauffeur
                      </button>
                    </div>
                  </div>

                  {/* In-app Live Chat Drawer */}
                  {showChat && (
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 space-y-3">
                      <div className="text-xs font-mono font-bold text-zinc-300 pb-2 border-b border-zinc-800 flex justify-between">
                        <span>Direct Channel with Driver</span>
                        <span className="text-emerald-400">● Connected</span>
                      </div>

                      <div className="space-y-2 max-h-40 overflow-y-auto text-xs font-mono">
                        {chatMessages.map(m => (
                          <div
                            key={m.id}
                            className={`p-2 rounded-lg max-w-[80%] ${
                              m.sender === 'rider'
                                ? 'ml-auto bg-yellow-400 text-black font-semibold'
                                : 'mr-auto bg-zinc-950 border border-zinc-800 text-zinc-200'
                            }`}
                          >
                            <p>{m.text}</p>
                            <span className="text-[9px] opacity-70 block text-right mt-0.5">{m.time}</span>
                          </div>
                        ))}
                      </div>

                      <form onSubmit={handleSendChat} className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Type message to driver..."
                          value={chatInput}
                          onChange={e => setChatInput(e.target.value)}
                          className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-2 text-xs text-zinc-200 focus:outline-none focus:border-yellow-400"
                        />
                        <button
                          type="submit"
                          className="px-3 bg-yellow-400 hover:bg-yellow-300 text-black rounded-lg text-xs font-bold"
                        >
                          <Send className="w-3 h-3" />
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* RIDE HISTORY & RECEIPTS */}
        {activeTab === 'history' && (
          <div className="flex-1 p-6 max-w-4xl mx-auto space-y-6 overflow-y-auto">
            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-display text-white">Ride Receipts & Mileage History</h2>
                <p className="text-xs text-zinc-400 font-mono">Downloadable trip manifests and tax-deductible transport logs.</p>
              </div>
              <span className="text-xs font-mono bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 px-3 py-1 rounded-full">
                {rideHistory.length} Trips Recorded
              </span>
            </div>

            <div className="space-y-4">
              {rideHistory.map(trip => (
                <div key={trip.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-3 font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-yellow-400">{trip.id}</span>
                    <span className="text-xs text-zinc-500">{trip.date}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-zinc-500 block text-[10px]">ROUTE</span>
                      <div className="text-zinc-200">📍 {trip.pickup}</div>
                      <div className="text-zinc-200">🏁 {trip.dropoff}</div>
                    </div>
                    <div>
                      <span className="text-zinc-500 block text-[10px]">CHAUFFEUR & TIER</span>
                      <div className="text-zinc-200">{trip.driverName} • {trip.tier}</div>
                      <div className="text-yellow-400">Rating: {trip.ratingGiven ? `${trip.ratingGiven} ★` : '5 ★'}</div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-zinc-400">Total Charged: </span>
                      <span className="text-white font-bold text-sm">${(trip.fare + (trip.tip || 0)).toFixed(2)}</span>
                      {trip.tip > 0 && <span className="text-zinc-500 text-[10px] ml-1">(incl. ${trip.tip.toFixed(2)} tip)</span>}
                    </div>

                    <button
                      onClick={() => alert(`Exporting official PDF receipt for ${trip.id}...`)}
                      className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-xs font-semibold transition"
                    >
                      Download Invoice PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
