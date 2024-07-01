import { StyleSheet, Text, View } from 'react-native'

import { text } from '@/ui/style/text'

const ChallengeTab: React.FC = () => {
  return (
    <View style={styles.body}>
      <Text style={text.h1}>Challenge</Text>
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

export default ChallengeTab
