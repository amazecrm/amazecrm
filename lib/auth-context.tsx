"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: string
  name: string
  email: string
  avatar: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Demo user - Rocky would approve of this friendly explorer
const DEMO_USER: User = {
  id: "demo-user-1",
  name: "Grace Wagner",
  email: "grace@amazecrm.com",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=grace"
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const login = useCallback(() => {
    // Fake login - sets user and redirects to dashboard
    setUser(DEMO_USER)
    router.push("/")
  }, [router])

  const logout = useCallback(() => {
    setUser(null)
    router.push("/landing")
  }, [router])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
