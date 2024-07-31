import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { ThemedText } from '@/ui/component/ThemedText'

const GroupDetailedPage: React.FC = () => {
  return (
    <SafeAreaView style={styles.body}>
      <ThemedText typography="h1">Submit</ThemedText>
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
