import { FlatList, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { posts } from '@/data/post'
import { PostItem } from '@/ui/component/PostItem'

const PostTab: React.FC = () => {
  return (
    <SafeAreaView style={styles.body} edges={['top']}>
      <FlatList
        data={posts}
        renderItem={({ item }) => <PostItem {...item} />}
        keyExtractor={(item) => item.id.toFixed()}
        style={styles.list}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  body: {
    height: '100%',
    backgroundColor: '#fff',
  },
  list: {
    width: '100%',
  },
})

export default PostTab
