import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useSession } from '@/context/session'
import { BottomButton } from '@/ui/component/BottomButton'

const AllTab: React.FC = () => {
  const { signOut } = useSession()

  return (
    <SafeAreaView style={styles.body} edges={['top']}>
      <BottomButton
        text="로그아웃"
        backgroundColor="#f2f3f5"
        textColor="#4d5967"
        style={{ marginHorizontal: 16 }}
        onPress={signOut}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#fff',
  },
})

export default AllTab
