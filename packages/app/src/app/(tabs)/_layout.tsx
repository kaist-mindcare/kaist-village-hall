import { Tabs } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { FireFill } from '@/ui/icon/FireFill'
import { HeartHandFill } from '@/ui/icon/HeartHandFill'
import { Home4Fill } from '@/ui/icon/Home4Fill'
import { MenuFill } from '@/ui/icon/MenuFill'
import { textStyles } from '@/ui/style/text'

const TabLayout = () => {
  const insets = useSafeAreaInsets()

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#bebebe',
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0.5,
          borderTopColor: '#f0f0f0',
          height: 56 + insets.bottom,
          paddingTop: 4,
          paddingHorizontal: 16,
          paddingBottom: 4 + insets.bottom,
          backgroundColor: '#fff',
        },
        tabBarItemStyle: {
          height: 48,
          paddingVertical: 4,
        },
        tabBarLabelStyle: [textStyles.bottomTabLabel, { paddingTop: 2 }],
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '홈',
          tabBarIcon: ({ color }) => <Home4Fill color={color} />,
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: '고민조각',
          tabBarIcon: ({ color }) => <HeartHandFill color={color} />,
        }}
      />
      <Tabs.Screen
        name="group"
        options={{
          title: '모임',
          tabBarIcon: ({ color }) => <FireFill color={color} />,
        }}
      />
      <Tabs.Screen
        name="all"
        options={{
          title: '전체',
          tabBarIcon: ({ color }) => <MenuFill color={color} />,
        }}
      />
    </Tabs>
  )
}

export default TabLayout
