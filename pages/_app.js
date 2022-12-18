import { useEffect, useState } from 'react'
import {TotalContextProvider} from '../context'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [showChild, setShowChild] = useState(false)

  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    return null
  }

  return (
    <TotalContextProvider>
      <Component {...pageProps} />
    </TotalContextProvider>
  )
}

export default MyApp