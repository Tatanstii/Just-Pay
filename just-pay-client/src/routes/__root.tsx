import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import Toast from '../components/toast'

const RootLayout = () => {

  return (
    (
      <>
        <Toast />
        <Outlet />
        <TanStackRouterDevtools position='bottom-right' />
      </>
    )
  )
}

export const Route = createRootRoute({ component: RootLayout })