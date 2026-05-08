import { Routes, Route } from 'react-router'
import DashboardLayout from './DashboardLayout'
import DashboardExplore from './DashboardExplore'
import DashboardSessions from './DashboardSessions'
import DashboardMessages from './DashboardMessages'
import DashboardProfile from './DashboardProfile'
import DashboardSettings from './DashboardSettings'

export default function Dashboard() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index element={<DashboardExplore />} />
                <Route path="sessions" element={<DashboardSessions />} />
                <Route path="messages" element={<DashboardMessages />} />
                <Route path="profile" element={<DashboardProfile />} />
                <Route path="settings" element={<DashboardSettings />} />
            </Routes>
        </DashboardLayout>
    )
}
