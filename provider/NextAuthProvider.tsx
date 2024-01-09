'use client'

import { SessionProvider } from "next-auth/react"

export default function NextAuthProvider({
  children,
}: {
  children: React.ReactNode
}): React.ReactNode {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}