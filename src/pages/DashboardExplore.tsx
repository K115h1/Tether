import { useState } from 'react'
import { BsLightningChargeFill, BsClock, BsCalendar, BsGeoAlt } from 'react-icons/bs'
import { HiMagnifyingGlass, HiBell } from 'react-icons/hi2'
import { IoStarSharp, IoCheckmarkCircle } from 'react-icons/io5'
import { RiVipCrownFill, RiExchangeLine, RiMoneyDollarCircleLine } from 'react-icons/ri'
import { TbWorld } from 'react-icons/tb'
import { FiUser, FiX } from 'react-icons/fi'
import { useAuth } from '../components/AuthContext'

// ── Extended Mock data ─────────────────────────────────────────────────────
const teachers = [
    { 
        initials: 'AO', name: 'Adeola Okonkwo', skills: ['React', 'Three.js', 'UI Design'], 
        rating: 4.9, sessions: 142, color: 'hsl(285, 60%, 45%)', badge: 'Verified', credits: 3,
        bio: 'Frontend engineer with 8 years of experience. I love teaching React and helping people build beautiful interfaces.',
        location: 'Lagos, Nigeria', availability: 'Weekdays 6-9pm', joined: '2023',
        reviews: 89, students: 234, languages: ['English', 'Yoruba'],
        teaches: ['React', 'Three.js', 'UI Design', 'TypeScript', 'Next.js'],
        wantsToLearn: ['Guitar', 'French', 'Data Science']
    },
    { 
        initials: 'TK', name: 'Tunde Kehinde', skills: ['Guitar', 'Music Theory', 'Songwriting'], 
        rating: 4.8, sessions: 89, color: 'hsl(310, 60%, 42%)', badge: null, credits: 2,
        bio: 'Professional guitarist and music producer. I have played for 15 years and love breaking down complex theory into simple concepts.',
        location: 'Abuja, Nigeria', availability: 'Weekends, flexible', joined: '2024',
        reviews: 67, students: 156, languages: ['English', 'Hausa'],
        teaches: ['Guitar', 'Music Theory', 'Songwriting', 'Piano Basics', 'Audio Production'],
        wantsToLearn: ['Coding', 'Photography', 'Business']
    },
    { 
        initials: 'FM', name: 'Fatima Musa', skills: ['SQL', 'Python', 'Data Analysis'], 
        rating: 5.0, sessions: 201, color: 'hsl(260, 60%, 48%)', badge: 'Top Teacher', credits: 4,
        bio: 'Data scientist at a fintech startup. I make data accessible to everyone, from beginners to advanced analysts.',
        location: 'Kano, Nigeria', availability: 'Mon, Wed, Fri evenings', joined: '2023',
        reviews: 134, students: 412, languages: ['English', 'Hausa', 'Arabic'],
        teaches: ['SQL', 'Python', 'Data Analysis', 'Machine Learning', 'Excel Advanced'],
        wantsToLearn: ['Public Speaking', 'Design', 'Spanish']
    },
    { 
        initials: 'EB', name: 'Emeka Bright', skills: ['Calisthenics', 'Fitness', 'Nutrition'], 
        rating: 4.7, sessions: 67, color: 'hsl(230, 55%, 45%)', badge: null, credits: 2,
        bio: 'Certified personal trainer and nutritionist. I help people build sustainable fitness habits without gym equipment.',
        location: 'Port Harcourt, Nigeria', availability: 'Early mornings 5-7am', joined: '2024',
        reviews: 45, students: 98, languages: ['English', 'Igbo'],
        teaches: ['Calisthenics', 'Fitness', 'Nutrition', 'Weight Loss', 'Meal Planning'],
        wantsToLearn: ['Coding', 'Photography', 'Music Production']
    },
    { 
        initials: 'CN', name: 'Chioma Nwosu', skills: ['Illustration', 'Figma', 'Branding'], 
        rating: 4.9, sessions: 156, color: 'hsl(200, 55%, 45%)', badge: 'Verified', credits: 3,
        bio: 'Brand designer and illustrator. I have worked with startups across Africa to build memorable visual identities.',
        location: 'Enugu, Nigeria', availability: 'Tue, Thu, Sat afternoons', joined: '2023',
        reviews: 112, students: 267, languages: ['English', 'Igbo'],
        teaches: ['Illustration', 'Figma', 'Branding', 'Logo Design', 'Color Theory'],
        wantsToLearn: ['Motion Design', '3D Modeling', 'Business Strategy']
    },
    { 
        initials: 'IO', name: 'Ibrahim Ojo', skills: ['Yoruba', 'Hausa', 'Translation'], 
        rating: 4.6, sessions: 45, color: 'hsl(340, 60%, 42%)', badge: null, credits: 2,
        bio: 'Linguist and translator with 10 years of experience. I teach Nigerian languages to foreigners and locals alike.',
        location: 'Ibadan, Nigeria', availability: 'Flexible schedule', joined: '2024',
        reviews: 34, students: 78, languages: ['English', 'Yoruba', 'Hausa', 'Arabic'],
        teaches: ['Yoruba', 'Hausa', 'Translation', 'Interpretation', 'Cultural Studies'],
        wantsToLearn: ['French', 'Coding', 'Photography']
    },
    { 
        initials: 'SA', name: 'Sade Akinola', skills: ['Photography', 'Lightroom', 'Composition'], 
        rating: 4.8, sessions: 112, color: 'hsl(25, 70%, 45%)', badge: 'Verified', credits: 3,
        bio: 'Documentary photographer. I teach the art of seeing and capturing moments that tell stories.',
        location: 'Lagos, Nigeria', availability: 'Weekends', joined: '2023',
        reviews: 78, students: 189, languages: ['English', 'Yoruba'],
        teaches: ['Photography', 'Lightroom', 'Composition', 'Street Photography', 'Portrait Lighting'],
        wantsToLearn: ['Videography', 'Business', 'Spanish']
    },
    { 
        initials: 'DK', name: 'David Koffi', skills: ['JavaScript', 'Node.js', 'Backend'], 
        rating: 4.7, sessions: 178, color: 'hsl(150, 55%, 40%)', badge: 'Top Teacher', credits: 4,
        bio: 'Full-stack developer specializing in backend systems. I make server-side concepts accessible to beginners.',
        location: 'Accra, Ghana', availability: 'Weeknights 7-10pm', joined: '2023',
        reviews: 95, students: 312, languages: ['English', 'Twi'],
        teaches: ['JavaScript', 'Node.js', 'Backend', 'APIs', 'Database Design'],
        wantsToLearn: ['UI Design', 'Public Speaking', 'French']
    },
    { 
        initials: 'NA', name: 'Ngozi Adeleke', skills: ['Public Speaking', 'Presentation', 'Leadership'], 
        rating: 4.9, sessions: 134, color: 'hsl(55, 60%, 42%)', badge: 'Verified', credits: 3,
        bio: 'TEDx speaker and corporate trainer. I help people find their voice and command any room.',
        location: 'Lagos, Nigeria', availability: 'Flexible', joined: '2024',
        reviews: 87, students: 245, languages: ['English', 'Igbo', 'Yoruba'],
        teaches: ['Public Speaking', 'Presentation', 'Leadership', 'Negotiation', 'Storytelling'],
        wantsToLearn: ['Coding', 'Design', 'French']
    },
    { 
        initials: 'MO', name: 'Mohammed Osei', skills: ['Excel', 'Financial Modeling', 'Analysis'], 
        rating: 4.8, sessions: 203, color: 'hsl(180, 50%, 40%)', badge: 'Top Teacher', credits: 4,
        bio: 'Financial analyst with CFA certification. I turn Excel into a superpower for professionals.',
        location: 'Kumasi, Ghana', availability: 'Sat-Sun all day', joined: '2023',
        reviews: 145, students: 389, languages: ['English', 'Twi', 'Hausa'],
        teaches: ['Excel', 'Financial Modeling', 'Analysis', 'Power BI', 'Budgeting'],
        wantsToLearn: ['Python', 'Design', 'Public Speaking']
    },
    { 
        initials: 'ZA', name: 'Zainab Abdi', skills: ['Arabic', 'Quran', 'Calligraphy'], 
        rating: 4.9, sessions: 78, color: 'hsl(320, 55%, 45%)', badge: 'Verified', credits: 3,
        bio: 'Islamic studies graduate and calligraphy artist. I teach Arabic from zero to fluency with patience.',
        location: 'Kano, Nigeria', availability: 'Mon-Fri mornings', joined: '2024',
        reviews: 56, students: 134, languages: ['Arabic', 'English', 'Hausa'],
        teaches: ['Arabic', 'Quran', 'Calligraphy', 'Islamic Studies', 'Tajweed'],
        wantsToLearn: ['Coding', 'Photography', 'Business']
    },
    { 
        initials: 'JO', name: 'James Odhiambo', skills: ['Chess', 'Strategy', 'Critical Thinking'], 
        rating: 4.7, sessions: 56, color: 'hsl(40, 60%, 45%)', badge: null, credits: 2,
        bio: 'Chess master and strategy consultant. I use chess to teach life skills and decision-making.',
        location: 'Nairobi, Kenya', availability: 'Evenings 6-9pm', joined: '2024',
        reviews: 34, students: 89, languages: ['English', 'Swahili'],
        teaches: ['Chess', 'Strategy', 'Critical Thinking', 'Problem Solving', 'Tactics'],
        wantsToLearn: ['Coding', 'Music', 'Photography']
    },
]

