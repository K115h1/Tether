import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FiUser } from 'react-icons/fi'
import { HiMagnifyingGlass } from 'react-icons/hi2'
import { BsArrowRepeat } from 'react-icons/bs'

gsap.registerPlugin(ScrollTrigger)

const steps = [
    {
        number: '01',
        icon: FiUser,
        title: 'Create your profile',
        description: 'List the skills you can teach and the ones you want to learn. Be as specific as you want — "beginner guitar" or "advanced React patterns" both work.',
        color: '#84CC16',
        glow: 'rgba(132,204,22,0.15)',
    },
    {
        number: '02',
        icon: HiMagnifyingGlass,
        title: 'Browse or get matched',
        description: 'Search freely through teachers, or let Tether surface people whose skills match what you need. Filter by rating, availability, and teaching style.',
        color: '#F59E0B',
        glow: 'rgba(245,158,11,0.15)',
    },
    {
        number: '03',
        icon: BsArrowRepeat,
        title: 'Learn, earn credits, repeat',
        description: 'Book sessions using credits you earn by teaching others. Or go premium to access anyone directly. The more you give, the more you unlock.',
        color: '#7C5CBF',
        glow: 'rgba(124,92,191,0.15)',
    },
]

const HowItWorks = () => {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.step-item',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            )
            gsap.fromTo(
                '.hiw-heading',
                { opacity: 0, y: 25 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="how-it-works"
            className="py-32 px-8 lg:px-20 relative border-t border-white/[0.04]"
        >
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="hiw-heading mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <p className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                            How it works
                        </p>
                        <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight">
                            Three steps to your{' '}
                            <br />
                            <span className="text-white/25">next breakthrough.</span>
                        </h2>
                    </div>
                    <p className="text-white/35 text-sm leading-relaxed max-w-sm md:text-right">
                        No complicated onboarding. No waiting around. You're one profile away from your next skill.
                    </p>
                </div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-16">
                    {steps.map((step, i) => {
                        const Icon = step.icon
                        return (
                            <div key={step.number} className="step-item group relative">

                                {/* Hover glow */}
                                <div
                                    className="absolute -top-2 -left-2 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: step.glow }}
                                />

                                {/* Icon row with separator */}
                                <div className="flex items-center gap-3 mb-4">
                                    <Icon size={18} style={{ color: step.color }} className="shrink-0" />
                                    <div className="h-px flex-1 bg-white/[0.06]" />
                                    <span className="text-[9px] font-medium tracking-widest uppercase text-white/20">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-white/80 font-semibold text-base mb-2 transition-colors duration-300 group-hover:text-white">
                                    {step.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/30 text-sm leading-relaxed">
                                    {step.description}
                                </p>

                                {/* Connector between steps */}
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-[18px] -right-6 text-white/10 text-xs">
                                        →
                                    </div>
                                )}

                                {/* Hover bottom line */}
                                <div
                                    className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                                    style={{ background: `linear-gradient(to right, ${step.color}60, transparent)` }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks
