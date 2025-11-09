import { redirectIfNotAuthenticated } from '@/lib/auth'
import UserPanelPage from '@/pages/user-panel'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__protected/user-panel')({
    beforeLoad: redirectIfNotAuthenticated,
    component: UserPanelPage
})
