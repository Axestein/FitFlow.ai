import { useState, useEffect } from 'react';
import Aditya from "../assets/Aditya.jpg";
import Sameer from "../assets/Sameer.jpeg";
import Arhaan from "../assets/Arhaan.jpeg";
import Atharv from "../assets/ATharv.jpeg";

const Leaderboard = () => {
  const [timeframe, setTimeframe] = useState('weekly')
  const [category, setCategory] = useState('all')
  const [showDetails, setShowDetails] = useState(null)
  
  const categories = [
    { id: 'all', name: 'Overall' },
    { id: 'strength', name: 'Strength' },
    { id: 'cardio', name: 'Cardio' },
    { id: 'consistency', name: 'Consistency' },
    { id: 'progress', name: 'Progress' }
  ]
  
  const timeframes = [
    { id: 'weekly', name: 'This Week' },
    { id: 'monthly', name: 'This Month' },
    { id: 'alltime', name: 'All Time' }
  ]
  
  // Sample user data with our unique point system
  const users = [
    {
      id: 1,
      name: 'Aditya Kumar Singh',
      avatar: Aditya,
      rank: 1,
      tier: 'diamond',
      totalPoints: 8750,
      streakDays: 42,
      badges: ['5K Champion', 'Iron Pumper', 'Early Bird'],
      achievements: [
        { title: 'Perfect Week', points: 500, date: '2025-02-20', icon: '🏆' },
        { title: '10K Steps Daily', points: 300, date: '2025-02-18', icon: '👣' }
      ],
      pointBreakdown: {
        strength: 3200,
        cardio: 2800,
        consistency: 1950,
        progress: 800
      },
      recentActivities: [
        { type: 'Deadlift PR', value: '350 lbs', points: 250, date: '2025-02-24' },
        { type: 'Running', value: '10K', points: 200, date: '2025-02-22' }
      ]
    },
    {
      id: 2,
      name: 'Sameer Yadav',
      avatar: Sameer,
      rank: 2,
      tier: 'platinum',
      totalPoints: 8120,
      streakDays: 35,
      badges: ['Marathon Finisher', 'Nutrition Expert'],
      achievements: [
        { title: 'Running Streak', points: 450, date: '2025-02-22', icon: '🏃‍♀️' },
        { title: 'Macro Perfect', points: 380, date: '2025-02-20', icon: '🥗' }
      ],
      pointBreakdown: {
        strength: 2100,
        cardio: 3500,
        consistency: 1720,
        progress: 800
      },
      recentActivities: [
        { type: 'Half Marathon', value: '1:45:30', points: 350, date: '2025-02-23' },
        { type: 'Yoga Session', value: '60 min', points: 120, date: '2025-02-21' }
      ]
    },
    {
      id: 3,
      name: 'Arhaan Sidhiquee',
      avatar: Arhaan,
      rank: 3,
      tier: 'gold',
      totalPoints: 7350,
      streakDays: 21,
      badges: ['Flexibility Master', 'Morning Warrior'],
      achievements: [
        { title: 'Consistency Queen', points: 380, date: '2025-02-15', icon: '👑' }
      ],
      pointBreakdown: {
        strength: 2400,
        cardio: 2200,
        consistency: 1950,
        progress: 800
      },
      recentActivities: [
        { type: 'Pilates', value: '75 min', points: 150, date: '2025-02-24' },
        { type: 'Swimming', value: '2000m', points: 220, date: '2025-02-22' }
      ]
    },
    {
      id: 4,
      name: 'Atharv Dwivedi',
      avatar: Atharv,
      rank: 4,
      tier: 'silver',
      totalPoints: 6250,
      streakDays: 14,
      badges: ['Nutrition Master'],
      achievements: [
        { title: 'Perfect Macros', points: 350, date: '2025-02-18', icon: '🍎' }
      ],
      pointBreakdown: {
        strength: 2200,
        cardio: 1800,
        consistency: 1050,
        progress: 1200
      },
      recentActivities: [
        { type: 'CrossFit', value: '45 min', points: 200, date: '2025-02-24' },
        { type: 'Running', value: '5K', points: 150, date: '2025-02-22' }
      ]
    }
  ]
  
  // Filter users based on category
  const filteredUsers = category === 'all' 
    ? [...users].sort((a, b) => b.totalPoints - a.totalPoints) 
    : [...users].sort((a, b) => b.pointBreakdown[category] - a.pointBreakdown[category])
  
  // Calculate position changes (simulating previous week's data)
  useEffect(() => {
    // In a real app, you would fetch previous positions from your backend
  }, [timeframe, category])
  
  // Get tier color
  const getTierColor = (tier) => {
    switch(tier) {
      case 'diamond': return 'from-blue-400 to-purple-500';
      case 'platinum': return 'from-indigo-400 to-cyan-400';
      case 'gold': return 'from-yellow-400 to-amber-500';
      case 'silver': return 'from-gray-300 to-gray-400';
      default: return 'from-gray-200 to-gray-300';
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-[#48c4a4]">Fitness Leaderboard</h1>
        <p className="mt-2 text-lg text-gray-600">Compete, achieve, and rise to the top</p>
      </div>
      
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                category === cat.id
                  ? 'bg-[#48c4a4] text-white shadow-md'
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        <div className="flex bg-white rounded-lg shadow-sm overflow-hidden">
          {timeframes.map((time) => (
            <button
              key={time.id}
              onClick={() => setTimeframe(time.id)}
              className={`px-4 py-2 text-sm font-medium transition-all ${
                timeframe === time.id
                  ? 'bg-[#48c4a4] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {time.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Badges</th>
                <th scope="col" className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <>
                  <tr key={user.id} className={`hover:bg-gray-50 transition-colors ${showDetails === user.id ? 'bg-green-100' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${getTierColor(user.tier)} text-white font-bold`}>
                          {index + 1}
                        </div>
                        <div className="ml-2 text-xs text-gray-500">
                          {Math.random() > 0.5 ? (
                            <span className="text-green-500 flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                              </svg>
                              {Math.floor(Math.random() * 3) + 1}
                            </span>
                          ) : index === 0 ? (
                            <span className="text-gray-400">-</span>
                          ) : (
                            <span className="text-red-500 flex items-center">
                              <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                              </svg>
                              {Math.floor(Math.random() * 3) + 1}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <img className="h-10 w-10 rounded-full" src={user.avatar} alt={user.name} />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center">
                            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getTierColor(user.tier)}`}></div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="flex items-center text-xs text-gray-500">
                            <span className={`inline-block w-2 h-2 rounded-full bg-green-100 mr-1`}></span>
                            <span>Active now</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="text-sm font-medium text-gray-900">
                          {category === 'all' ? user.totalPoints.toLocaleString() : user.pointBreakdown[category].toLocaleString()}
                        </div>
                        {category === 'all' && (
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                            <div className="flex">
                              <div className="bg-red-400 h-1.5 rounded-l-full" style={{ width: `${Math.round((user.pointBreakdown.strength / user.totalPoints) * 100)}%` }}></div>
                              <div className="bg-blue-400 h-1.5" style={{ width: `${Math.round((user.pointBreakdown.cardio / user.totalPoints) * 100)}%` }}></div>
                              <div className="bg-green-400 h-1.5" style={{ width: `${Math.round((user.pointBreakdown.consistency / user.totalPoints) * 100)}%` }}></div>
                              <div className="bg-purple-400 h-1.5 rounded-r-full" style={{ width: `${Math.round((user.pointBreakdown.progress / user.totalPoints) * 100)}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z"></path>
                          </svg>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-900">{user.streakDays} days</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex -space-x-1">
                        {user.badges.slice(0, 3).map((badge, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs border-2 border-white" title={badge}>
                            {badge[0]}
                          </div>
                        ))}
                        {user.badges.length > 3 && (
                          <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-xs border-2 border-white">
                            +{user.badges.length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setShowDetails(showDetails === user.id ? null : user.id)}
                        className="text-[#48c4a4] hover:text-green-800"
                      >
                        {showDetails === user.id ? 'Hide' : 'Details'}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Details Row */}
                  {showDetails === user.id && (
                    <tr className="bg-green-200">
                      <td colSpan="6" className="px-6 py-4">
                        <div className="flex flex-col space-y-4">
                          {/* Point Breakdown */}
                          <div>
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Point Breakdown</h4>
                            <div className="grid grid-cols-4 gap-4">
                              <div className="bg-white p-3 rounded shadow-sm">
                                <div className="text-xs text-gray-500">Strength</div>
                                <div className="text-lg font-semibold">{user.pointBreakdown.strength.toLocaleString()}</div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div className="bg-red-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, Math.round((user.pointBreakdown.strength / 4000) * 100))}%` }}></div>
                                </div>
                              </div>
                              <div className="bg-white p-3 rounded shadow-sm">
                                <div className="text-xs text-gray-500">Cardio</div>
                                <div className="text-lg font-semibold">{user.pointBreakdown.cardio.toLocaleString()}</div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, Math.round((user.pointBreakdown.cardio / 4000) * 100))}%` }}></div>
                                </div>
                              </div>
                              <div className="bg-white p-3 rounded shadow-sm">
                                <div className="text-xs text-gray-500">Consistency</div>
                                <div className="text-lg font-semibold">{user.pointBreakdown.consistency.toLocaleString()}</div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div className="bg-green-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, Math.round((user.pointBreakdown.consistency / 2000) * 100))}%` }}></div>
                                </div>
                              </div>
                              <div className="bg-white p-3 rounded shadow-sm">
                                <div className="text-xs text-gray-500">Progress</div>
                                <div className="text-lg font-semibold">{user.pointBreakdown.progress.toLocaleString()}</div>
                                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                                  <div className="bg-purple-400 h-1.5 rounded-full" style={{ width: `${Math.min(100, Math.round((user.pointBreakdown.progress / 1500) * 100))}%` }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Recent Activities and Achievements */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Activities</h4>
                              <div className="space-y-2">
                                {user.recentActivities.map((activity, i) => (
                                  <div key={i} className="bg-white p-3 rounded shadow-sm">
                                    <div className="flex justify-between">
                                      <span className="text-sm font-medium">{activity.type}</span>
                                      <span className="text-sm text-green-600">+{activity.points}</span>
                                    </div>
                                    <div className="flex justify-between mt-1">
                                      <span className="text-xs text-gray-500">{activity.value}</span>
                                      <span className="text-xs text-gray-500">{activity.date}</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Achievements</h4>
                              <div className="space-y-2">
                                {user.achievements.map((achievement, i) => (
                                  <div key={i} className="bg-white p-3 rounded shadow-sm">
                                    <div className="flex items-center">
                                      <span className="text-xl mr-2">{achievement.icon}</span>
                                      <div>
                                        <div className="text-sm font-medium">{achievement.title}</div>
                                        <div className="flex justify-between mt-1">
                                          <span className="text-xs text-green-600">+{achievement.points} points</span>
                                          <span className="text-xs text-gray-500">{achievement.date}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Point System Explanation */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">FitScore Point System</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">How Points Are Earned</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-500 flex items-center justify-center mr-2 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span><strong>Strength:</strong> Earn points for weight lifted, personal records, and completion of strength workouts</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mr-2 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span><strong>Cardio:</strong> Points based on distance, intensity, calories burned, and heart rate zones</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 text-green-500 flex items-center justify-center mr-2 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span><strong>Consistency:</strong> Daily check-ins, streak bonuses, and completing scheduled workouts</span>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-purple-100 text-purple-500 flex items-center justify-center mr-2 mt-0.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <span><strong>Progress:</strong> Body composition improvements, skill advancements, and fitness test results</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Tiers and Rewards</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-lg text-white">
                <div className="text-xs opacity-80">Diamond Tier</div>
                <div className="text-sm font-bold">8,000+ points</div>
                <div className="text-xs mt-1">Premium content access</div>
              </div>
              <div className="bg-gradient-to-r from-indigo-400 to-cyan-400 p-3 rounded-lg text-white">
                <div className="text-xs opacity-80">Platinum Tier</div>
                <div className="text-sm font-bold">7,000-7,999 points</div>
                <div className="text-xs mt-1">Personal trainer consult</div>
              </div>
              <div className="bg-gradient-to-r from-yellow-400 to-amber-500 p-3 rounded-lg text-white">
                <div className="text-xs opacity-80">Gold Tier</div>
                <div className="text-sm font-bold">5,000-6,999 points</div>
                <div className="text-xs mt-1">Exclusive challenges</div>
              </div>
              <div className="bg-gradient-to-r from-gray-300 to-gray-400 p-3 rounded-lg text-white">
                <div className="text-xs opacity-80">Silver Tier</div>
                <div className="text-sm font-bold">2,000-4,999 points</div>
                <div className="text-xs mt-1">Community features</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leaderboard