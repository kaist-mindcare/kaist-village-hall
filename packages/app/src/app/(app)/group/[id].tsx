import { useLocalSearchParams } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemedText } from '@/ui/component/ThemedText'

const GroupDetailedPage: React.FC = () => {
  const { id } = useLocalSearchParams()

  return (
    <SafeAreaView style={styles.body} edges={['bottom']}>
      <ThemedText typography="h1">Group {id}</ThemedText>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
})

export default GroupDetailedPage
