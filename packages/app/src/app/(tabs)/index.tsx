import { StyleSheet, View } from 'react-native'

import { ThemedText } from '@/ui/component/ThemedText'

const HomeTab: React.FC = () => {
  return (
    <View style={styles.body}>
      <ThemedText typography="h1">Home</ThemedText>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
})

export default HomeTab
