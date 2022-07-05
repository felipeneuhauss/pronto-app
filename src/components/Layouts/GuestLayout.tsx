import Head from 'next/head'
import { ReactNode } from 'react'

const GuestLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Head>
        <title>ProntoSaude</title>
      </Head>

      <div className="font-sans text-gray-900 antialiased">
        {children}
      </div>
    </div>
  )
}

export default GuestLayout
