import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { HiSparkles } from 'react-icons/hi2'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../components/AuthContext'
import logo from "../assets/hotspot_theta_v2.svg"

const Login = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!email.trim() || !email.includes('@')) {
            setError('Please enter a valid email address')
            return
        }
        if (!password) {
            setError('Please enter your password')
            return
        }

        setIsLoading(true)
        const success = await login(email, password)

        if (success) {
            navigate('/dashboard')
        } else {
            setError('Invalid email or password')
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#0E0B14] flex relative overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#2D1B69]/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[200px] bg-lime-500/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="hidden lg:flex flex-col justify-between w-1/2 px-16 py-14 border-r border-white/[0.04] relative">
                <Link to="/" className="flex items-center gap-2.5 group w-fit">
                    <div className="w-16 h-16 rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img src={logo} alt="logo" />
                    </div>
                    <span className="text-orange-400 text-xl font-bold tracking-tight">Tether</span>
                </Link>

                <div className="max-w-sm">
                    <div className="flex items-center gap-3 mb-8">
                        <HiSparkles size={14} className="text-lime-400" />
                        <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <p className="text-white text-3xl font-bold leading-tight mb-4">
                        Every skill has a teacher.<br />
                        <span className="text-white/25">Every teacher has more to learn.</span>
                    </p>
                    <p className="text-white/30 text-sm leading-relaxed">
                        Join a community where knowledge moves freely — no gatekeeping, no algorithms deciding your worth.
                    </p>
                </div>

                <div className="border-t border-white/[0.04] pt-8">
                    <p className="text-white/30 text-sm leading-relaxed mb-4 italic">
                        "I taught SQL for two months on Tether and used the credits to finally learn how to play guitar. Genuinely the best trade I have ever made."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: 'hsl(285, 60%, 45%)' }}>
                            TK
                        </div>
                        <div>
                            <p className="text-white/50 text-xs font-medium">Tunde K.</p>
                            <p className="text-white/20 text-xs">Lagos, Nigeria</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 lg:px-20">
                <Link to="/" className="flex items-center gap-2 mb-12 lg:hidden w-fit">
                    <div className="w-16 h-16 rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <img src={logo} alt="logo" />
                    </div>
                    <span className="text-orange-400 text-lg font-bold">Tether</span>
                </Link>

                <div className="max-w-sm w-full mx-auto">
                    <div className="mb-10">
                        <p className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Welcome back</p>
                        <h1 className="text-white text-3xl font-bold mb-2">Sign in</h1>
                        <p className="text-white/30 text-sm">
                            Don't have an account?{' '}
                            <Link to="/signup" className="text-amber-400 hover:text-amber-300 transition-colors">Sign up free</Link>
                        </p>
                    </div>

                    {error && (
                        <div className="mb-5 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                            {error}
                        </div>
                    )}

                    <button type="button" className="w-full flex items-center justify-center gap-3 py-3 rounded-full border border-white/[0.08] text-white/60 text-sm hover:border-white/20 hover:text-white/80 transition-all duration-300 mb-6">
                        <FcGoogle size={16} />
                        Continue with Google
                    </button>

                    <div className="flex items-center gap-4 mb-6">
                        <div className="h-px flex-1 bg-white/[0.06]" />
                        <span className="text-white/20 text-xs">or</span>
                        <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300"
                            />
                        </div>

                        <div className="mb-3">
                            <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 pr-11 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                                    {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end mb-8">
                            <a href="#" className="text-white/25 text-xs hover:text-white/50 transition-colors">Forgot password?</a>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-full py-3 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-lime-500/15 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <p className="text-white/15 text-xs text-center mt-8 leading-relaxed">
                        By signing in you agree to our <a href="#" className="hover:text-white/30 transition-colors">Terms</a> and <a href="#" className="hover:text-white/30 transition-colors">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login