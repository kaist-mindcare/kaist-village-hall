import { useAssets } from 'expo-asset'
import { useRouter } from 'expo-router'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { hotGroups, participatingGroups } from '@/data/group'
import { GroupItem } from '@/ui/component/GroupItem'
import { SectionDivider } from '@/ui/component/SectionDivider'
import { ThemedText } from '@/ui/component/ThemedText'

const GroupTab: React.FC = () => {
  const router = useRouter()
  const [assets] = useAssets([
    require('@/assets/image/group-avatar/plus.png'),
    require('@/assets/image/group-avatar/sun.png'),
    require('@/assets/image/group-avatar/game.png'),
    require('@/assets/image/group-avatar/soccer.png'),
    require('@/assets/image/group-avatar/apple.png'),
    require('@/assets/image/group-avatar/fire.png'),
    require('@/assets/image/group-avatar/exercise.png'),
    require('@/assets/image/group-avatar/pencil.png'),
    require('@/assets/image/group-avatar/violin.png'),
  ])

  const randomAvatar = () =>
    assets?.[Math.floor(Math.random() * (assets.length - 1) + 1)].uri

  return (
    <SafeAreaView style={styles.body} edges={['top']}>
      <ScrollView>
        <ThemedText typography="h1" style={styles.title}>
          참여 중인 모임
        </ThemedText>
        <GroupItem
          title="모임 만들기"
          avatar={assets?.[0].uri}
          onPress={() => router.navigate('/group/submit')}
        />
        <FlatList
          data={participatingGroups}
          style={styles.list}
          renderItem={({ item: { id, ...rest } }) => (
            <GroupItem
              {...rest}
              avatar={randomAvatar()}
              onPress={() =>
                router.navigate({
                  pathname: '/group/[id]',
                  params: { id },
                })
              }
            />
          )}
          keyExtractor={(item) => item.id.toFixed()}
          scrollEnabled={false}
        />
        <SectionDivider />
        <ThemedText typography="h1" style={styles.title}>
          인기 있는 모임
        </ThemedText>
        <FlatList
          data={hotGroups}
          style={styles.list}
          renderItem={({ item: { id, ...rest } }) => (
            <GroupItem
              {...rest}
              avatar={randomAvatar()}
              onPress={() =>
                router.navigate({
                  pathname: '/group/[id]',
                  params: { id },
                })
              }
            />
          )}
          keyExtractor={(item) => item.id.toFixed()}
          scrollEnabled={false}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 24,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    paddingBottom: 12,
  },
})

export default GroupTab
