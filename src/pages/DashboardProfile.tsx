import { useState } from 'react'
import { BsLightningChargeFill, BsStarFill, BsPencil } from 'react-icons/bs'
import { HiCamera } from 'react-icons/hi2'
import { useAuth } from '../components/AuthContext'


export default function DashboardProfile() {
    const { user, updateProfile } = useAuth()
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        fullName: user?.fullName || '',
        bio: user?.bio || '',
        location: user?.location || '',
        skills: user?.skills?.join(', ') || '',
    })

    const handleSave = () => {
        updateProfile({
            fullName: formData.fullName,
            bio: formData.bio,
            location: formData.location,
            skills: formData.skills.split(',').map(s => s.trim()).filter(Boolean),
        })
        setIsEditing(false)
    }

    const sessions = user?.sessions || []
    const completedSessions = sessions.filter(s => s.status === 'completed')
    const upcomingSessions = sessions.filter(s => s.status === 'upcoming')

    return (
        <div className="px-6 lg:px-10 py-8 max-w-4xl">
            <div className="mb-10">
                <p className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Your Identity</p>
                <h1 className="text-white text-3xl font-bold mb-2">Profile</h1>
                <p className="text-white/30 text-sm">Manage your public profile and teaching credentials.</p>
            </div>

            {/* Profile Card */}
            <div className="border border-white/[0.06] rounded-2xl p-8 mb-8 relative">
                <button 
                    onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.08] text-white/40 text-xs hover:border-lime-500/30 hover:text-lime-400 transition-all"
                >
                    <BsPencil size={12} />
                    {isEditing ? 'Save' : 'Edit'}
                </button>

                <div className="flex items-start gap-6 mb-8">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full flex items-center justify-center text-xl font-bold text-white shrink-0" style={{ background: user?.color || 'hsl(260, 60%, 48%)' }}>
                            {user?.initials || 'YO'}
                        </div>
                        <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-lime-500 flex items-center justify-center text-[#0E0B14]">
                            <HiCamera size={14} />
                        </button>
                    </div>
                    <div className="flex-1">
                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Name</label>
                                    <input 
                                        type="text" 
                                        value={formData.fullName}
                                        onChange={e => setFormData({...formData, fullName: e.target.value})}
                                        className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-white/80 text-sm focus:outline-none focus:border-lime-500/40"
                                    />
                                </div>
                                <div>
                                    <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Bio</label>
                                    <textarea 
                                        value={formData.bio}
                                        onChange={e => setFormData({...formData, bio: e.target.value})}
                                        rows={3}
                                        className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-white/80 text-sm focus:outline-none focus:border-lime-500/40 resize-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Location</label>
                                        <input 
                                            type="text" 
                                            value={formData.location}
                                            onChange={e => setFormData({...formData, location: e.target.value})}
                                            className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-white/80 text-sm focus:outline-none focus:border-lime-500/40"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Skills (comma separated)</label>
                                        <input 
                                            type="text" 
                                            value={formData.skills}
                                            onChange={e => setFormData({...formData, skills: e.target.value})}
                                            className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-2.5 text-white/80 text-sm focus:outline-none focus:border-lime-500/40"
                                        />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <h2 className="text-white text-2xl font-bold mb-1">{user?.fullName || 'Your Name'}</h2>
                                <p className="text-white/30 text-sm mb-3">{user?.email}</p>
                                <p className="text-white/40 text-sm leading-relaxed max-w-md">{user?.bio || 'No bio yet. Tell others what you teach and what you want to learn.'}</p>

                                <div className="flex gap-4 mt-4">
                                    {user?.location && (
                                        <span className="text-white/30 text-xs flex items-center gap-1">
                                            📍 {user.location}
                                        </span>
                                    )}
                                    <span className="text-white/30 text-xs flex items-center gap-1">
                                        <BsStarFill size={10} className="text-amber-400" /> {user?.rating || 0} rating
                                    </span>
                                    <span className="text-white/30 text-xs flex items-center gap-1">
                                        <BsLightningChargeFill size={10} className="text-amber-400" /> {user?.credits || 0} credits
                                    </span>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                {/* Skills Tags */}
                <div className="border-t border-white/[0.04] pt-6">
                    <p className="text-white/25 text-xs uppercase tracking-widest mb-3">Teaching Skills</p>
                    <div className="flex gap-2 flex-wrap">
                        {user?.skills && user.skills.length > 0 ? (
                            user.skills.map(skill => (
                                <span key={skill} className="text-xs text-lime-400 border border-lime-500/20 px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))
                        ) : (
                            <span className="text-white/20 text-xs">No skills listed yet</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="border border-white/[0.06] rounded-2xl p-5 text-center">
                    <p className="text-white text-2xl font-black">{sessions.length}</p>
                    <p className="text-white/25 text-xs uppercase tracking-widest mt-1">Sessions</p>
                </div>
                <div className="border border-white/[0.06] rounded-2xl p-5 text-center">
                    <p className="text-white text-2xl font-black">{completedSessions.length}</p>
                    <p className="text-white/25 text-xs uppercase tracking-widest mt-1">Completed</p>
                </div>
                <div className="border border-white/[0.06] rounded-2xl p-5 text-center">
                    <p className="text-white text-2xl font-black">{upcomingSessions.length}</p>
                    <p className="text-white/25 text-xs uppercase tracking-widest mt-1">Upcoming</p>
                </div>
                <div className="border border-white/[0.06] rounded-2xl p-5 text-center">
                    <p className="text-white text-2xl font-black">{user?.credits || 0}</p>
                    <p className="text-white/25 text-xs uppercase tracking-widest mt-1">Credits</p>
                </div>
            </div>

            {/* Recent Sessions */}
            <div className="border border-white/[0.06] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <p className="text-white/25 text-xs uppercase tracking-widest">Recent Activity</p>
                    <button className="text-lime-400 text-xs hover:text-lime-300 transition-colors">View all</button>
                </div>
                {sessions.length === 0 ? (
                    <p className="text-white/20 text-sm text-center py-8">No sessions yet. Book your first one!</p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {sessions.slice(0, 3).map(session => (
                            <div key={session.id} className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: session.teacherColor }}>
                                        {session.teacherInitials}
                                    </div>
                                    <div>
                                        <p className="text-white/60 text-sm">{session.teacherName}</p>
                                        <p className="text-white/25 text-xs">{session.skill} · {session.date}</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                    session.status === 'upcoming' ? 'text-lime-400 bg-lime-400/5' : 'text-amber-400 bg-amber-400/5'
                                }`}>
                                    {session.status}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
