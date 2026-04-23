import Dashboard from './Dashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'GameSphere-Dashboard',
}

export default function DashboardPage() {
    return (
        <div suppressHydrationWarning>
            <Dashboard />
        </div>
    )
}