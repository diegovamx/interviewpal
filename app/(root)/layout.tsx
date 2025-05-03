import React, { ReactNode } from 'react'

const RootLayout = ({children}: {children: ReactNode}) => {
  return (
    <div>{children}</div> //render the children components here
  // this is the root layout for the app
    // it will be used to wrap all the pages in the app
  )
}

export default RootLayout