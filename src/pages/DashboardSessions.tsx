import { useState } from 'react'
import { BsLightningChargeFill, BsCalendar, BsClock } from 'react-icons/bs'
// import { HiCheckCircle, HiXCircle } from 'react-icons/hi2'
import { useAuth } from '../components/AuthContext'

export default function DashboardSessions() {
    const { user } = useAuth()
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'all'>('upcoming')

    const sessions = user?.sessions || []

    const filteredSessions = sessions.filter(s => {
        if (activeTab === 'all') return true
        return s.status === activeTab
    })

    const tabs = [
        { key: 'upcoming' as const, label: 'Upcoming', count: sessions.filter(s => s.status === 'upcoming').length },
        { key: 'completed' as const, label: 'Completed', count: sessions.filter(s => s.status === 'completed').length },
        { key: 'all' as const, label: 'All', count: sessions.length },
    ]

    return (
        <div className="px-6 lg:px-10 py-8 max-w-4xl">
            <div className="mb-10">
                <p className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Your Schedule</p>
                <h1 className="text-white text-3xl font-bold mb-2">My Sessions</h1>
                <p className="text-white/30 text-sm">Manage your learning sessions and track your progress.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
                <div className="border border-white/[0.06] rounded-2xl p-5">
                    <p className="text-white/25 text-xs uppercase tracking-widest mb-2">Total</p>
                    <p className="text-white text-3xl font-black">{sessions.length}</p>
                    <p className="text-white/20 text-xs mt-1">sessions booked</p>
                </div>
                <div className="border border-white/[0.06] rounded-2xl p-5">
                    <p className="text-white/25 text-xs uppercase tracking-widest mb-2">Upcoming</p>
                    <p className="text-white text-3xl font-black">{sessions.filter(s => s.status === 'upcoming').length}</p>
                    <p className="text-white/20 text-xs mt-1">this week</p>
                </div>
                <div className="border border-white/[0.06] rounded-2xl p-5">
                    <p className="text-white/25 text-xs uppercase tracking-widest mb-2">Completed</p>
                    <p className="text-white text-3xl font-black">{sessions.filter(s => s.status === 'completed').length}</p>
                    <p className="text-white/20 text-xs mt-1">skills gained</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeTab === tab.key
                                ? 'bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14]'
                                : 'border border-white/[0.07] text-white/30 hover:border-white/20 hover:text-white/60'
                        }`}
                    >
                        {tab.label} <span className="text-xs opacity-60">({tab.count})</span>
                    </button>
                ))}
            </div>

            {/* Sessions List */}
            {filteredSessions.length === 0 ? (
                <div className="text-center py-20 border border-white/[0.06] rounded-2xl">
                    <div className="w-16 h-16 rounded-full bg-white/[0.03] flex items-center justify-center mx-auto mb-4">
                        <BsCalendar size={24} className="text-white/20" />
                    </div>
                    <p className="text-white/30 text-sm mb-2">No {activeTab} sessions yet</p>
                    <p className="text-white/20 text-xs">Book a session with a teacher to get started.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {filteredSessions.map(session => (
                        <div key={session.id} className="group relative border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: session.teacherColor }}>
                                        {session.teacherInitials}
                                    </div>
                                    <div>
                                        <p className="text-white/80 text-sm font-semibold">{session.teacherName}</p>
                                        <p className="text-white/30 text-xs">{session.skill}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${
                                    session.status === 'upcoming' 
                                        ? 'text-lime-400 border-lime-400/20 bg-lime-400/5'
                                        : session.status === 'completed'
                                        ? 'text-amber-400 border-amber-400/20 bg-amber-400/5'
                                        : 'text-red-400 border-red-400/20 bg-red-400/5'
                                }`}>
                                    {session.status}
                                </span>
                            </div>

                            <div className="flex items-center gap-6 mb-4">
                                <div className="flex items-center gap-2">
                                    <BsCalendar size={12} className="text-white/20" />
                                    <span className="text-white/40 text-xs">{session.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BsClock size={12} className="text-white/20" />
                                    <span className="text-white/40 text-xs">{session.time}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <BsLightningChargeFill size={9} className="text-amber-400" />
                                    <span className="text-white/40 text-xs">{session.credits} credits</span>
                                </div>
                            </div>

                            {session.status === 'upcoming' && (
                                <div className="flex gap-2 pt-3 border-t border-white/[0.04]">
                                    <button className="flex-1 py-2 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] text-xs font-semibold hover:scale-[1.02] transition-transform">
                                        Join Session
                                    </button>
                                    <button className="px-4 py-2 rounded-full border border-white/[0.08] text-white/30 text-xs hover:border-white/20 hover:text-white/60 transition-all">
                                        Reschedule
                                    </button>
                                </div>
                            )}

                            {session.status === 'completed' && !session.rating && (
                                <div className="flex gap-1 pt-3 border-t border-white/[0.04]">
                                    <span className="text-white/20 text-xs mr-2">Rate:</span>
                                    {[1,2,3,4,5].map(star => (
                                        <button key={star} className="text-white/20 hover:text-amber-400 transition-colors text-sm">★</button>
                                    ))}
                                </div>
                            )}

                            <div className="mt-3 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-gradient-to-r from-lime-400/50 to-transparent" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
