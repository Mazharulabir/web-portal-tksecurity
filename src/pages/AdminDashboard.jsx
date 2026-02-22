import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { HiUserGroup, HiBriefcase, HiChartBar, HiCog, HiDocumentReport, HiShieldCheck } from 'react-icons/hi'
import { FiLogOut } from 'react-icons/fi'

const quickLinks = [
  { icon: HiUserGroup, title: 'Staff Management', desc: 'Manage employees & schedules', color: 'from-indigo-600 to-indigo-400' },
  { icon: HiBriefcase, title: 'Client Management', desc: 'Clients, contracts & sites', color: 'from-cyan-600 to-cyan-400' },
  { icon: HiChartBar, title: 'Analytics', desc: 'Performance & revenue data', color: 'from-blue-600 to-blue-400' },
  { icon: HiDocumentReport, title: 'All Reports', desc: 'Daily, incident & audit logs', color: 'from-emerald-600 to-emerald-400' },
  { icon: HiShieldCheck, title: 'Compliance', desc: 'Licenses, trainings & audits', color: 'from-blue-600 to-blue-400' },
  { icon: HiCog, title: 'System Settings', desc: 'Roles, permissions & config', color: 'from-purple-600 to-purple-400' },
]

export default function AdminDashboard() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <>
      <div className="pt-24" />

      <section className="relative py-16 z-10 overflow-hidden min-h-[85vh]">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-indigo-500/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] bg-blue-500/6 rounded-full blur-[140px]" />

        <div className="max-w-6xl mx-auto px-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-indigo-400 text-xs font-semibold uppercase tracking-widest">
                Admin Portal
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Welcome, <span className="gradient-text">{user?.name || 'Admin'}</span>
              </h1>
              <p className="text-slate-400 text-sm mt-1">{user?.email}</p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all text-sm font-medium"
            >
              <FiLogOut />
              Logout
            </motion.button>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
          >
            {[
              { label: 'Total Employees', value: '156', color: 'text-indigo-400', change: '+5 this month' },
              { label: 'Active Clients', value: '42', color: 'text-cyan-400', change: '+3 this month' },
              { label: 'Active Sites', value: '67', color: 'text-blue-400', change: '98% covered' },
              { label: 'Monthly Revenue', value: '$284K', color: 'text-emerald-400', change: '+12% vs last' },
            ].map((item) => (
              <div key={item.label} className="glass rounded-xl p-5 border border-white/5 text-center">
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{item.label}</p>
                <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                <p className="text-xs text-slate-600 mt-1">{item.change}</p>
              </div>
            ))}
          </motion.div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickLinks.map((link, i) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
                className="group glass rounded-xl p-6 border border-white/5 hover:border-white/15 cursor-pointer transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-lg bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <link.icon className="text-white text-xl" />
                </div>
                <h3 className="text-white font-semibold mb-1">{link.title}</h3>
                <p className="text-slate-500 text-xs">{link.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* System Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-8 glass rounded-2xl p-6 border border-white/5"
          >
            <h3 className="text-white font-semibold mb-4">System Alerts</h3>
            <div className="space-y-3">
              {[
                { text: '3 employees require license renewal before March', time: 'Action needed', color: 'bg-blue-400' },
                { text: 'New client onboarding: Ford Construction — pending setup', time: 'Today', color: 'bg-blue-400' },
                { text: 'Monthly compliance audit completed — all passed', time: 'Yesterday', color: 'bg-emerald-400' },
                { text: 'Payroll processing scheduled for Feb 28', time: 'Upcoming', color: 'bg-indigo-400' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                  <div className={`w-2 h-2 rounded-full ${item.color} flex-shrink-0`} />
                  <span className="text-slate-300 text-sm flex-1">{item.text}</span>
                  <span className="text-slate-600 text-xs whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
