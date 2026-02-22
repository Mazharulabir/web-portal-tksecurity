import { useState, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenuAlt3, HiX } from 'react-icons/hi'
import { FiLogIn, FiLogOut } from 'react-icons/fi'
import TKLogo from './TKLogo'
import ThemeToggle from './ThemeToggle'
import { useAuth } from '../context/AuthContext'

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About Us', to: '/about' },
  { name: 'Founder and CEO', to: '/founder' },
  { name: 'Services', to: '/services' },
  { name: 'Contact Us', to: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2"
          >
            <TKLogo className="w-11 h-11 drop-shadow-lg" />
            <div>
              <span className="text-xl font-bold text-white block leading-tight">TK Security</span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest">Protection Services</span>
            </div>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition-colors relative group ${
                  isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <motion.span whileHover={{ y: -2 }} className="inline-block">
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 via-blue-400 to-blue-400 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </motion.span>
              )}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link to={`/dashboard/${user?.role}`}>
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className="text-sm text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Dashboard
                </motion.span>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-red-400 hover:border-red-500/30 text-sm font-medium transition-all cursor-pointer"
              >
                <FiLogOut className="text-base" />
                Logout
              </motion.button>
              <ThemeToggle />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <motion.span
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59,130,246,0.4)' }}
                  whileTap={{ scale: 0.95 }}
                  className="relative flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-400 text-white text-sm font-semibold overflow-hidden group cursor-pointer shadow-lg"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-300 via-blue-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <FiLogIn className="relative z-10 text-base" />
                  <span className="relative z-10">Login</span>
                </motion.span>
              </Link>
              <ThemeToggle />
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden glass overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.to}
                  className={({ isActive }) =>
                    `transition-colors ${isActive ? 'text-white font-semibold' : 'text-slate-300 hover:text-white'}`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              {isAuthenticated ? (
                <>
                  <Link
                    to={`/dashboard/${user?.role}`}
                    className="text-slate-300 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false) }}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-800/60 border border-slate-700/50 text-red-400 text-sm font-semibold"
                  >
                    <FiLogOut />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-400 text-white text-sm font-semibold shadow-lg"
                  onClick={() => setIsOpen(false)}
                >
                  <FiLogIn />
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
