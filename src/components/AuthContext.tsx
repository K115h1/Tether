import { createContext, useContext, useState, useEffect } from 'react'

export interface Session {
    id: string
    teacherName: string
    teacherInitials: string
    teacherColor: string
    skill: string
    date: string
    time: string
    status: 'upcoming' | 'completed' | 'cancelled'
    credits: number
    rating?: number
}

export interface Message {
    id: string
    sender: string
    senderInitials: string
    senderColor: string
    text: string
    time: string
    read: boolean
}

export interface User {
    fullName: string
    email: string
    initials: string
    color: string
    plan: string
    credits: number
    bio: string
    skills: string[]
    location: string
    sessions: Session[]
    messages: Message[]
    rating: number
    totalSessions: number
}

interface AuthContextType {
    user: User | null
    login: (email: string, password: string) => Promise<boolean>
    signup: (fullName: string, email: string, password: string) => Promise<boolean>
    logout: () => void
    bookSession: (teacherName: string, teacherInitials: string, teacherColor: string, skill: string, credits: number) => void
    sendMessage: (text: string, sender: string, senderInitials: string, senderColor: string) => void
    markMessageRead: (id: string) => void
    updateProfile: (updates: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem('tether_user')
        if (stored) {
            setUser(JSON.parse(stored))
        }
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem('tether_user', JSON.stringify(user))
        } else {
            localStorage.removeItem('tether_user')
        }
    }, [user])

    const login = async (email: string, password: string): Promise<boolean> => {
        const users = JSON.parse(localStorage.getItem('tether_users') || '[]')
        const found = users.find((u: any) => u.email === email && u.password === password)

        if (found) {
            const userData: User = {
                fullName: found.fullName,
                email: found.email,
                initials: found.fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
                color: found.color || 'hsl(260, 60%, 48%)',
                plan: 'Free',
                credits: 12,
                bio: '',
                skills: [],
                location: '',
                sessions: [],
                messages: [],
                rating: 0,
                totalSessions: 0,
            }
            setUser(userData)
            return true
        }
        return false
    }

    const signup = async (fullName: string, email: string, password: string): Promise<boolean> => {
        const users = JSON.parse(localStorage.getItem('tether_users') || '[]')
        if (users.find((u: any) => u.email === email)) {
            return false
        }

        const colors = [
            'hsl(285, 60%, 45%)',
            'hsl(310, 60%, 42%)',
            'hsl(260, 60%, 48%)',
            'hsl(230, 55%, 45%)',
            'hsl(200, 55%, 45%)',
        ]
        const color = colors[Math.floor(Math.random() * colors.length)]

        const newUser = { fullName, email, password, color }
        users.push(newUser)
        localStorage.setItem('tether_users', JSON.stringify(users))

        const userData: User = {
            fullName,
            email,
            initials: fullName.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
            color,
            plan: 'Free',
            credits: 12,
            bio: '',
            skills: [],
            location: '',
            sessions: [],
            messages: [],
            rating: 0,
            totalSessions: 0,
        }
        setUser(userData)
        return true
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem('tether_user')
    }

    const bookSession = (teacherName: string, teacherInitials: string, teacherColor: string, skill: string, credits: number) => {
        setUser(prev => {
            if (!prev) return null
            const newSession: Session = {
                id: 'sess_' + Date.now(),
                teacherName,
                teacherInitials,
                teacherColor,
                skill,
                date: new Date(Date.now() + 86400000 * 2).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
                time: '2:00 PM',
                status: 'upcoming',
                credits,
            }
            return {
                ...prev,
                credits: prev.credits - credits,
                sessions: [...prev.sessions, newSession],
                totalSessions: prev.totalSessions + 1,
            }
        })
    }

    const sendMessage = (text: string, sender: string, senderInitials: string, senderColor: string) => {
        setUser(prev => {
            if (!prev) return null
            const newMessage: Message = {
                id: 'msg_' + Date.now(),
                sender,
                senderInitials,
                senderColor,
                text,
                time: 'Just now',
                read: false,
            }
            return {
                ...prev,
                messages: [...prev.messages, newMessage],
            }
        })
    }

    const markMessageRead = (id: string) => {
        setUser(prev => {
            if (!prev) return null
            return {
                ...prev,
                messages: prev.messages.map(m => m.id === id ? { ...m, read: true } : m),
            }
        })
    }

    const updateProfile = (updates: Partial<User>) => {
        setUser(prev => prev ? { ...prev, ...updates } : null)
    }

    return (
        <AuthContext.Provider value={{ user, login, signup, logout, bookSession, sendMessage, markMessageRead, updateProfile }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
