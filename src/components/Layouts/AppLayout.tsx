import Navigation from 'components/Layouts/Navigation'
import { useAuth } from 'hooks/auth'

import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

const AppLayout = ({ header, children }: any) => {
  const { user } = useAuth({ middleware: 'auth' })

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation user={user} />

      {/* Page Heading */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          {header}
        </div>
      </header>

      {/* Page Content */}
      <main>{children}</main>
      <ToastContainer />
    </div>
  )
}

export default AppLayout