const trendingSkills = [
    { label: '3D Web Dev', icon: TbWorld, color: '#84CC16' },
    { label: 'Calisthenics', icon: BsLightningChargeFill, color: '#F59E0B' },
    { label: 'Guitar', icon: BsLightningChargeFill, color: '#7C5CBF' },
    { label: 'SQL', icon: BsLightningChargeFill, color: '#84CC16' },
    { label: 'Illustration', icon: BsLightningChargeFill, color: '#F59E0B' },
    { label: 'Yoruba', icon: TbWorld, color: '#7C5CBF' },
    { label: 'Photography', icon: BsLightningChargeFill, color: '#84CC16' },
    { label: 'Excel', icon: BsLightningChargeFill, color: '#F59E0B' },
]

const recentActivity = [
    { text: 'Fatima accepted your session request', time: '2h ago', dot: '#84CC16' },
    { text: 'You earned 2 credits from your React session', time: '1d ago', dot: '#F59E0B' },
    { text: 'New review on your profile: 5.0', time: '2d ago', dot: '#7C5CBF' },
    { text: 'Tunde shared a resource with you', time: '3d ago', dot: '#84CC16' },
    { text: 'David booked a session with you', time: '4d ago', dot: '#F59E0B' },
]

const categories: Record<string, string[]> = {
    'Tech': ['React', 'Three.js', 'UI Design', 'SQL', 'Python', 'Data Analysis', 'JavaScript', 'Node.js', 'Backend', 'Excel', 'Financial Modeling', 'Analysis'],
    'Music': ['Guitar', 'Music Theory', 'Songwriting', 'Piano Basics', 'Audio Production'],
    'Fitness': ['Calisthenics', 'Fitness', 'Nutrition', 'Weight Loss', 'Meal Planning'],
    'Language': ['Yoruba', 'Hausa', 'Translation', 'Arabic', 'Quran', 'Tajweed'],
    'Art': ['Illustration', 'Figma', 'Branding', 'Logo Design', 'Color Theory', 'Photography', 'Lightroom', 'Composition'],
    'Business': ['Public Speaking', 'Presentation', 'Leadership', 'Negotiation', 'Storytelling', 'Chess', 'Strategy', 'Critical Thinking'],
}

