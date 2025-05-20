import {ReactNode} from 'react'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children, pathname }: { children: ReactNode, pathname?: string }) => {
  // Only check authentication for pages that aren't sign-in or sign-up
  const path = pathname || '';
  const isAuthPage = path.includes('sign-in') || path.includes('sign-up');
  
  if (!isAuthPage) {
    const isUserAuthenticated = await isAuthenticated();
    if (!isUserAuthenticated) redirect('/sign-in');
  }
  
  return (
    <div className='auth-layout'>{children}</div>
  )
}

export default AuthLayout