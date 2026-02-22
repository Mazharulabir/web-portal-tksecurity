import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isLight = theme === 'light'

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="relative w-9 h-9 rounded-full flex items-center justify-center border-2 border-blue-400 transition-colors duration-300 cursor-pointer"
      style={{
        background: isLight
          ? 'rgba(59, 130, 246, 0.15)'
          : 'rgba(255, 255, 255, 0.08)',
      }}
      aria-label="Toggle dark/light mode"
    >
      {/* Sun icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[18px] h-[18px] absolute"
        initial={false}
        animate={{
          scale: isLight ? 1 : 0,
          rotate: isLight ? 0 : -90,
          opacity: isLight ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        style={{ color: '#f59e0b' }}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </motion.svg>

      {/* Moon icon */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-[18px] h-[18px] absolute"
        initial={false}
        animate={{
          scale: isLight ? 0 : 1,
          rotate: isLight ? 90 : 0,
          opacity: isLight ? 0 : 1,
        }}
        transition={{ duration: 0.3 }}
        style={{ color: '#93c5fd' }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </motion.svg>
    </motion.button>
  )
}
