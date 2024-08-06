import { useAssets } from 'expo-asset'
import { Image } from 'expo-image'
import { SaveFormat, manipulateAsync } from 'expo-image-manipulator'
import {
  MediaTypeOptions,
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
  useMediaLibraryPermissions,
} from 'expo-image-picker'
import * as Linking from 'expo-linking'
import { useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { match } from 'ts-pattern'

import type { Avatar } from '@/type/avatar'
import { BottomButton } from '@/ui/component/BottomButton'
import { ThemedText } from '@/ui/component/ThemedText'
import { Camera2Fill } from '@/ui/icon/Camera2Fill'
import { PicFill } from '@/ui/icon/PicFill'

type GroupAvatarSelectionSheetProps = {
  initialAvatar: Avatar | undefined
  resolve: (avatar: Avatar) => void
}

export const GroupAvatarSelectionSheet: React.FC<
  GroupAvatarSelectionSheetProps
> = ({ initialAvatar, resolve }) => {
  const [avatar, setAvatar] = useState<Avatar | undefined>(initialAvatar)
  const [cameraPermission, requestCameraPermission] = useCameraPermissions()
  const [mediaPermission, requestMediaPermission] = useMediaLibraryPermissions()
  const [assets] = useAssets([
    require('@/assets/image/group-avatar/sun.png'),
    require('@/assets/image/group-avatar/game.png'),
    require('@/assets/image/group-avatar/soccer.png'),
    require('@/assets/image/group-avatar/apple.png'),
    require('@/assets/image/group-avatar/fire.png'),
    require('@/assets/image/group-avatar/exercise.png'),
    require('@/assets/image/group-avatar/pencil.png'),
    require('@/assets/image/group-avatar/violin.png'),
  ])

  if (!assets || !avatar) return null

  const takePhoto = async () => {
    if (!cameraPermission?.granted) {
      if (!cameraPermission?.canAskAgain) Linking.openSettings()
      const requestRes = await requestCameraPermission()
      if (!requestRes.granted) return
    }
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (result.canceled) return

    const manipulated = await manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 200, height: 200 } }],
      { compress: 1, format: SaveFormat.PNG },
    )

    setAvatar({ uri: manipulated.uri, isLocal: false })
  }

  const pickImage = async () => {
    if (!mediaPermission?.granted) {
      if (!mediaPermission?.canAskAgain) Linking.openSettings()
      const requestRes = await requestMediaPermission()
      if (!requestRes.granted) return
    }
    const result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    })

    if (result.canceled) return

    const manipulated = await manipulateAsync(
      result.assets[0].uri,
      [{ resize: { width: 200, height: 200 } }],
      { compress: 1, format: SaveFormat.PNG },
    )

    setAvatar({ uri: manipulated.uri, isLocal: false })
  }

  const images: (
    | { type: 'button'; icon: React.FC<SvgProps>; onPress: () => Promise<void> }
    | { type: 'image'; src: string }
  )[] = [
    { type: 'button', icon: Camera2Fill, onPress: takePhoto },
    { type: 'image', src: assets[0].uri },
    { type: 'image', src: assets[1].uri },
    { type: 'image', src: assets[2].uri },
    { type: 'image', src: assets[3].uri },
    { type: 'button', icon: PicFill, onPress: pickImage },
    { type: 'image', src: assets[4].uri },
    { type: 'image', src: assets[5].uri },
    { type: 'image', src: assets[6].uri },
    { type: 'image', src: assets[7].uri },
  ]

  return (
    <View style={styles.bottomSheet}>
      <ThemedText typography="h2" style={styles.title}>
        대표 이미지 선택
      </ThemedText>
      <Image source={avatar} style={styles.selectedAvatar} />
      <FlatList
        data={images}
        renderItem={({ item }) =>
          match(item)
            .with({ type: 'button' }, ({ icon: Icon, onPress }) => (
              <Pressable
                onPress={onPress}
                style={[styles.listItem, styles.button]}
              >
                <Icon color="#6a7684" width={24} height={24} />
              </Pressable>
            ))
            .with({ type: 'image' }, ({ src }) => (
              <Pressable onPress={() => setAvatar({ uri: src, isLocal: true })}>
                <Image source={src} style={styles.listItem} />
              </Pressable>
            ))
            .exhaustive()
        }
        horizontal={false}
        numColumns={5}
        contentContainerStyle={{ gap: 12 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        scrollEnabled={false}
        style={styles.imageList}
      />
      <BottomButton
        text="확인"
        backgroundColor="#004191"
        textColor="#fff"
        onPress={() => resolve(avatar)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  bottomSheet: {
    marginTop: 46,
    marginHorizontal: 16,
  },
  title: {
    marginBottom: 28,
  },
  selectedAvatar: {
    marginHorizontal: 'auto',
    marginBottom: 28,
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  imageList: {
    marginBottom: 60,
  },
  listItem: {
    borderRadius: 28,
    width: 56,
    height: 56,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f3f5',
  },
})
