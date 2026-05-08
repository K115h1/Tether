import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { HiSparkles } from 'react-icons/hi2'
import { RiEyeLine, RiEyeOffLine } from 'react-icons/ri'
import { FcGoogle } from 'react-icons/fc'
import { useAuth } from '../components/AuthContext'
import logo from "../assets/hotspot_theta_v2.svg"

const SignUp = () => {
    const navigate = useNavigate()
    const { signup } = useAuth()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [agreedToTerms, setAgreedToTerms] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')

        if (!fullName.trim()) {
            setError('Please enter your full name')
            return
        }
        if (!email.trim() || !email.includes('@')) {
            setError('Please enter a valid email address')
            return
        }
        if (password.length < 6) {
            setError('Password must be at least 6 characters')
            return
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        if (!agreedToTerms) {
            setError('Please agree to the Terms of Service')
            return
        }

        setIsLoading(true)
        const success = await signup(fullName, email, password)

        if (success) {
            navigate('/dashboard')
        } else {
            setError('An account with this email already exists')
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
                        Your skills are<br />
                        <span className="text-white/25">currency here.</span>
                    </p>
                    <p className="text-white/30 text-sm leading-relaxed">
                        Join thousands of learners and teachers exchanging knowledge freely.
                        Teach what you know, learn what you do not — no barriers, no gatekeeping.
                    </p>
                </div>

                <div className="border-t border-white/[0.04] pt-8">
                    <p className="text-white/30 text-sm leading-relaxed mb-4 italic">
                        "I came to learn Python and ended up teaching photography. Tether turned my hobby into credits that unlocked an entirely new career path."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: 'hsl(310, 60%, 42%)' }}>
                            FM
                        </div>
                        <div>
                            <p className="text-white/50 text-xs font-medium">Fatima M.</p>
                            <p className="text-white/20 text-xs">Abuja, Nigeria</p>
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
                        <p className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Get started</p>
                        <h1 className="text-white text-3xl font-bold mb-2">Create your account</h1>
                        <p className="text-white/30 text-sm">
                            Already have an account?{' '}
                            <Link to="/login" className="text-amber-400 hover:text-amber-300 transition-colors">Sign in</Link>
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
                            <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Full Name</label>
                            <input
                                type="text"
                                value={fullName}
                                onChange={e => setFullName(e.target.value)}
                                placeholder="Your full name"
                                className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300"
                            />
                        </div>

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

                        <div className="mb-5">
                            <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Min. 6 characters"
                                    className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 pr-11 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300"
                                />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                                    {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <label className="block text-white/40 text-xs tracking-widest uppercase mb-2">Confirm Password</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={confirmPassword}
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    placeholder="Repeat password"
                                    className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 pr-11 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/50 transition-colors">
                                    {showConfirmPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 mb-8">
                            <button type="button" onClick={() => setAgreedToTerms(!agreedToTerms)} className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all duration-200 ${agreedToTerms ? 'bg-lime-500 border-lime-500' : 'border-white/20 hover:border-white/40'}`}>
                                {agreedToTerms && (
                                    <div className="w-16 h-16 rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                        <img src={logo} alt="logo" />
                                    </div>
                                )}
                            </button>
                            <p className="text-white/25 text-xs leading-relaxed">
                                I agree to the <a href="#" className="text-white/40 hover:text-white/60 transition-colors">Terms of Service</a> and <a href="#" className="text-white/40 hover:text-white/60 transition-colors">Privacy Policy</a>
                            </p>
                        </div>

                        <button type="submit" disabled={isLoading} className="w-full py-3 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-lime-500/15 disabled:opacity-50 disabled:cursor-not-allowed">
                            {isLoading ? 'Creating account...' : 'Create Account'}
                        </button>
                    </form>

                    <p className="text-white/15 text-xs text-center mt-8 leading-relaxed">
                        By creating an account you agree to our <a href="#" className="hover:text-white/30 transition-colors">Terms</a> and <a href="#" className="hover:text-white/30 transition-colors">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp