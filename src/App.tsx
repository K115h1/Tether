import { BrowserRouter, Routes, Route } from 'react-router'
import { AuthProvider } from './components/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Contact from './pages/Contact'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/dashboard/*" element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default App
