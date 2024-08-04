import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { OverlayProvider } from '@toss/use-overlay'
import { Slot } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import { SessionProvider } from '@/context/session'

const RootLayout: React.FC = () => (
  <GestureHandlerRootView>
    <BottomSheetModalProvider>
      <OverlayProvider>
        <SessionProvider>
          <Slot />
        </SessionProvider>
      </OverlayProvider>
    </BottomSheetModalProvider>
  </GestureHandlerRootView>
)

export default RootLayout
