import React, { useState } from 'react';
import { Bell, Search, User, Users, Calendar, Award, MessageCircle, Plus, ChevronRight, Heart, Zap, Share2 } from 'lucide-react';

const Community = () => {
  const [selectedTab, setSelectedTab] = useState('home');
  const [expandedGroup, setExpandedGroup] = useState(null);

  const fitnessGroups = [
    { id: 1, name: 'Morning Runners', members: 245, category: 'Running', activities: 12, streak: 48 },
    { id: 2, name: 'Zumba Enthusiasts', members: 182, category: 'Zumba', activities: 8, streak: 23 },
    { id: 3, name: 'Marathon Prep 2025', members: 124, category: 'Marathon', activities: 15, streak: 67 },
    { id: 4, name: 'Sunset Yoga', members: 98, category: 'Yoga', activities: 6, streak: 19 },
  ];

  const userMilestones = [
    { id: 1, user: 'Morgan T.', achievement: 'Completed first 10K', date: '2 hours ago', likes: 24 },
    { id: 2, user: 'Alex W.', achievement: '30-day streak on Morning Runners', date: 'Yesterday', likes: 45 },
    { id: 3, user: 'Jamie K.', achievement: 'Lost 15 pounds with Zumba', date: '3 days ago', likes: 67 },
  ];

  const upcomingEvents = [
    { id: 1, name: 'City Park Run', date: 'March 5', group: 'Morning Runners', participants: 37 },
    { id: 2, name: 'Zumba Marathon', date: 'March 12', group: 'Zumba Enthusiasts', participants: 28 },
    { id: 3, name: 'Half-Marathon Training', date: 'March 15', group: 'Marathon Prep 2025', participants: 42 },
  ];

  const toggleGroupExpansion = (id) => {
    if (expandedGroup === id) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(id);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">FitConnect</h1>
          <div className="flex items-center space-x-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search groups, events..."
                className="bg-indigo-500 text-white placeholder-indigo-200 rounded-full py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Search className="absolute right-3 top-2 h-5 w-5 text-indigo-200" />
            </div>
            <Bell className="h-6 w-6 cursor-pointer" />
            <div className="w-8 h-8 bg-indigo-400 rounded-full flex items-center justify-center cursor-pointer">
              <User className="h-5 w-5" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation */}
      <nav className="bg-white shadow">
        <div className="container mx-auto flex">
          <button
            className={`px-6 py-4 font-medium ${selectedTab === 'home' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setSelectedTab('home')}
          >
            Home
          </button>
          <button
            className={`px-6 py-4 font-medium ${selectedTab === 'groups' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setSelectedTab('groups')}
          >
            Groups
          </button>
          <button
            className={`px-6 py-4 font-medium ${selectedTab === 'events' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setSelectedTab('events')}
          >
            Events
          </button>
          <button
            className={`px-6 py-4 font-medium ${selectedTab === 'progress' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'}`}
            onClick={() => setSelectedTab('progress')}
          >
            My Progress
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column - Groups */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow mb-6 overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  <Users className="mr-2" /> Popular Fitness Communities
                </h2>
                <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium flex items-center">
                  <Plus className="mr-1 h-5 w-5" /> Create Group
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {fitnessGroups.map((group) => (
                  <div key={group.id} className="p-4">
                    <div 
                      className="flex justify-between items-center cursor-pointer"
                      onClick={() => toggleGroupExpansion(group.id)}
                    >
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{group.name}</h3>
                        <p className="text-gray-500 text-sm">{group.category} • {group.members} members</p>
                      </div>
                      <button className="bg-indigo-100 hover:bg-indigo-200 text-indigo-600 px-4 py-2 rounded-lg font-medium transition-colors">
                        Join
                      </button>
                    </div>
                    
                    {expandedGroup === group.id && (
                      <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-3">
                          <div className="flex items-center text-gray-700">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span className="text-sm">{group.activities} upcoming activities</span>
                          </div>
                          <div className="flex items-center text-amber-500">
                            <Zap className="h-4 w-4 mr-1" />
                            <span className="text-sm">{group.streak} day streak</span>
                          </div>
                        </div>
                        <button className="w-full text-center py-2 text-indigo-600 font-medium flex items-center justify-center">
                          View Community <ChevronRight className="h-4 w-4 ml-1" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Events Section */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center">
                  <Calendar className="mr-2" /> Upcoming Events
                </h2>
                <button className="bg-white text-orange-500 px-4 py-2 rounded-lg font-medium">
                  View All
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">{event.name}</h3>
                      <p className="text-gray-500 text-sm">{event.date} • {event.group}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-500">{event.participants} going</span>
                      <button className="bg-green-100 hover:bg-green-200 text-green-600 px-4 py-2 rounded-lg font-medium transition-colors">
                        Join
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Achievements */}
          <div>
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="p-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white">
                <h2 className="text-xl font-bold flex items-center">
                  <Award className="mr-2" /> Community Achievements
                </h2>
              </div>
              <div className="divide-y divide-gray-100">
                {userMilestones.map((milestone) => (
                  <div key={milestone.id} className="p-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold mr-3 flex-shrink-0">
                        {milestone.user.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{milestone.user}</h3>
                        <p className="text-gray-800">{milestone.achievement}</p>
                        <div className="flex items-center mt-2 text-sm">
                          <span className="text-gray-500 mr-4">{milestone.date}</span>
                          <button className="flex items-center text-rose-500">
                            <Heart className="h-4 w-4 mr-1" /> {milestone.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button className="text-indigo-600 text-sm font-medium flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" /> Comment
                      </button>
                      <button className="text-gray-500 text-sm font-medium flex items-center">
                        <Share2 className="h-4 w-4 mr-1" /> Share
                      </button>
                    </div>
                  </div>
                ))}
                <div className="p-4 text-center">
                  <button className="text-indigo-600 font-medium">
                    View More Achievements
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Join */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow mt-6 p-6 text-white">
              <h2 className="text-xl font-bold mb-4">Ready to level up your fitness?</h2>
              <p className="mb-4">Join a community that matches your fitness goals and interests.</p>
              <button className="bg-white text-indigo-600 w-full py-3 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-colors">
                Find Your Fitness Tribe
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;