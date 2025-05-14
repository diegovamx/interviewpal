import {ReactNode} from 'react'
import { isAuthenticated } from '@/lib/actions/auth.action'
import { redirect } from 'next/navigation'

const AuthLayout = async ({ children }: { children: ReactNode}) => {
  const isUserAuthenticated = await isAuthenticated();
  
    if (!isUserAuthenticated) redirect('/sign-in');
  return (
    <div className='auth-layout'>{children}</div> // render the children components here
    // this is the auth layout for the app
    // this layout will be used for the sign in and sign up pages
    // 
  )
}

export default AuthLayout