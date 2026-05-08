import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { HiSparkles } from 'react-icons/hi2'
import { BsLightningChargeFill } from 'react-icons/bs'
import { IoStarSharp } from 'react-icons/io5'
import { TbWorld } from 'react-icons/tb'
import { RiShieldKeyholeFill } from 'react-icons/ri'
import Navbar from '../components/Navbar'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: '12K+', label: 'Active learners', color: '#84CC16' },
  { value: '8.5K+', label: 'Skills taught', color: '#F59E0B' },
  { value: '95%', label: 'Satisfaction rate', color: '#7C5CBF' },
  { value: '50+', label: 'Countries', color: '#84CC16' },
]

const values = [
  {
    icon: BsLightningChargeFill,
    title: 'Knowledge is Currency',
    description: 'We believe what you know has real value. Tether turns your expertise into credits that unlock new learning opportunities.',
    color: '#F59E0B',
  },
  {
    icon: TbWorld,
    title: 'Borderless Learning',
    description: 'Geography should not limit who you learn from. Connect with teachers and learners from every corner of the globe.',
    color: '#84CC16',
  },
  {
    icon: IoStarSharp,
    title: 'Reputation First',
    description: 'Quality rises naturally through our peer-review system. Every session builds trust and credibility in the community.',
    color: '#7C5CBF',
  },
  {
    icon: RiShieldKeyholeFill,
    title: 'Radical Accessibility',
    description: 'Free users earn their way in by teaching. Premium users unlock everything directly. No one is left behind.',
    color: '#F59E0B',
  },
]

const team = [
  { initials: 'AO', name: 'Adeola Okonkwo', role: 'Founder & CEO', color: 'hsl(285, 60%, 45%)' },
  { initials: 'TK', name: 'Tunde Kehinde', role: 'Head of Product', color: 'hsl(310, 60%, 42%)' },
  { initials: 'FM', name: 'Fatima Musa', role: 'Lead Engineer', color: 'hsl(260, 60%, 48%)' },
  { initials: 'EB', name: 'Emeka Bright', role: 'Community Lead', color: 'hsl(230, 55%, 45%)' },
]

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        }
      )
      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.stats-grid', start: 'top 85%' }
        }
      )
      gsap.fromTo(
        '.value-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: '.values-grid', start: 'top 80%' }
        }
      )
      gsap.fromTo(
        '.team-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.team-grid', start: 'top 85%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="bg-[#0E0B14] min-h-screen overflow-x-hidden">
      <Navbar />

      <div ref={sectionRef} className="pt-24 pb-32 px-8 lg:px-20">
        <div className="max-w-7xl mx-auto">

          {/* Hero */}
          <div className="about-heading text-center mb-24">
            <div className="flex items-center justify-center gap-3 mb-6">
              <HiSparkles size={14} className="text-lime-400" />
              <div className="h-px w-12 bg-white/[0.06]" />
            </div>
            <h1 className="text-white text-4xl lg:text-6xl font-bold leading-tight mb-6">
              Built for learners.<br />
              <span className="text-white/25">By learners.</span>
            </h1>
            <p className="text-white/35 text-sm leading-relaxed max-w-2xl mx-auto">
              Tether was born from a simple observation: everyone knows something worth teaching, 
              and everyone has something worth learning. We are building the infrastructure to make 
              that exchange as seamless as possible.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
            {stats.map((stat) => (
              <div key={stat.label} className="stat-item text-center p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01]">
                <p className="text-3xl lg:text-4xl font-black mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </p>
                <p className="text-white/30 text-xs uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <p className="text-amber-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Our Values
              </p>
              <h2 className="text-white text-3xl lg:text-4xl font-bold">
                What drives us
              </h2>
            </div>
            <div className="values-grid grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
              {values.map((value) => {
                const Icon = value.icon
                return (
                  <div key={value.title} className="value-item group relative">
                    <div
                      className="absolute -top-2 -left-2 w-16 h-16 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `${value.color}15` }}
                    />
                    <div className="flex items-center gap-3 mb-4">
                      <Icon size={18} style={{ color: value.color }} className="shrink-0" />
                      <div className="h-px flex-1 bg-white/[0.06]" />
                    </div>
                    <h3 className="text-white/80 font-semibold text-lg mb-3 transition-colors duration-300 group-hover:text-white">
                      {value.title}
                    </h3>
                    <p className="text-white/30 text-sm leading-relaxed">
                      {value.description}
                    </p>
                    <div
                      className="mt-5 h-px w-0 group-hover:w-full transition-all duration-500 ease-out"
                      style={{ background: `linear-gradient(to right, ${value.color}60, transparent)` }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Team */}
          <div className="mb-24">
            <div className="text-center mb-16">
              <p className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                The Team
              </p>
              <h2 className="text-white text-3xl lg:text-4xl font-bold">
                Meet the builders
              </h2>
            </div>
            <div className="team-grid grid grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member) => (
                <div key={member.name} className="team-item group text-center p-6 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.08] hover:bg-white/[0.02] transition-all duration-300">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-bold text-white mx-auto mb-4"
                    style={{ background: member.color }}
                  >
                    {member.initials}
                  </div>
                  <h3 className="text-white/80 font-semibold text-sm mb-1">{member.name}</h3>
                  <p className="text-white/30 text-xs">{member.role}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-white/40 text-sm mb-6">
              Want to join the team? We are always looking for passionate people.
            </p>
            <Link to="/contact">
              <span className="inline-block px-7 py-3 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-105 transition-transform duration-300 shadow-lg shadow-lime-500/20">
                Get in Touch
              </span>
            </Link>
          </div>
        </div>
      </div>

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

export default About
