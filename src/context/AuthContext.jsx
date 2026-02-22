import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Demo credentials mapped to roles (with username support)
const DEMO_USERS = [
  { email: 'admin@tksecurity.com', username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
  { email: 'client@tksecurity.com', username: 'client', password: 'client123', role: 'client', name: 'Client User' },
  { email: 'employee@tksecurity.com', username: 'employee', password: 'employee123', role: 'employee', name: 'John Officer' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('tk_user')
    return saved ? JSON.parse(saved) : null
  })


  // Accepts either email or username
  const login = (input, password) => {
    const isEmail = input.includes('@')
    let foundUser = null
    if (isEmail) {
      foundUser = DEMO_USERS.find(u => u.email.toLowerCase() === input.toLowerCase())
      if (!foundUser) return { success: false, message: 'Email incorrect' }
    } else {
      foundUser = DEMO_USERS.find(u => u.username && u.username.toLowerCase() === input.toLowerCase())
      if (!foundUser) return { success: false, message: 'Username not correct' }
    }
    if (foundUser.password !== password) return { success: false, message: 'Password incorrect' }

    const userData = { email: foundUser.email, role: foundUser.role, name: foundUser.name }
    setUser(userData)
    localStorage.setItem('tk_user', JSON.stringify(userData))
    return { success: true, role: foundUser.role }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('tk_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
