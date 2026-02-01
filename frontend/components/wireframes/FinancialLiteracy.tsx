'use client';

import React, { useState } from 'react';
import { PiggyBank, Trophy, Star, Target, BookOpen, Gamepad2, Gift, Coins, TrendingUp, Award, Heart, Brain } from 'lucide-react';

export function FinancialLiteracyWireframe() {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [userLevel, setUserLevel] = useState(5);
  const [coins, setCoins] = useState(1250);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 rounded-lg">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Kids Financial Literacy Hub</h2>
        <p className="text-gray-600">Fun, interactive learning platform to teach kids about money, savings, and smart spending</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Kid's Profile Stats */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-lg p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <PiggyBank className="w-8 h-8" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">Level {userLevel}</div>
              <div className="text-xs opacity-90">Money Master</div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm">💰 KudiCoins</span>
              <span className="font-bold">{coins}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">🏆 Achievements</span>
              <span className="font-bold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">📚 Lessons Done</span>
              <span className="font-bold">28</span>
            </div>
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">On Track</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">68%</div>
          <div className="text-sm text-gray-600">Learning Progress</div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </div>

        {/* Weekly Streak */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-6 h-6 text-orange-500" />
            <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">Hot!</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">7 Days</div>
          <div className="text-sm text-gray-600">Learning Streak</div>
          <div className="mt-3 flex space-x-1">
            {[1,2,3,4,5,6,7].map((day) => (
              <div key={day} className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold">✓</span>
              </div>
            ))}
          </div>
        </div>

        {/* Next Goal */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-6 h-6 text-blue-500" />
            <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">Active</span>
          </div>
          <div className="text-2xl font-bold text-gray-800">Savings Pro</div>
          <div className="text-sm text-gray-600">Next Achievement</div>
          <div className="mt-3">
            <div className="text-xs text-gray-500 mb-1">Save ₦500 more</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Learning Area */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-purple-600" />
                Learning Adventure
              </h3>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setActiveModule('dashboard')}
                  className={`px-3 py-1 rounded-lg text-sm ${activeModule === 'dashboard' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => setActiveModule('lessons')}
                  className={`px-3 py-1 rounded-lg text-sm ${activeModule === 'lessons' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Lessons
                </button>
                <button 
                  onClick={() => setActiveModule('games')}
                  className={`px-3 py-1 rounded-lg text-sm ${activeModule === 'games' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  Games
                </button>
              </div>
            </div>

            {activeModule === 'dashboard' && (
              <div className="space-y-4">
                {/* Today's Mission */}
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-800 mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Today's Mission: "Smart Shopper"
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm">Learn about needs vs wants</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                      <span className="text-sm">Practice making smart choices</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-purple-300 rounded-full mr-2"></div>
                      <span className="text-sm">Complete the shopping game</span>
                    </div>
                  </div>
                  <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
                    Start Mission →
                  </button>
                </div>

                {/* Quick Learning Modules */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center mb-2">
                      <PiggyBank className="w-6 h-6 text-blue-600 mr-2" />
                      <span className="font-medium text-sm">Saving Money</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Learn why saving is important</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-600">5 lessons</span>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Coins className="w-6 h-6 text-green-600 mr-2" />
                      <span className="font-medium text-sm">Earning Money</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Discover ways to earn</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600">4 lessons</span>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Gift className="w-6 h-6 text-orange-600 mr-2" />
                      <span className="font-medium text-sm">Smart Spending</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Make wise choices</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-orange-600">6 lessons</span>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>

                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Heart className="w-6 h-6 text-pink-600 mr-2" />
                      <span className="font-medium text-sm">Giving Back</span>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">Learn about charity</div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-pink-600">3 lessons</span>
                      <Star className="w-4 h-4 text-yellow-500" />
                    </div>
                  </div>
                </div>

                {/* Recent Achievements */}
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Recent Achievements 🏆</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <div className="flex items-center">
                        <Trophy className="w-4 h-4 text-yellow-600 mr-2" />
                        <div>
                          <div className="font-medium text-sm">First Saver</div>
                          <div className="text-xs text-gray-500">Saved your first ₦100</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">2 days ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                      <div className="flex items-center">
                        <Award className="w-4 h-4 text-blue-600 mr-2" />
                        <div>
                          <div className="font-medium text-sm">Budget Master</div>
                          <div className="text-xs text-gray-500">Created your first budget</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">5 days ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModule === 'lessons' && (
              <div className="space-y-4">
                {/* Interactive Lesson */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-800 mb-4 flex items-center">
                    <Brain className="w-5 h-5 mr-2" />
                    Lesson: "Needs vs Wants"
                  </h4>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-sm mb-2">What are Needs? 🍎</h5>
                      <p className="text-sm text-gray-600 mb-3">Things we MUST have to live and be healthy</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-2xl mb-1">🍎</div>
                          <div className="text-xs">Food</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-2xl mb-1">🏠</div>
                          <div className="text-xs">Home</div>
                        </div>
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="text-2xl mb-1">👕</div>
                          <div className="text-xs">Clothes</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4">
                      <h5 className="font-medium text-sm mb-2">What are Wants? 🎮</h5>
                      <p className="text-sm text-gray-600 mb-3">Things that are NICE to have but we don't NEED</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center p-2 bg-orange-50 rounded">
                          <div className="text-2xl mb-1">🎮</div>
                          <div className="text-xs">Games</div>
                        </div>
                        <div className="text-center p-2 bg-orange-50 rounded">
                          <div className="text-2xl mb-1">🍭</div>
                          <div className="text-xs">Candy</div>
                        </div>
                        <div className="text-center p-2 bg-orange-50 rounded">
                          <div className="text-2xl mb-1">🧸</div>
                          <div className="text-xs">Toys</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                      <h5 className="font-medium text-sm mb-2">Quick Quiz! 🤔</h5>
                      <p className="text-sm text-gray-700 mb-3">Is a new bicycle a NEED or a WANT?</p>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600 text-sm">
                          Need
                        </button>
                        <button className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 text-sm">
                          Want
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* More Lessons */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-2xl mb-2">🏦</div>
                    <h5 className="font-medium text-sm mb-1">Banks & Savings</h5>
                    <p className="text-xs text-gray-600">How banks work and why we save</p>
                  </div>
                  <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-2xl mb-2">💳</div>
                    <h5 className="font-medium text-sm mb-1">Money Basics</h5>
                    <p className="text-xs text-gray-600">Understanding money and value</p>
                  </div>
                </div>
              </div>
            )}

            {activeModule === 'games' && (
              <div className="space-y-4">
                {/* Featured Game */}
                <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-6">
                  <h4 className="font-semibold text-orange-800 mb-4 flex items-center">
                    <Gamepad2 className="w-5 h-5 mr-2" />
                    Game: "Smart Shopper Challenge"
                  </h4>
                  
                  <div className="bg-white rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-sm">Your Budget: ₦500</span>
                      <span className="font-medium text-sm">Items in cart: 3</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">📚</span>
                          <span className="text-sm">School Books</span>
                        </div>
                        <span className="font-medium text-sm">₦150</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">🍎</span>
                          <span className="text-sm">Healthy Snacks</span>
                        </div>
                        <span className="font-medium text-sm">₦50</span>
                      </div>
                      <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <div className="flex items-center">
                          <span className="text-xl mr-2">🎮</span>
                          <span className="text-sm">Video Game</span>
                        </div>
                        <span className="font-medium text-sm">₦200</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 p-3 bg-blue-50 rounded">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Total Spent:</span>
                        <span className="font-bold text-lg">₦400</span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <span className="font-medium text-sm">Remaining:</span>
                        <span className="font-bold text-lg text-green-600">₦100</span>
                      </div>
                    </div>
                  </div>

                  <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium">
                    Complete Shopping Trip 🛒
                  </button>
                </div>

                {/* More Games */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-2xl mb-2">🐷</div>
                    <h5 className="font-medium text-sm mb-1">Piggy Bank Race</h5>
                    <p className="text-xs text-gray-600">Save money to win!</p>
                    <div className="mt-2">
                      <span className="text-xs text-purple-600">⭐ 4.8 rating</span>
                    </div>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-2xl mb-2">💰</div>
                    <h5 className="font-medium text-sm mb-1">Money Math</h5>
                    <p className="text-xs text-gray-600">Practice counting money</p>
                    <div className="mt-2">
                      <span className="text-xs text-green-600">⭐ 4.6 rating</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-2xl mb-2">🏪</div>
                    <h5 className="font-medium text-sm mb-1">Shop Keeper</h5>
                    <p className="text-xs text-gray-600">Run your own store</p>
                    <div className="mt-2">
                      <span className="text-xs text-blue-600">⭐ 4.9 rating</span>
                    </div>
                  </div>
                  <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="text-2xl mb-2">🎯</div>
                    <h5 className="font-medium text-sm mb-1">Budget Master</h5>
                    <p className="text-xs text-gray-600">Plan your spending</p>
                    <div className="mt-2">
                      <span className="text-xs text-pink-600">⭐ 4.7 rating</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Parent Dashboard */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Heart className="w-5 h-5 mr-2 text-red-500" />
              Parent Corner
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="font-medium text-sm mb-1">Child's Progress</div>
                <div className="text-xs text-gray-600 mb-2">Amazing progress this week!</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Lessons Completed</span>
                  <span className="font-medium text-green-600">28/30</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Average Score</span>
                  <span className="font-medium text-blue-600">92%</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Time Spent</span>
                  <span className="font-medium text-purple-600">4.5 hrs</span>
                </div>
              </div>

              <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm">
                View Detailed Report
              </button>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
              Class Leaderboard
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🥇</span>
                  <span className="font-medium text-sm">You</span>
                </div>
                <span className="font-bold text-sm">1,250</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🥈</span>
                  <span className="font-medium text-sm">Amina</span>
                </div>
                <span className="font-bold text-sm">1,180</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <span className="text-lg mr-2">🥉</span>
                  <span className="font-medium text-sm">Chinedu</span>
                </div>
                <span className="font-bold text-sm">1,150</span>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <div className="flex items-center">
                  <span className="text-lg mr-2">4️⃣</span>
                  <span className="font-medium text-sm">Funke</span>
                </div>
                <span className="font-bold text-sm">1,090</span>
              </div>
            </div>
          </div>

          {/* Rewards Store */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Gift className="w-5 h-5 mr-2 text-purple-600" />
              Rewards Store
            </h3>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">🎨</span>
                  <span className="font-bold text-sm text-purple-600">500 coins</span>
                </div>
                <div className="font-medium text-sm">Art Supplies Kit</div>
                <button className="w-full mt-2 bg-purple-100 text-purple-700 py-1 rounded text-xs hover:bg-purple-200">
                  Redeem
                </button>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">📚</span>
                  <span className="font-bold text-sm text-purple-600">300 coins</span>
                </div>
                <div className="font-medium text-sm">Story Book</div>
                <button className="w-full mt-2 bg-purple-100 text-purple-700 py-1 rounded text-xs hover:bg-purple-200">
                  Redeem
                </button>
              </div>

              <div className="p-3 border rounded-lg opacity-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">🎮</span>
                  <span className="font-bold text-sm text-gray-600">2,000 coins</span>
                </div>
                <div className="font-medium text-sm">Game Time (1hr)</div>
                <button className="w-full mt-2 bg-gray-100 text-gray-500 py-1 rounded text-xs" disabled>
                  Need more coins
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
