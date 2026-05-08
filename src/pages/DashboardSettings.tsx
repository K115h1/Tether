import { useState } from 'react'
import { BsBell, BsShield, BsCreditCard, BsPalette } from 'react-icons/bs'
import { HiEye, HiEyeSlash } from 'react-icons/hi2'
import { useAuth } from '../components/AuthContext'

export default function DashboardSettings() {
    const { user, logout } = useAuth()
    const [showPassword, setShowPassword] = useState(false)
    const [notifications, setNotifications] = useState({
        email: true,
        push: true,
        sessions: true,
        messages: true,
        marketing: false,
    })
    const [passwordForm, setPasswordForm] = useState({
        current: '',
        new: '',
        confirm: '',
    })
    const [saved, setSaved] = useState(false)

    const handleToggle = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }))
    }

    const handleSave = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="px-6 lg:px-10 py-8 max-w-3xl">
            <div className="mb-10">
                <p className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Preferences</p>
                <h1 className="text-white text-3xl font-bold mb-2">Settings</h1>
                <p className="text-white/30 text-sm">Manage your account, notifications, and security.</p>
            </div>

            {/* Account Section */}
            <div className="border border-white/[0.06] rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                        <BsShield size={16} className="text-lime-400" />
                    </div>
                    <div>
                        <h3 className="text-white/80 text-sm font-semibold">Account Security</h3>
                        <p className="text-white/25 text-xs">Update your password and security settings</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Current Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={passwordForm.current}
                                onChange={e => setPasswordForm({...passwordForm, current: e.target.value})}
                                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 pr-11 text-white/80 text-sm focus:outline-none focus:border-lime-500/40"
                            />
                            <button onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50">
                                {showPassword ? <HiEyeSlash size={16} /> : <HiEye size={16} />}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">New Password</label>
                            <input
                                type="password"
                                value={passwordForm.new}
                                onChange={e => setPasswordForm({...passwordForm, new: e.target.value})}
                                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white/80 text-sm focus:outline-none focus:border-lime-500/40"
                            />
                        </div>
                        <div>
                            <label className="text-white/40 text-xs tracking-widest uppercase mb-2 block">Confirm</label>
                            <input
                                type="password"
                                value={passwordForm.confirm}
                                onChange={e => setPasswordForm({...passwordForm, confirm: e.target.value})}
                                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white/80 text-sm focus:outline-none focus:border-lime-500/40"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="border border-white/[0.06] rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                        <BsBell size={16} className="text-amber-400" />
                    </div>
                    <div>
                        <h3 className="text-white/80 text-sm font-semibold">Notifications</h3>
                        <p className="text-white/25 text-xs">Choose what you want to be notified about</p>
                    </div>
                </div>

                <div className="space-y-4">
                    {Object.entries(notifications).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-white/60 text-sm capitalize">{key} Notifications</p>
                                <p className="text-white/20 text-xs">
                                    {key === 'email' && 'Receive updates via email'}
                                    {key === 'push' && 'Browser push notifications'}
                                    {key === 'sessions' && 'Session reminders and updates'}
                                    {key === 'messages' && 'New message alerts'}
                                    {key === 'marketing' && 'Promotions and news'}
                                </p>
                            </div>
                            <button
                                onClick={() => handleToggle(key as keyof typeof notifications)}
                                className={`w-11 h-6 rounded-full transition-all duration-300 relative ${
                                    value ? 'bg-lime-500' : 'bg-white/10'
                                }`}
                            >
                                <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                                    value ? 'left-6' : 'left-1'
                                }`} />
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Billing Section */}
            <div className="border border-white/[0.06] rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                        <BsCreditCard size={16} className="text-purple-400" />
                    </div>
                    <div>
                        <h3 className="text-white/80 text-sm font-semibold">Plan & Billing</h3>
                        <p className="text-white/25 text-xs">Manage your subscription and credits</p>
                    </div>
                </div>

                <div className="bg-white/[0.03] rounded-xl p-5 mb-4">
                    <div className="flex items-center justify-between mb-3">
                        <div>
                            <p className="text-white text-sm font-semibold">{user?.plan || 'Free'} Plan</p>
                            <p className="text-white/30 text-xs">
                                {user?.plan === 'Premium' ? '₦4,999/month' : 'Earn credits by teaching'}
                            </p>
                        </div>
                        <span className={`text-[10px] font-medium px-2 py-1 rounded-full ${
                            user?.plan === 'Premium' 
                                ? 'text-amber-400 border border-amber-400/20' 
                                : 'text-white/30 border border-white/10'
                        }`}>
                            {user?.plan === 'Premium' ? 'Active' : 'Free'}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <BsCreditCard size={12} className="text-white/20" />
                        <span className="text-white/20 text-xs">**** **** **** 4242</span>
                    </div>
                </div>

                {user?.plan !== 'Premium' && (
                    <button className="w-full py-3 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-[1.02] transition-transform">
                        Upgrade to Premium
                    </button>
                )}
            </div>

            {/* Appearance */}
            <div className="border border-white/[0.06] rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">
                        <BsPalette size={16} className="text-pink-400" />
                    </div>
                    <div>
                        <h3 className="text-white/80 text-sm font-semibold">Appearance</h3>
                        <p className="text-white/25 text-xs">Customize your dashboard theme</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button className="w-12 h-12 rounded-xl bg-[#0E0B14] border-2 border-lime-500" />
                    <button className="w-12 h-12 rounded-xl bg-[#0f172a] border border-white/10 hover:border-white/30 transition-colors" />
                    <button className="w-12 h-12 rounded-xl bg-[#1a1a2e] border border-white/10 hover:border-white/30 transition-colors" />
                </div>
            </div>

            {/* Save & Danger */}
            <div className="flex items-center justify-between">
                <button
                    onClick={handleSave}
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-[1.02] transition-transform"
                >
                    {saved ? 'Saved!' : 'Save Changes'}
                </button>
                <button
                    onClick={() => { if(confirm('Are you sure?')) logout() }}
                    className="px-6 py-3 rounded-full border border-red-500/20 text-red-400 text-sm hover:bg-red-500/10 transition-all"
                >
                    Delete Account
                </button>
            </div>
        </div>
    )
}
