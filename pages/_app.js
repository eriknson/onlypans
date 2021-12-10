import React from 'react'
import { AuthProvider } from '../src/context/AuthContext'
import { GeistProvider, CssBaseline } from '@geist-ui/react'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <GeistProvider>
      <AuthProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </AuthProvider>
    </GeistProvider>
  )
}

export default MyApp
