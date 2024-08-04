import { useAssets } from 'expo-asset'
import { Image } from 'expo-image'
import { useState } from 'react'
import { FlatList, Pressable, StyleSheet, View } from 'react-native'
import { SvgProps } from 'react-native-svg'
import { match } from 'ts-pattern'

import { BottomButton } from '@/ui/component/BottomButton'
import { ThemedText } from '@/ui/component/ThemedText'
import { Camera2Fill } from '@/ui/icon/Camera2Fill'
import { PicFill } from '@/ui/icon/PicFill'

type GroupAvatarSelectionSheetProps = {
  initialAvatar: string | undefined
  resolve: (imageSrc: string) => void
}

export const GroupAvatarSelectionSheet: React.FC<
  GroupAvatarSelectionSheetProps
> = ({ initialAvatar, resolve }) => {
  const [avatar, setAvatar] = useState<string | undefined>(initialAvatar)
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

  const images: (
    | { type: 'button'; icon: React.FC<SvgProps> }
    | { type: 'image'; src: string }
  )[] = [
    { type: 'button', icon: Camera2Fill },
    { type: 'image', src: assets[0].uri },
    { type: 'image', src: assets[1].uri },
    { type: 'image', src: assets[2].uri },
    { type: 'image', src: assets[3].uri },
    { type: 'button', icon: PicFill },
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
            .with({ type: 'button' }, ({ icon: Icon }) => (
              <Pressable
                onPress={() => {
                  // TODO: Implement image selection
                }}
                style={[styles.listItem, styles.button]}
              >
                <Icon color="#6a7684" width={24} height={24} />
              </Pressable>
            ))
            .with({ type: 'image' }, ({ src }) => (
              <Pressable onPress={() => setAvatar(src)}>
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
