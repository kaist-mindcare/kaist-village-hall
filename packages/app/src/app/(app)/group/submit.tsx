import { useAssets } from 'expo-asset'
import { Image } from 'expo-image'
import { useEffect, useState } from 'react'
import {
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useBottomSheet } from '@/hook/useBottomSheet'
import { uploadImage } from '@/lib/api'
import type { Avatar } from '@/type/avatar'
import { BottomButton } from '@/ui/component/BottomButton'
import { TextInput } from '@/ui/component/TextInput'
import { ThemedText } from '@/ui/component/ThemedText'
import { GroupAvatarSelectionSheet } from '@/ui/component/group/group-avatar-selection-sheet'
import { PicFill } from '@/ui/icon/PicFill'

const GroupSubmitPage: React.FC = () => {
  const insets = useSafeAreaInsets()
  const [avatar, setAvatar] = useState<Avatar>()
  const [assets] = useAssets(require('@/assets/image/group-avatar/sun.png'))
  const openImageSelect = useBottomSheet<Avatar>(
    (resolve) => (
      <GroupAvatarSelectionSheet initialAvatar={avatar} resolve={resolve} />
    ),
    { backdrop: true, showHandle: false },
  )

  useEffect(() => {
    if (assets) {
      setAvatar({ uri: assets[0].uri, isLocal: true })
    }
  }, [assets])

  if (!assets) return null

  const onSubmit = async () => {
    if (!avatar) return

    if (avatar.isLocal) {
      console.log('Avatar is local:', avatar.uri)
      return
    }

    const res = await uploadImage(avatar.uri, { prefix: 'group/avatar' })
    if (res.ok) {
      console.log('Avatar saved successfully:', res.url)
    } else {
      console.log('Failed to save avatar:', res.code)
    }
  }

  return (
    <View style={styles.background}>
      <KeyboardAvoidingView
        behavior="height"
        keyboardVerticalOffset={44 + insets.top} // TODO: Change 44 to header height
        style={styles.body}
      >
        <ScrollView>
          <View style={{ marginBottom: 20 }}>
            {/* Image Selection */}
            <Pressable
              style={styles.imageSelectButton}
              onPress={() => openImageSelect().then(setAvatar)}
            >
              <Image source={avatar} style={styles.avatar} />
              <View style={styles.pictureIcon}>
                <PicFill color="#b0b9c2" width={16} height={16} />
              </View>
            </Pressable>

            {/* Inputs */}
            <ThemedText typography="inputLabel" style={styles.inputLabel}>
              모임 이름
            </ThemedText>
            <TextInput
              placeholder="모임 이름"
              style={[styles.input, { marginBottom: 24 }]}
            />
            <ThemedText typography="inputLabel" style={styles.inputLabel}>
              모임 소개
            </ThemedText>
            <TextInput
              placeholder="어떤 활동을 하는 모임인가요?"
              multiline
              style={styles.input}
            />
          </View>
        </ScrollView>
        <BottomButton
          text="모임 만들기"
          backgroundColor="#004191"
          textColor="#fff"
          bottom
          stickToKeyboard
          onPress={onSubmit}
        />
      </KeyboardAvoidingView>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
  },
  body: {
    height: '100%',
  },
  imageSelectButton: {
    marginTop: 16,
    marginHorizontal: 'auto',
    marginBottom: 40,
  },
  avatar: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  pictureIcon: {
    position: 'absolute',
    bottom: -5,
    right: -5,
    borderWidth: 1,
    borderColor: '#d0d5d9',
    borderRadius: 17,
    padding: 8,
    backgroundColor: '#fff',
  },
  inputLabel: {
    marginLeft: 22,
    marginBottom: 6,
    color: '#4d5967',
  },
  input: {
    marginHorizontal: 16,
  },
})

export default GroupSubmitPage
