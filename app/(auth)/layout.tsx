import {ReactNode} from 'react'

const AuthLayout = ({ children }: { children: ReactNode}) => {
  return (
    <div>{children}</div> // render the children components here
    // this is the auth layout for the app
    // this layout will be used for the sign in and sign up pages
    // 
  )
}

export default AuthLayout