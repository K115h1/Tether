import { Link } from 'react-router'
import logo from "../assets/hotspot_theta_v2.svg"
import { HiSparkles } from 'react-icons/hi2'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#0E0B14] flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-[#2D1B69]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[200px] bg-lime-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center relative z-10 px-6">
        <div className="flex items-center justify-center gap-3 mb-8">
          <HiSparkles size={14} className="text-lime-400" />
          <div className="h-px w-16 bg-white/[0.06]" />
        </div>

        <h1 className="text-white text-8xl font-black mb-4 tracking-tighter">
          4<span className="text-lime-400">0</span>4
        </h1>

        <p className="text-white/40 text-lg mb-2">Page not found</p>
        <p className="text-white/25 text-sm max-w-sm mx-auto mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        <div className="flex gap-3 justify-center">
          <Link 
            to="/"
            className="px-6 py-3 rounded-full bg-gradient-to-r from-lime-500 to-amber-500 text-[#0E0B14] font-semibold text-sm hover:scale-105 transition-transform duration-300 shadow-lg shadow-lime-500/20"
          >
            Go Home
          </Link>
          <Link 
            to="/contact"
            className="px-6 py-3 rounded-full border border-white/10 text-white/70 text-sm hover:border-white/30 hover:text-white transition-all duration-300"
          >
            Contact Support
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-2">
          <div className="w-16 h-16 rounded-xl  flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <img src={logo} alt="logo" />
                    </div>
          <span className="text-white/20 text-xs">Tether</span>
        </div>
      </div>
    </div>
  )
}

export default NotFound
