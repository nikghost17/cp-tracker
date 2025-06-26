'use client'

import { useEffect, useState } from 'react'

interface CodeforcesProfileProps {
  handle: string
}

export default function CodeforcesProfile({ handle }: CodeforcesProfileProps) {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!handle) {
      setLoading(false)
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(`/api/codeforces/${handle}`)
        const result = await response.json()
        if (!response.ok || result.error) {
          throw new Error(result.error || 'Failed to fetch Codeforces data')
        }
        setData(result)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [handle])

  if (!handle) {
    return null
  }

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-8 border border-red-100 shadow-sm">
        <div className="flex items-center justify-center space-x-3">
          <div className="w-8 h-8 border-4 border-red-200 border-t-red-500 rounded-full animate-spin"></div>
          <p className="text-lg font-medium text-gray-700">Loading Codeforces Profile...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 rounded-r-2xl p-6 shadow-sm">
        <div className="flex items-center">
          <svg className="w-6 h-6 text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-bold text-red-800">Error loading Codeforces profile</h4>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!data || !data.userInfo) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-center">
        <p className="text-gray-600 font-medium">Could not load Codeforces profile.</p>
      </div>
    )
  }

  const { userInfo } = data

  // Function to get rank color
  const getRankColor = (rank: string) => {
    const rankLower = rank?.toLowerCase() || ''
    if (rankLower.includes('newbie')) return 'text-gray-600'
    if (rankLower.includes('pupil')) return 'text-green-600'
    if (rankLower.includes('specialist')) return 'text-cyan-600'
    if (rankLower.includes('expert')) return 'text-blue-600'
    if (rankLower.includes('candidate master')) return 'text-purple-600'
    if (rankLower.includes('master')) return 'text-orange-600'
    if (rankLower.includes('international master')) return 'text-orange-700'
    if (rankLower.includes('grandmaster')) return 'text-red-600'
    if (rankLower.includes('international grandmaster')) return 'text-red-700'
    if (rankLower.includes('legendary grandmaster')) return 'text-red-800'
    return 'text-gray-600'
  }

  const stats = [
    {
      label: 'Current Rating',
      value: userInfo.rating,
      subtext: userInfo.rank,
      icon: '📊',
      bg: 'bg-gradient-to-br from-blue-600 to-blue-700',
      textColor: getRankColor(userInfo.rank)
    },
    {
      label: 'Max Rating',
      value: userInfo.maxRating,
      subtext: userInfo.maxRank,
      icon: '🏆',
      bg: 'bg-gradient-to-br from-purple-600 to-purple-700',
      textColor: getRankColor(userInfo.maxRank)
    },
    {
      label: 'Contribution',
      value: userInfo.contribution > 0 ? `+${userInfo.contribution}` : userInfo.contribution,
      subtext: 'Community Points',
      icon: '🤝',
      bg: 'bg-gradient-to-br from-green-600 to-green-700'
    },
    {
      label: 'Friend of',
      value: userInfo.friendOfCount,
      subtext: 'Users',
      icon: '👥',
      bg: 'bg-gradient-to-br from-indigo-600 to-indigo-700'
    }
  ]

  return (
    <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border border-red-100 shadow-lg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="p-3 bg-red-500 rounded-xl shadow-md">
          <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9s-.672 1.5-1.5 1.5S3 9.828 3 9s.672-1.5 1.5-1.5zM9 9c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5-.672 1.5-1.5 1.5S9 9.828 9 9zm6-1.5c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zM21 9c0-.828.672-1.5 1.5-1.5S24 8.172 24 9s-.672 1.5-1.5 1.5S21 9.828 21 9z"/>
            <path d="M12 15c6.627 0 12-2.686 12-6s-5.373-6-12-6S0 5.686 0 9s5.373 6 12 6z"/>
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <a
              href={`https://codeforces.com/profile/${userInfo.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-600 hover:text-red-700 transition-colors duration-200 flex items-center gap-2"
            >
              Codeforces Stats
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </h2>
          <p className="text-gray-600 font-medium">@{userInfo.handle}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`${stat.bg} text-white p-5 rounded-xl shadow-md transform hover:scale-105 transition-all duration-200`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{stat.icon}</span>
              <div className="text-right">
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
            <p className="font-semibold opacity-90 text-sm">{stat.label}</p>
            {stat.subtext && (
              <p className={`text-xs opacity-75 ${stat.textColor ? `${stat.textColor} bg-white bg-opacity-20 px-2 py-1 rounded mt-1` : ''}`}>
                {stat.subtext}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}