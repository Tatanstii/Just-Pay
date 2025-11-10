import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Toast from '../components/toast'

const RootLayout = () => {

  return (
    (
      <div className='min-h-screen'>
        <Toast />
        <Outlet />
        <TanStackRouterDevtools position='bottom-right' />
      </div>
    )
  )
}

export const Route = createRootRoute({ component: RootLayout })