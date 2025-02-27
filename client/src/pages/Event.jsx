import { useState } from "react";
import { events } from "../data/data";

export const Event = () => {
  const [filter, setFilter] = useState("All");
  const [registered, setRegistered] = useState([]);
  const [showRegistered, setShowRegistered] = useState(false);

  const handleJoin = (event) => {
    setRegistered([...registered, event]);
  };

  const handleUnregister = (event) => {
    setRegistered(registered.filter((e) => e.id !== event.id));
  };

  const filteredEvents = filter === "All" ? events : events.filter((event) => event.type === filter);

  const EventCard = ({ event }) => {
    const isRegistered = registered.some((e) => e.id === event.id);
    
    return (
      <div className="bg-white rounded-xl shadow-lg shadow-blue-100 p-6 transition-all duration-200 hover:shadow-xl hover:scale-102 border border-blue-50">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-bold text-gray-800">{event.name}</h3>
          <span className={`text-xs font-medium px-3 py-1 rounded-full ${
            event.type === "Online" 
              ? "bg-blue-100 text-blue-700" 
              : "bg-indigo-100 text-indigo-700"
          }`}>
            {event.type}
          </span>
        </div>
        
        <p className="mt-2 text-blue-600 font-medium">{event.theme}</p>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Date & Time</span>
            <span className="text-sm font-medium text-gray-700">{event.date}, {event.time}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">Day</span>
            <span className="text-sm font-medium text-gray-700">{event.day}</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-blue-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full w-6 h-6 flex items-center justify-center">
                <span className="text-xs text-blue-700">{event.participants}</span>
              </div>
              <span className="text-sm text-gray-600 ml-2">Participants</span>
            </div>
            
            {isRegistered ? (
              <button 
                onClick={() => handleUnregister(event)} 
                className="text-sm bg-white text-blue-600 border border-blue-200 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Unregister
              </button>
            ) : (
              <button 
                onClick={() => handleJoin(event)} 
                className="text-sm bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors shadow-md shadow-blue-200"
              >
                Join Event
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Health <span className="text-blue-600">Events</span>
            </h1>
            <p className="mt-2 text-gray-600">Discover and join health-related events that matter to you</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button 
              onClick={() => setShowRegistered(!showRegistered)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                showRegistered 
                  ? "bg-blue-100 text-blue-700" 
                  : "bg-white text-gray-700 shadow-md"
              }`}
            >
              {showRegistered ? "All Events" : "My Events"}
            </button>
            
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)} 
              className="bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md border-0 focus:ring-2 focus:ring-blue-500 text-sm font-medium"
            >
              <option value="All">All Events</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
          </div>
        </div>
        
        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(showRegistered ? registered : filteredEvents).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          
          {(showRegistered ? registered.length === 0 : filteredEvents.length === 0) && (
            <div className="col-span-full py-20 flex flex-col items-center justify-center text-center">
              <div className="bg-blue-100 rounded-full p-6 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800">No events found</h3>
              <p className="mt-2 text-gray-600">
                {showRegistered 
                  ? "You haven't registered for any events yet." 
                  : "No events match your current filter."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;