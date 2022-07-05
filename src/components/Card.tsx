import { ReactNode } from 'react'

const Card = ({ children, className }: { children: ReactNode, className?: string }) => {
  return (
    <div className={`shadow overflow-hidden border-b border-gray-200 sm:rounded-lg my-6 mx-4 bg-white ${className}`}>
      {children}
    </div>
  )
}

export default Card
