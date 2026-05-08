import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'
import { BsLightningChargeFill } from 'react-icons/bs'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { RiVipCrownFill } from 'react-icons/ri'
import { TbMessageCircle } from 'react-icons/tb'
import { FiUser, FiBookOpen, FiSettings, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../components/AuthContext'
import logo from "../assets/hotspot_theta_v2.svg"


const navItems = [
    { icon: HiMagnifyingGlass, label: 'Explore', path: '/dashboard' },
    { icon: FiBookOpen, label: 'My Sessions', path: '/dashboard/sessions' },
    { icon: TbMessageCircle, label: 'Messages', path: '/dashboard/messages' },
    { icon: FiUser, label: 'Profile', path: '/dashboard/profile' },
    { icon: FiSettings, label: 'Settings', path: '/dashboard/settings' },
]

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = () => {
        logout()
        navigate('/login')
    }

    const unreadCount = user?.messages.filter(m => !m.read).length || 0

    return (
        <div className="min-h-screen bg-[#0E0B14] flex">
            {/* Mobile menu overlay */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
            )}

            {/* ── Sidebar ── */}
            <aside className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static z-50 flex-col w-64 lg:w-60 shrink-0 border-r border-white/[0.04] bg-[#0E0B14] px-5 py-8 h-screen transition-transform duration-300`}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 mb-10 group w-fit" onClick={() => setMobileMenuOpen(false)}>
                    <div className="w-16 h-16 rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img src={logo} alt="logo" />
                    </div>
                    <span className="text-orange-400 text-lg font-bold tracking-tight">Tether</span>
                </Link>

                {/* Nav */}
                <nav className="flex flex-col gap-1 flex-1">
                    {navItems.map(({ icon: Icon, label, path }) => {
                        const isActive = location.pathname === path
                        return (
                            <Link
                                key={label}
                                to={path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${isActive ? 'bg-white/[0.06] text-white font-medium' : 'text-white/30 hover:text-white/60 hover:bg-white/[0.03]'}`}
                            >
                                <Icon size={15} className={isActive ? 'text-lime-400' : ''} />
                                {label}
                                {label === 'Messages' && unreadCount > 0 && (
                                    <span className="ml-auto w-4 h-4 rounded-full bg-lime-500 text-[9px] text-[#0E0B14] font-bold flex items-center justify-center">{unreadCount}</span>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Credits */}
                <div className="border-t border-white/[0.04] pt-6">
                    <div className="flex items-center gap-2 mb-1">
                        <BsLightningChargeFill size={11} className="text-amber-400" />
                        <span className="text-white/25 text-xs uppercase tracking-widest">Credits</span>
                    </div>
                    <p className="text-white text-2xl font-black mb-1">{user?.credits || 0}</p>
                    <p className="text-white/25 text-xs">≈ {Math.floor((user?.credits || 0) / 3)} sessions left</p>
                    <button className="mt-3 w-full py-2 rounded-full border border-white/[0.07] text-white/30 text-xs hover:border-lime-500/30 hover:text-lime-400 transition-all duration-300">Earn more</button>
                </div>

                {/* User */}
                <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/[0.04]">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white shrink-0" style={{ background: user?.color || 'hsl(260, 60%, 48%)' }}>
                        {user?.initials || 'YO'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white/70 text-xs font-medium truncate">{user?.fullName || 'Your Name'}</p>
                        <p className="text-white/25 text-[10px] truncate">{user?.plan || 'Free'} plan</p>
                    </div>
                    {user?.plan === 'Premium' ? <RiVipCrownFill size={12} className="text-amber-400 shrink-0" /> : <RiVipCrownFill size={12} className="text-white/15 shrink-0" />}
                </div>

                {/* Logout */}
                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-white/[0.03] transition-all duration-200 text-left w-full mt-2">
                    <FiLogOut size={15} />
                    Log out
                </button>
            </aside>

            {/* ── Main Content ── */}
            <main className="flex-1 min-w-0">
                {/* Mobile header */}
                <div className="lg:hidden flex items-center justify-between px-4 py-3 border-b border-white/[0.04]">
                    <button onClick={() => setMobileMenuOpen(true)} className="flex flex-col gap-1 p-2">
                        <span className="block h-0.5 w-5 bg-white/60 rounded-full" />
                        <span className="block h-0.5 w-5 bg-white/60 rounded-full" />
                        <span className="block h-0.5 w-3 bg-white/60 rounded-full" />
                    </button>
                    <span className="text-orange-400 text-lg font-bold">Tether</span>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: user?.color || 'hsl(260, 60%, 48%)' }}>
                        {user?.initials || 'YO'}
                    </div>
                </div>
                {children}
            </main>
        </div>
    )
}
