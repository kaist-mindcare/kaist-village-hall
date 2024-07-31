import { useFonts } from 'expo-font'
import { Redirect, Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import { useSession } from '@/context/session'

SplashScreen.preventAutoHideAsync()

const AppLayout = () => {
  const { session } = useSession()

  const [fontLoaded] = useFonts({
    'Pretendard-Regular': require('@/assets/font/Pretendard-1.3.9/Pretendard-Regular.otf'),
    'Pretendard-Medium': require('@/assets/font/Pretendard-1.3.9/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('@/assets/font/Pretendard-1.3.9/Pretendard-SemiBold.otf'),
  })

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontLoaded])

  if (!fontLoaded) return null
  if (!session) return <Redirect href="/signin" />

  return (
    <Stack screenOptions={{ navigationBarColor: '#fff' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="group/submit"
        options={{ headerBackTitleVisible: false, title: '' }}
      />
      <Stack.Screen
        name="group/[id]"
        options={{ headerBackTitleVisible: false, title: '' }}
      />
    </Stack>
  )
}

export default AppLayout
