import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { HiLockClosed, HiMail, HiShieldCheck } from 'react-icons/hi'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { login, isAuthenticated, user } = useAuth()

  // If already logged in, redirect to their dashboard
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate(`/dashboard/${user.role}`, { replace: true })
    }
  }, [isAuthenticated, user, navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate a brief loading delay
    setTimeout(() => {
      const result = login(formData.email, formData.password)
      if (result.success) {
        navigate(`/dashboard/${result.role}`, { replace: true })
      } else {
        setError(result.message)
      }
      setLoading(false)
    }, 600)
  }

  return (
    <>
      <div className="pt-24" />

      <section className="relative py-20 z-10 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute top-0 -left-32 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-blue-200/20 to-blue-200/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 -right-32 w-96 h-96 bg-gradient-to-br from-blue-200/20 via-blue-400/10 to-cyan-500/8 rounded-full blur-[120px]" />

        <div className="max-w-md mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-400 to-blue-400 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-blue-600/20">
              <HiShieldCheck className="text-white text-3xl" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">Log in to Portal</h1>
            <p className="text-slate-400 text-base">
              Sign in to your TK Security account
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="glass rounded-2xl p-8 space-y-5"
          >
            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
              >
                {error === 'Invalid email or password' ? 'Invalid username or email or password' : error}
              </motion.div>
            )}

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Email or Username</label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                    placeholder="Enter your email or username"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Password</label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                    placeholder="Enter your password"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/60 border border-slate-700/50 text-white placeholder-slate-500 focus:outline-none focus:border-blue-400/50 transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                <input type="checkbox" className="accent-blue-600 rounded" />
                Remember me
              </label>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-400 to-blue-500 text-white font-semibold text-lg hover:from-blue-700 hover:via-blue-300 hover:to-blue-600 transition-all shadow-lg shadow-blue-600/25 disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </motion.form>

          {/* Demo credentials removed */}
        </div>
      </section>
    </>
  )
}
