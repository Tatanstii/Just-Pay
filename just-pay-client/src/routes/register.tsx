import { createFileRoute } from '@tanstack/react-router'
import { redirectIfAuthenticated } from '../lib/auth';
import RegisterPage from '../pages/register'

export const Route = createFileRoute('/register')({
    beforeLoad: redirectIfAuthenticated,
    component: RegisterPage,
})
