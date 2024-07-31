import { createContext, useContext } from 'react'

import { useStorageState } from '@/hook/useStorageState'

const AuthContext = createContext<{
  signIn: () => void
  signOut: () => void
  session?: string | null
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
})

export const useSession = () => {
  const value = useContext(AuthContext)

  if (process.env.NODE_ENV !== 'production' && !value)
    throw new Error('useSession must be wrapped in a <SessionProvider />')

  return value
}

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [session, setSession] = useStorageState('session')

  return (
    <AuthContext.Provider
      value={{
        signIn: () => setSession('xxx'),
        signOut: () => setSession(null),
        session,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