// ── Teacher Detail Modal ─────────────────────────────────────────────────────
function TeacherModal({ teacher, onClose, userCredits }: { teacher: typeof teachers[0], onClose: () => void, userCredits: number }) {
    const [paymentMethod, setPaymentMethod] = useState<'exchange' | 'credits' | 'money'>('credits')
    const [selectedSkill, setSelectedSkill] = useState('')
    const [bookingConfirmed, setBookingConfirmed] = useState(false)

    const handleBook = () => {
        setBookingConfirmed(true)
        setTimeout(() => {
            setBookingConfirmed(false)
            onClose()
        }, 2000)
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-[#0E0B14] border border-white/[0.08] rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Close button */}
                <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.05] flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.1] transition-all z-10">
                    <FiX size={16} />
                </button>

                {/* Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-lg font-bold text-white shrink-0" style={{ background: teacher.color }}>
                            {teacher.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-white text-lg font-bold">{teacher.name}</h2>
                                {teacher.badge && (
                                    <span className="text-[9px] text-amber-400/70 border border-amber-400/20 px-1.5 py-0.5 rounded-full">{teacher.badge}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-white/40">
                                <BsGeoAlt size={10} />
                                <span>{teacher.location}</span>
                                <span className="text-white/20">·</span>
                                <span>Joined {teacher.joined}</span>
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{teacher.bio}</p>

                    {/* Stats row */}
                    <div className="flex gap-4 mb-4">
                        <div className="flex items-center gap-1.5">
                            <IoStarSharp size={14} className="text-amber-400" />
                            <span className="text-white/80 text-sm font-semibold">{teacher.rating}</span>
                            <span className="text-white/30 text-xs">({teacher.reviews} reviews)</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <FiUser size={12} className="text-white/30" />
                            <span className="text-white/50 text-xs">{teacher.students} students</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <BsClock size={12} className="text-white/30" />
                            <span className="text-white/50 text-xs">{teacher.sessions} sessions</span>
                        </div>
                    </div>

                    {/* Availability */}
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] mb-4">
                        <BsCalendar size={14} className="text-lime-400" />
                        <span className="text-white/60 text-xs">Available: <span className="text-white/80">{teacher.availability}</span></span>
                    </div>
                </div>

                {/* Skills they teach */}
                <div className="px-6 pb-4">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Teaches</p>
                    <div className="flex gap-2 flex-wrap">
                        {teacher.teaches.map(s => (
                            <span key={s} className="text-xs text-white/60 bg-white/[0.05] border border-white/[0.08] px-3 py-1.5 rounded-full">{s}</span>
                        ))}
                    </div>
                </div>

                {/* Wants to learn */}
                <div className="px-6 pb-4">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Wants to learn</p>
                    <div className="flex gap-2 flex-wrap">
                        {teacher.wantsToLearn.map(s => (
                            <span key={s} className="text-xs text-white/40 border border-white/[0.06] px-3 py-1.5 rounded-full">{s}</span>
                        ))}
                    </div>
                </div>

                {/* Languages */}
                <div className="px-6 pb-4">
                    <p className="text-white/30 text-xs uppercase tracking-widest mb-3">Languages</p>
                    <div className="flex gap-2">
                        {teacher.languages.map(l => (
                            <span key={l} className="text-xs text-white/50">{l}</span>
                        ))}
                    </div>
                </div>

                {/* Payment Section */}
                <div className="px-6 pb-6 border-t border-white/[0.06] pt-6">
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Choose payment method</p>

                    <div className="flex gap-2 mb-5">
                        <button 
                            onClick={() => setPaymentMethod('exchange')}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${paymentMethod === 'exchange' ? 'border-lime-500/40 bg-lime-500/10' : 'border-white/[0.06] hover:border-white/10'}`}
                        >
                            <RiExchangeLine size={20} className={paymentMethod === 'exchange' ? 'text-lime-400' : 'text-white/30'} />
                            <span className={`text-xs font-medium ${paymentMethod === 'exchange' ? 'text-lime-400' : 'text-white/40'}`}>Skill Exchange</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('credits')}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${paymentMethod === 'credits' ? 'border-amber-500/40 bg-amber-500/10' : 'border-white/[0.06] hover:border-white/10'}`}
                        >
                            <BsLightningChargeFill size={20} className={paymentMethod === 'credits' ? 'text-amber-400' : 'text-white/30'} />
                            <span className={`text-xs font-medium ${paymentMethod === 'credits' ? 'text-amber-400' : 'text-white/40'}`}>{teacher.credits} Credits</span>
                        </button>
                        <button 
                            onClick={() => setPaymentMethod('money')}
                            className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition-all duration-200 ${paymentMethod === 'money' ? 'border-[#7C5CBF]/40 bg-[#7C5CBF]/10' : 'border-white/[0.06] hover:border-white/10'}`}
                        >
                            <RiMoneyDollarCircleLine size={20} className={paymentMethod === 'money' ? 'text-[#7C5CBF]' : 'text-white/30'} />
                            <span className={`text-xs font-medium ${paymentMethod === 'money' ? 'text-[#7C5CBF]' : 'text-white/40'}`}>₦2,500</span>
                        </button>
                    </div>

                    {/* Payment details */}
                    {paymentMethod === 'exchange' && (
                        <div className="mb-5">
                            <p className="text-white/40 text-xs mb-2">Select a skill you can teach in exchange:</p>
                            <div className="flex gap-2 flex-wrap">
                                {['React Basics', 'JavaScript', 'UI Design', 'Photography', 'Writing'].map(skill => (
                                    <button 
                                        key={skill}
                                        onClick={() => setSelectedSkill(skill)}
                                        className={`text-xs px-3 py-1.5 rounded-full border transition-all ${selectedSkill === skill ? 'border-lime-500/40 bg-lime-500/10 text-lime-400' : 'border-white/[0.06] text-white/40 hover:border-white/10'}`}
                                    >
                                        {skill}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'credits' && (
                        <div className="mb-5 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                            <div className="flex items-center justify-between">
                                <span className="text-white/50 text-xs">Your balance</span>
                                <span className="text-amber-400 text-sm font-bold">{userCredits} credits</span>
                            </div>
                            <div className="flex items-center justify-between mt-1">
                                <span className="text-white/50 text-xs">Session cost</span>
                                <span className="text-white/70 text-sm">-{teacher.credits} credits</span>
                            </div>
                            <div className="h-px bg-white/[0.06] my-2" />
                            <div className="flex items-center justify-between">
                                <span className="text-white/60 text-xs font-medium">Remaining</span>
                                <span className="text-white text-sm font-bold">{userCredits - teacher.credits} credits</span>
                            </div>
                        </div>
                    )}

                    {paymentMethod === 'money' && (
                        <div className="mb-5 p-3 rounded-xl bg-[#7C5CBF]/5 border border-[#7C5CBF]/10">
                            <p className="text-white/50 text-xs mb-2">Direct payment</p>
                            <div className="flex items-center justify-between">
                                <span className="text-white/60 text-sm">Session fee</span>
                                <span className="text-white text-lg font-bold">₦2,500</span>
                            </div>
                            <p className="text-white/30 text-[10px] mt-1">No credits needed. Instant booking.</p>
                        </div>
                    )}

                    {/* Book button */}
                    <button 
                        onClick={handleBook}
                        disabled={paymentMethod === 'exchange' && !selectedSkill}
                        className="w-full py-3 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-lime-500/15 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {bookingConfirmed ? (
                            <span className="flex items-center justify-center gap-2">
                                <IoCheckmarkCircle size={16} />
                                Booked!
                            </span>
                        ) : (
                            'Confirm Booking'
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

// ── Component ────────────────────────────────────────────────────────────────
export default function DashboardExplore() {
    const { user } = useAuth()
    const [search, setSearch] = useState('')
    const [activeFilter, setActiveFilter] = useState('All')
    const [selectedTeacher, setSelectedTeacher] = useState<typeof teachers[0] | null>(null)

    const filters = ['All', 'Tech', 'Music', 'Fitness', 'Language', 'Art', 'Business']

    const filtered = teachers.filter(t =>
        (activeFilter === 'All' || t.skills.some(s => categories[activeFilter]?.includes(s))) &&
        (t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.skills.some(s => s.toLowerCase().includes(search.toLowerCase())))
    )

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 17) return 'Good afternoon'
        return 'Good evening'
    }

    return (
        <div className="flex">
            {/* Modal */}
            {selectedTeacher && (
                <TeacherModal 
                    teacher={selectedTeacher} 
                    onClose={() => setSelectedTeacher(null)}
                    userCredits={user?.credits || 12}
                />
            )}

            {/* ── Main ── */}
            <div className="flex-1 min-w-0 px-6 lg:px-10 py-8">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <p className="text-white/25 text-xs uppercase tracking-widest mb-1">{getGreeting()}</p>
                        <h1 className="text-white text-xl font-bold">What are you learning today?</h1>
                    </div>
                    <button className="relative w-9 h-9 rounded-full border border-white/[0.07] flex items-center justify-center text-white/30 hover:text-white/60 transition-colors">
                        <HiBell size={15} />
                        <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-lime-400" />
                    </button>
                </div>

                {/* Search */}
                <div className="relative mb-8">
                    <HiMagnifyingGlass size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                    <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skills or teachers..." className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full pl-10 pr-5 py-3 text-white/70 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/30 transition-all duration-300" />
                </div>

                {/* Filters */}
                <div className="flex gap-2 flex-wrap mb-10">
                    {filters.map(f => (
                        <button key={f} onClick={() => setActiveFilter(f)} className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${activeFilter === f ? 'bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14]' : 'border border-white/[0.07] text-white/30 hover:border-white/20 hover:text-white/60'}`}>
                            {f}
                        </button>
                    ))}
                </div>

                {/* Trending */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-5">
                        <span className="text-white/25 text-xs uppercase tracking-widest">Trending skills</span>
                        <div className="h-px flex-1 bg-white/[0.04]" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {trendingSkills.map(({ label, icon: Icon, color }) => (
                            <button key={label} onClick={() => setSearch(label)} className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.06] hover:border-white/15 transition-all duration-200 group">
                                <Icon size={10} style={{ color }} />
                                <span className="text-white/40 text-xs group-hover:text-white/70 transition-colors">{label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Teachers */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-white/25 text-xs uppercase tracking-widest">Teachers for you</span>
                        <div className="h-px flex-1 bg-white/[0.04]" />
                        <span className="text-white/20 text-xs">{filtered.length} found</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filtered.map((teacher) => (
                            <div 
                                key={teacher.name} 
                                onClick={() => setSelectedTeacher(teacher)}
                                className="group relative border border-white/[0.06] rounded-2xl p-5 hover:border-white/[0.12] hover:bg-white/[0.02] transition-all duration-300 cursor-pointer"
                            >
                                <div className="absolute -top-2 -left-2 w-20 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `${teacher.color}20` }} />

                                {/* Top row: Avatar + Name + Skills + Badge */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: teacher.color }}>
                                            {teacher.initials}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <p className="text-white/80 text-sm font-semibold truncate">{teacher.name}</p>
                                                {teacher.badge && <span className="text-[9px] text-amber-400/70 border border-amber-400/20 px-1.5 py-0.5 rounded-full shrink-0">{teacher.badge}</span>}
                                            </div>
                                            {/* Skills highlighted beside name */}
                                            <div className="flex gap-1 flex-wrap">
                                                {teacher.skills.map(s => (
                                                    <span key={s} className="text-[10px] text-white/50 bg-white/[0.05] border border-white/[0.06] px-2 py-0.5 rounded-full">{s}</span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom row: Stats + Rating + Book */}
                                <div className="flex items-center justify-between pt-3 border-t border-white/[0.04]">
                                    <div className="flex items-center gap-3">
                                        <p className="text-white/20 text-xs">{teacher.sessions} sessions</p>
                                        {/* Rating moved to bottom */}
                                        <div className="flex items-center gap-1">
                                            <IoStarSharp size={11} className="text-amber-400" />
                                            <span className="text-white/50 text-xs">{teacher.rating}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <BsLightningChargeFill size={9} className="text-amber-400" />
                                        <span className="text-white/40 text-xs">{teacher.credits} credits</span>
                                        <span className="text-white/10 text-xs mx-1">·</span>
                                        <span className="text-lime-400 text-xs font-medium">View</span>
                                    </div>
                                </div>

                                {/* Hover bottom line */}
                                <div className="mt-4 h-px w-0 group-hover:w-full transition-all duration-500 ease-out" style={{ background: `linear-gradient(to right, ${teacher.color}60, transparent)` }} />
                            </div>
                        ))}
                        {filtered.length === 0 && (
                            <div className="col-span-2 text-center py-12">
                                <p className="text-white/30 text-sm">No teachers found matching your search.</p>
                                <button onClick={() => {setSearch(''); setActiveFilter('All')}} className="mt-2 text-lime-400 text-xs hover:text-lime-300 transition-colors">Clear filters</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Right panel ── */}
            <aside className="hidden xl:flex flex-col w-64 shrink-0 border-l border-white/[0.04] px-6 py-8 sticky top-0 h-screen">
                <div className="flex items-center gap-3 mb-8">
                    <span className="text-white/25 text-xs uppercase tracking-widest">Activity</span>
                    <div className="h-px flex-1 bg-white/[0.04]" />
                </div>
                <div className="flex flex-col gap-6">
                    {recentActivity.map((item, i) => (
                        <div key={i} className="flex gap-3 group">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: item.dot }} />
                            <div>
                                <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors">{item.text}</p>
                                <p className="text-white/15 text-[10px] mt-1">{item.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-auto pt-8 border-t border-white/[0.04]">
                    <div className="flex items-center gap-2 mb-2">
                        <RiVipCrownFill size={12} className="text-amber-400" />
                        <span className="text-white/40 text-xs font-medium">Go Premium</span>
                    </div>
                    <p className="text-white/20 text-xs leading-relaxed mb-4">Skip the credits. Book any teacher directly for ₦4,999/mo.</p>
                    <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-xs hover:scale-[1.02] transition-transform duration-300">Upgrade</button>
                </div>
            </aside>
        </div>
    )
}