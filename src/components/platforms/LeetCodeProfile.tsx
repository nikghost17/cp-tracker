'use client'

import { useEffect, useState } from 'react'

interface LeetCodeProfile {
    totalSolved: number
    easySolved: number
    mediumSolved: number
    hardSolved: number
    acceptanceRate: number
    ranking: number
}

interface SubmissionStat {
    difficulty: string;
    count: number;
}

export default function LeetCodeProfile({
    handle,
}: {
    handle: string
}) {
    const [profile, setProfile] = useState<LeetCodeProfile | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (handle) {
            setLoading(true)
            fetch(`/api/leetcode/${handle}`)
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('User not found or API error')
                    }
                    return res.json()
                })
                .then((data) => {
                    if (data.error) {
                        throw new Error(data.error);
                    }

                    const submissionStats: SubmissionStat[] = data.totalSubmissions || [];
                    const easy = submissionStats.find((s) => s.difficulty === 'Easy');
                    const medium = submissionStats.find((s) => s.difficulty === 'Medium');
                    const hard = submissionStats.find((s) => s.difficulty === 'Hard');

                    const profileData: LeetCodeProfile = {
                        totalSolved: data.totalSolved || 0,
                        easySolved: easy ? easy.count : 0,
                        mediumSolved: medium ? medium.count : 0,
                        hardSolved: hard ? hard.count : 0,
                        acceptanceRate: data.acceptanceRate || 0,
                        ranking: data.ranking || 0,
                    };

                    setProfile(profileData)
                    setError(null)
                })
                .catch((err) => {
                    setError(err.message)
                    setProfile(null)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [handle])

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-8 border border-orange-100 shadow-sm">
                <div className="flex items-center justify-center space-x-3">
                    <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                    <p className="text-lg font-medium text-gray-700">Loading LeetCode Profile...</p>
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
                        <h4 className="font-bold text-red-800">Error loading LeetCode profile</h4>
                        <p className="text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!profile) {
        return null
    }

    const difficultyColors = {
        easy: { bg: 'bg-gradient-to-br from-green-200 to-green-300', text: 'text-white', icon: '🟢' },
        medium: { bg: 'bg-gradient-to-br from-yellow-300 to-orange-400', text: 'text-white', icon: '🟡' },
        hard: { bg: 'bg-gradient-to-br from-red-300 to-red-500', text: 'text-white', icon: '🔴' },
        total: { bg: 'bg-gradient-to-br from-blue-600 to-blue-700', text: 'text-white', icon: '🎯' },
        acceptance: { bg: 'bg-gradient-to-br from-purple-600 to-purple-700', text: 'text-white', icon: '✅' },
        ranking: { bg: 'bg-gradient-to-br from-indigo-600 to-indigo-700', text: 'text-white', icon: '🏆' }
    }

    return (
        <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100 shadow-lg">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-500 rounded-xl shadow-md">
                    <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202L13.483.001z"/>
                    </svg>
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                        <a
                            href={`https://leetcode.com/${handle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:text-orange-700 transition-colors duration-200 flex items-center gap-2"
                        >
                            LeetCode Profile
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </h3>
                    <p className="text-gray-600 font-medium">@{handle}</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Solved */}
                <div className={`${difficultyColors.total.bg} ${difficultyColors.total.text} p-5 rounded-xl shadow-md transform hover:scale-105 transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{difficultyColors.total.icon}</span>
                        <div className="text-right">
                            <p className="text-2xl font-bold">{profile.totalSolved}</p>
                        </div>
                    </div>
                    <p className="font-semibold opacity-90">Total Solved</p>
                </div>

                {/* Easy */}
                <div className={`${difficultyColors.easy.bg} ${difficultyColors.easy.text} p-5 rounded-xl shadow-md transform hover:scale-105 transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{difficultyColors.easy.icon}</span>
                        <div className="text-right">
                            <p className="text-2xl font-bold">{profile.easySolved}</p>
                        </div>
                    </div>
                    <p className="font-semibold opacity-90">Easy</p>
                </div>

                {/* Medium */}
                <div className={`${difficultyColors.medium.bg} ${difficultyColors.medium.text} p-5 rounded-xl shadow-md transform hover:scale-105 transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{difficultyColors.medium.icon}</span>
                        <div className="text-right">
                            <p className="text-2xl font-bold">{profile.mediumSolved}</p>
                        </div>
                    </div>
                    <p className="font-semibold opacity-90">Medium</p>
                </div>

                {/* Hard */}
                <div className={`${difficultyColors.hard.bg} ${difficultyColors.hard.text} p-5 rounded-xl shadow-md transform hover:scale-105 transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{difficultyColors.hard.icon}</span>
                        <div className="text-right">
                            <p className="text-2xl font-bold">{profile.hardSolved}</p>
                        </div>
                    </div>
                    <p className="font-semibold opacity-90">Hard</p>
                </div>

                {/* Acceptance Rate */}
                

                {/* Ranking */}
                <div className={`${difficultyColors.ranking.bg} ${difficultyColors.ranking.text} p-5 rounded-xl shadow-md transform hover:scale-105 transition-all duration-200`}>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{difficultyColors.ranking.icon}</span>
                        <div className="text-right">
                            <p className="text-xl font-bold">{profile.ranking}</p>
                        </div>
                    </div>
                    <p className="font-semibold opacity-90">Global Ranking</p>
                </div>
            </div>
        </div>
    )
}