import { createFileRoute } from '@tanstack/react-router'
import ProtectedLayout from '../layout/protected';
import { redirectIfNotAuthenticated } from '../lib/auth';

export const Route = createFileRoute('/__protected')({
    beforeLoad: redirectIfNotAuthenticated,
    component: ProtectedLayout,
});
