import { createFileRoute } from '@tanstack/react-router'
import DashboardPage from '../../pages/dashboard'
import { redirectIfNotAuthenticated } from '@/lib/auth'

export const Route = createFileRoute('/__protected/dashboard')({
    beforeLoad: redirectIfNotAuthenticated,
    component: DashboardPage,
})