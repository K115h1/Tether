import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BsLightningChargeFill } from 'react-icons/bs'
import { HiMagnifyingGlass, HiHandRaised } from 'react-icons/hi2'
import { IoStarSharp } from 'react-icons/io5'
import { RiShieldKeyholeFill } from 'react-icons/ri'
import { TbWorld } from 'react-icons/tb'

gsap.registerPlugin(ScrollTrigger)

const features = [
    {
        icon: BsLightningChargeFill,
        title: 'Credit Economy',
        description: 'Teach what you know, earn credits, spend them on anything else. No direct swap required — knowledge circulates freely.',
        tag: 'Core',
        color: '#F59E0B',
        glow: 'rgba(245,158,11,0.15)',
    },
    {
        icon: HiMagnifyingGlass,
        title: 'Open Browsing',
        description: "Don't wait for a match. Browse the full teacher directory, filter by skill, rating, and availability — book directly.",
        tag: 'Discovery',
        color: '#84CC16',
        glow: 'rgba(132,204,22,0.15)',
    },
    {
        icon: IoStarSharp,
        title: 'Reputation System',
        description: 'Every session builds your profile. Learners rate teachers, teachers rate learners. Quality rises naturally.',
        tag: 'Trust',
        color: '#7C5CBF',
        glow: 'rgba(124,92,191,0.15)',
    },
    {
        icon: RiShieldKeyholeFill,
        title: 'Flexible Access',
        description: 'Free users earn their way in by teaching. Premium users skip the queue. Both paths lead to the same community.',
        tag: 'Pricing',
        color: '#F59E0B',
        glow: 'rgba(245,158,11,0.15)',
    },
    {
        icon: TbWorld,
        title: 'Any Skill, Anywhere',
        description: "Code, music, language, fitness, art, cooking — if it can be taught, it's on Tether. No gatekeeping on what counts.",
        tag: 'Open',
        color: '#84CC16',
        glow: 'rgba(132,204,22,0.15)',
    },
    {
        icon: HiHandRaised,
        title: 'Real Connection',
        description: 'No algorithm deciding your worth. You pick your teacher. You choose your learner. Genuine human-to-human exchange.',
        tag: 'Community',
        color: '#7C5CBF',
        glow: 'rgba(124,92,191,0.15)',
    },
]

const Features = () => {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.feature-item',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: { amount: 0.9, from: 'start' },
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                    }
                }
            )
            gsap.fromTo(
                '.features-heading',
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
            id="features"
            className="py-32 px-8 lg:px-20 relative border-t border-white/4"
        >
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <div className="features-heading mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <p className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                            Features
                        </p>
                        <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight">
                            Built different.{' '}
                            <br />
                            <span className="text-white/25">By design.</span>
                        </h2>
                    </div>
                    <p className="text-white/35 text-sm leading-relaxed max-w-sm md:text-right">
                        Most platforms commodify knowledge. Tether treats it like what it actually is —
                        something people built through real effort, worth real exchange.
                    </p>
                </div>

                {/* Feature grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                    {features.map((feature) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={feature.title}
                                className="feature-item group relative"
                            >
                                {/* Soft glow under icon */}
                                <div
                                    className="absolute -top-2 -left-2 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    style={{ background: feature.glow }}
                                />

                                {/* Icon row with separator line */}
                                <div className="flex items-center gap-3 mb-4">
                                    <Icon
                                        size={18}
                                        style={{ color: feature.color }}
                                        className="shrink-0"
                                    />
                                    <div className="h-px flex-1 bg-white/6" />
                                    <span className="text-[9px] font-medium tracking-widest uppercase text-white/20">
                                        {feature.tag}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-white/80 font-semibold text-base mb-2 transition-colors duration-300 group-hover:text-white">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/30 text-sm leading-relaxed">
                                    {feature.description}
                                </p>

                                {/* Bottom line that grows on hover */}
                                <div
                                    className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                                    style={{ background: `linear-gradient(to right, ${feature.color}60, transparent)` }}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

export default Features
