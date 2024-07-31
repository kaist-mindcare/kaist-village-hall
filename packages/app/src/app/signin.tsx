import { router } from 'expo-router'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useSession } from '@/context/session'
import { BottomButton } from '@/ui/component/BottomButton'
import { TextInput } from '@/ui/component/TextInput'
import { ThemedText } from '@/ui/component/ThemedText'

const SignInPage: React.FC = () => {
  const { signIn } = useSession()

  return (
    <SafeAreaView edges={['top']}>
      <ThemedText typography="h1" style={styles.title}>
        KAIST 마을 회관 로그인
      </ThemedText>
      <TextInput
        autoComplete="username"
        textContentType="username"
        placeholder="아이디"
        selectTextOnFocus
        autoFocus
        style={styles.input}
      />
      <TextInput
        autoComplete="password"
        textContentType="password"
        placeholder="비밀번호"
        selectTextOnFocus
        secureTextEntry
        style={styles.input}
      />
      <BottomButton
        text="로그인"
        backgroundColor="#004191"
        textColor="#fff"
        style={styles.submitButton}
        onPress={() => {
          signIn()
          router.replace('/')
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 80,
    marginHorizontal: 'auto',
    marginBottom: 40,
    color: '#004191',
  },
  input: {
    marginHorizontal: 16,
    marginBottom: 26,
  },
  submitButton: {
    marginHorizontal: 16,
  },
})

export default SignInPage
