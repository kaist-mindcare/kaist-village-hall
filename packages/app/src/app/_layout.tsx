import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

SplashScreen.preventAutoHideAsync()

const RootLayout = () => {
  const [fontLoaded] = useFonts({
    'Pretendard-Regular': require('../assets/font/Pretendard-1.3.9/Pretendard-Regular.otf'),
    'Pretendard-Medium': require('../assets/font/Pretendard-1.3.9/Pretendard-Medium.otf'),
    'Pretendard-SemiBold': require('../assets/font/Pretendard-1.3.9/Pretendard-SemiBold.otf'),
  })

  useEffect(() => {
    if (fontLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontLoaded])

  if (!fontLoaded) {
    return null
  }

  return (
    <Stack screenOptions={{ navigationBarColor: '#fff' }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout
