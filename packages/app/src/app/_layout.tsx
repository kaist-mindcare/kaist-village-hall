import { Slot } from 'expo-router'

import { SessionProvider } from '@/context/session'

const RootLayout: React.FC = () => (
  <SessionProvider>
    <Slot />
  </SessionProvider>
)

export default RootLayout
