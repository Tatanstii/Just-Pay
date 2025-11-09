import { createFileRoute } from '@tanstack/react-router'
import LoginPage from '../pages/login'
import { redirectIfAuthenticated } from '../lib/auth';

export const Route = createFileRoute('/login')({
    beforeLoad: redirectIfAuthenticated,
    component: LoginPage
})