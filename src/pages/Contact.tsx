import { useState } from 'react'
import { Link } from 'react-router'
import { HiSparkles } from 'react-icons/hi2'
import { RiMailLine, RiPhoneLine, RiMapPinLine, RiSendPlaneLine } from 'react-icons/ri'
import logo from "../assets/hotspot_theta_v2.svg"

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="min-h-screen bg-[#0E0B14] flex relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#2D1B69]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[200px] bg-lime-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Left panel - Info */}
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
            Let us hear<br />
            <span className="text-white/25">from you.</span>
          </p>
          <p className="text-white/30 text-sm leading-relaxed">
            Whether you have a question about features, pricing, need a demo, or anything else, 
            our team is ready to answer all your questions.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
              <RiMailLine size={18} className="text-lime-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Email</p>
              <p className="text-white/80 text-sm">hello@tether.app</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
              <RiPhoneLine size={18} className="text-amber-400" />
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Phone</p>
              <p className="text-white/80 text-sm">+234 (0) 800 123 4567</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center shrink-0">
              <RiMapPinLine size={18} className="text-[#7C5CBF]" />
            </div>
            <div>
              <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Office</p>
              <p className="text-white/80 text-sm">Lagos, Nigeria</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/[0.04] pt-8">
          <p className="text-white/30 text-xs leading-relaxed mb-4">
            Response time: Usually within 24 hours during business days.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
            <span className="text-white/40 text-xs">Support team online</span>
          </div>
        </div>
      </div>

      {/* Right panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-20 relative">
        <Link to="/" className="flex items-center gap-2 mb-12 lg:hidden w-fit">
          <div className="w-16 h-16 rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <img src={logo} alt="logo" />
          </div>
          <span className="text-orange-400 text-lg font-bold">Tether</span>
        </Link>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10">
            <p className="text-lime-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">Get in touch</p>
            <h1 className="text-white text-3xl font-bold mb-2">Send a message</h1>
            <p className="text-white/30 text-sm">
              Fill out the form below and we will get back to you shortly.
            </p>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-lime-500/10 border border-lime-500/20 text-center">
              <div className="w-12 h-12 rounded-full bg-lime-500/20 flex items-center justify-center mx-auto mb-4">
                <RiSendPlaneLine size={24} className="text-lime-400" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">Message sent!</h3>
              <p className="text-white/40 text-sm mb-4">Thank you for reaching out. We will get back to you within 24 hours.</p>
              <button 
                onClick={() => setSubmitted(false)}
                className="text-lime-400 text-sm hover:text-lime-300 transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col sm:flex-row gap-5">
                <div className="flex-1">
                  <label htmlFor="firstName" className="block text-white/40 text-xs tracking-widest uppercase mb-2">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="lastName" className="block text-white/40 text-xs tracking-widest uppercase mb-2">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    required
                    className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-white/40 text-xs tracking-widest uppercase mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-white/40 text-xs tracking-widest uppercase mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-white/40 text-xs tracking-widest uppercase mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more about your inquiry..."
                  required
                  className="w-full bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-3 text-white/80 text-sm placeholder:text-white/15 focus:outline-none focus:border-lime-500/40 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-[1.02] transition-transform duration-300 shadow-lg shadow-lime-500/15 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <RiSendPlaneLine size={16} />
              </button>
            </form>
          )}

          <p className="text-white/15 text-xs text-center mt-8 leading-relaxed">
            By contacting us you agree to our <Link to="#" className="hover:text-white/30 transition-colors">Terms</Link> and <Link to="#" className="hover:text-white/30 transition-colors">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
