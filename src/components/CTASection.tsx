import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiSparkles } from 'react-icons/hi2'
import { RiVipCrownFill } from 'react-icons/ri'

gsap.registerPlugin(ScrollTrigger)

const freeTier = [
    'Full teacher directory access',
    'Earn & spend credits',
    'Rated profile',
    'Unlimited skills listed',
]

const premiumTier = [
    'Everything in Free',
    'Direct booking — no credits needed',
    'Priority in search results',
    'Verified teacher badge',
    'Extended session lengths',
]

const CTASection = () => {
    const sectionRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.cta-content',
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    }
                }
            )
            gsap.fromTo(
                '.pricing-item',
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.15,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.pricing-grid',
                        start: 'top 80%',
                    }
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section
            ref={sectionRef}
            id="pricing"
            className="py-32 px-8 lg:px-20 relative border-t border-white/4"
        >
            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-62.5 bg-[#2D1B69]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-5xl mx-auto relative">

                {/* Heading */}
                <div className="cta-content mb-24">
                    <p className="text-[#7C5CBF] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                        Get started
                    </p>
                    <h2 className="text-white text-4xl lg:text-5xl font-bold leading-tight mb-4">
                        You know something{' '}
                        <br />
                        <span className="text-white/25">someone needs.</span>
                    </h2>
                    <p className="text-white/35 text-sm leading-relaxed max-w-sm">
                        Stop leaving it locked up. Join Tether and let your skills travel further than you can alone.
                    </p>
                </div>

                {/* Pricing */}
                <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">

                    {/* Free */}
                    <div className="pricing-item group relative">
                        {/* Glow on hover */}
                        <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-lime-400/15" />

                        {/* Icon row */}
                        <div className="flex items-center gap-3 mb-5">
                            <HiSparkles size={18} className="text-lime-400 shrink-0" />
                            <div className="h-px flex-1 bg-white/6" />
                            <span className="text-[9px] font-medium tracking-widest uppercase text-white/20">Free</span>
                        </div>

                        {/* Price */}
                        <div className="mb-1">
                            <span className="text-white text-5xl font-black">₦0</span>
                        </div>
                        <p className="text-white/25 text-xs mb-8">Earn your access by teaching</p>

                        {/* Feature list */}
                        <ul className="space-y-3 mb-10">
                            {freeTier.map(item => (
                                <li key={item} className="flex items-center gap-3 text-white/40 text-sm">
                                    <span className="text-lime-400 text-xs shrink-0">—</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        <a
                            href="#signup"
                            className="inline-block px-7 py-3 rounded-full border border-white/10 text-white/50 text-sm hover:border-lime-500/40 hover:text-lime-400 transition-all duration-300"
                        >
                            Start free
                        </a>

                        {/* Hover bottom line */}
                        <div className="mt-8 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-linear-to-r from-lime-400/50 to-transparent" />
                    </div>

                    {/* Premium */}
                    <div className="pricing-item group relative">
                        {/* Glow on hover */}
                        <div className="absolute -top-2 -left-2 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-amber-400/15" />

                        {/* Icon row */}
                        <div className="flex items-center gap-3 mb-5">
                            <RiVipCrownFill size={18} className="text-amber-400 shrink-0" />
                            <div className="h-px flex-1 bg-white/6" />
                            <span className="text-[9px] font-medium tracking-widest uppercase text-white/20">Premium</span>
                        </div>

                        {/* Price */}
                        <div className="mb-1 flex items-end gap-2">
                            <span className="text-white text-5xl font-black">₦4,999</span>
                            <span className="text-white/25 text-sm mb-2">/ month</span>
                        </div>
                        <p className="text-white/25 text-xs mb-8">Skip the queue, unlock everything</p>

                        {/* Feature list */}
                        <ul className="space-y-3 mb-10">
                            {premiumTier.map(item => (
                                <li key={item} className="flex items-center gap-3 text-white/40 text-sm">
                                    <span className="text-amber-400 text-xs shrink-0">—</span>
                                    {item}
                                </li>
                            ))}
                        </ul>

                        {/* CTA */}
                        <a
                            href="#signup"
                            className="inline-block px-7 py-3 rounded-full bg-linear-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-105 transition-transform duration-300 shadow-lg shadow-amber-500/20"
                        >
                            Go Premium
                        </a>

                        {/* Hover bottom line */}
                        <div className="mt-8 h-px w-0 group-hover:w-full transition-all duration-500 ease-out bg-linear-to-r from-amber-400/50 to-transparent" />
                    </div>
                </div>

                {/* Fine print */}
                <p className="text-white/15 text-xs mt-16">
                    No card required for free tier · Cancel premium anytime
                </p>
            </div>
        </section>
    )
}

export default CTASection
