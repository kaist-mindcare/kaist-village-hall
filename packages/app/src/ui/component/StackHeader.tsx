import { router } from 'expo-router'
import type { ReactNode } from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ArrowLeftFill } from '../icon/ArrowLeftFill'

type StackHeaderProps = {
  left?: ReactNode[]
  right?: ReactNode[]
  hideBackButton?: boolean
}

export const StackHeader: React.FC<StackHeaderProps> = ({
  left,
  right,
  hideBackButton,
}) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }} edges={['top']}>
      <View style={[styles.header, !hideBackButton && { paddingLeft: 8 }]}>
        <View style={styles.items}>
          {!hideBackButton && (
            <Pressable onPress={router.back} style={{ padding: 8 }}>
              <ArrowLeftFill color="#c9c9c9" width={24} height={24} />
            </Pressable>
          )}
          {left}
        </View>
        <View style={styles.items}>{right}</View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    paddingHorizontal: 16,
  },
  items: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
})
