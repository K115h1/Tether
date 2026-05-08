import { useEffect, useRef } from 'react'
import Navbar from '../components/Navbar'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import Laptop3D from '../components/Laptop3D'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import CTASection from '../components/CTASection'
import Phone3D from '../components/Phone3D'
import { Link } from 'react-router'
import HotspotTheta3D from '../components/HotspotTheta3D'

gsap.registerPlugin(ScrollTrigger)

const Landing = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const phoneSectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top top',
                        end: '+=1000',
                        pin: true,
                        scrub: 1,
                    }
                })

                tl.to('.hero-text', { opacity: 0, x: -60, duration: 1 }, 0)
                tl.to('.hero-laptop', { x: '-25%', duration: 1.5 }, 0.2)
                tl.to('.hero-laptop', { opacity: 0, duration: 0.3 }, 1.2)

            }, containerRef)

            return () => ctx.revert()
        })

        return () => mm.revert()
    }, [])

    // Phone section animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.phone-content',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: phoneSectionRef.current,
                        start: 'top 75%',
                    }
                }
            )
        }, phoneSectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className='bg-[#0E0B14] min-h-screen overflow-x-hidden'>
            <Navbar />

            {/* ── HERO (pinned) ─────────────────────────────────────────── */}
            <div
                ref={containerRef}
                className="h-screen flex flex-col lg:flex-row items-center justify-between px-8 lg:px-20 relative overflow-hidden"
            >
                {/* Subtle radial gradient behind the text for depth */}
                <div className="absolute inset-0 bg-radial-[ellipse_at_30%_50%] from-[#2D1B69]/30 via-transparent to-transparent pointer-events-none" />

                {/* Left — text content */}
                <div className="hero-text flex flex-col gap-6 max-w-lg z-20 pt-20">
                    <div className="w-full h-36">
                        <p className="text-white text-4xl lg:text-6xl tracking-6 contrail-one-regular">
                            Welcome to Tether
                        </p>
                    </div>

                    <p className="text-white/60 text-lg leading-relaxed font-light">
                        Every skill has a teacher.{' '}
                        <span className="text-white font-medium">Every teacher has more to learn.</span>
                    </p>

                    <p className="text-white/40 text-sm leading-relaxed">
                        Tether is where knowledge moves freely. Find someone who's mastered
                        what you want to learn — or share what you know with someone who needs it.
                    </p>

                    <div className="flex gap-3 pt-2">
                        <Link to={"/signup"} >
                            <span
                                className="px-6 py-3 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-105 transition-transform duration-300 shadow-lg shadow-lime-500/20 inline-block"
                            >
                                Start Learning Free
                            </span>
                        </Link>
                        <a
                            href="#how-it-works"
                            className="px-6 py-3 rounded-full border border-white/10 text-white/70 text-sm hover:border-white/30 hover:text-white transition-all duration-300 inline-block"
                        >
                            See how it works
                        </a>
                    </div>

                    {/* Social proof */}
                    <div className="flex items-center gap-3 pt-2">
                        <div className="flex -space-x-2">
                            {['AO', 'TK', 'FM', 'EB'].map((initials, i) => (
                                <div
                                    key={initials}
                                    className="w-8 h-8 rounded-full border-2 border-[#0E0B14] flex items-center justify-center text-[9px] font-bold text-white"
                                    style={{
                                        background: `hsl(${260 + i * 25}, 60%, 45%)`
                                    }}
                                >
                                    {initials}
                                </div>
                            ))}
                        </div>
                        <p className="text-white/40 text-xs">
                            <span className="text-white/70 font-medium">2,400+</span> skills shared this month
                        </p>
                    </div>
                </div>

                {/* Right — 3D Laptop */}
                <div className="hero-laptop w-full lg:w-[500px] h-[400px] lg:h-[500px] shrink-0 z-10">
                    <div className="hidden lg:block w-full h-full">
                        <HotspotTheta3D key="hotspot-theta" />
                    </div>
                    
                </div>
            </div>

            {/* ── PHONE SHOWCASE SECTION ───────────────────────────────── */}
            <section 
                ref={phoneSectionRef}
                className="py-24 px-8 lg:px-20 relative border-t border-white/[0.04]"
            >
                <div className="max-w-7xl mx-auto">
                    <div className="phone-content flex flex-col lg:flex-row items-center gap-16">
                        <div className="lg:w-1/2">
                            <div className="h-[400px] w-full">
                                <Phone3D />
                            </div>
                        </div>
                        <div className="lg:w-1/2">
                            <p className="text-[#7C5CBF] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                                Mobile Experience
                            </p>
                            <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-6">
                                Skills in your<br />
                                <span className="text-white/25">pocket.</span>
                            </h2>
                            <p className="text-white/35 text-sm leading-relaxed max-w-md mb-8">
                                Browse teachers, book sessions, and manage your credits — all from your phone. 
                                Tether is built mobile-first so you can learn anywhere, anytime.
                            </p>
                            <div className="flex flex-col gap-4">
                                {[
                                    { label: 'Instant notifications', desc: 'Get alerted when a teacher accepts your request' },
                                    { label: 'Credit tracking', desc: 'Monitor your balance and upcoming sessions' },
                                    { label: 'Direct messaging', desc: 'Chat with teachers before booking' }
                                ].map((item) => (
                                    <div key={item.label} className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-lime-400 mt-2 shrink-0" />
                                        <div>
                                            <p className="text-white/70 text-sm font-medium">{item.label}</p>
                                            <p className="text-white/30 text-xs">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── BELOW THE FOLD (visible after hero unpins) ───────────── */}
            <HowItWorks />
            <Features />
            <CTASection />

            {/* Footer */}
            <footer className="border-t border-white/5 py-10 px-8 lg:px-20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 to-lime-500" />
                        <span className="text-white/40 text-sm font-medium">Tether</span>
                    </div>
                    <p className="text-white/20 text-xs">
                        © 2025 Tether. Know more. Share more.
                    </p>
                    <div className="flex gap-6">
                        {['Privacy', 'Terms', 'Contact'].map(l => (
                            <Link key={l} to={l === 'Contact' ? '/contact' : '#'} className="text-white/30 text-xs hover:text-white/60 transition-colors">
                                {l}
                            </Link>
                        ))}
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Landing
