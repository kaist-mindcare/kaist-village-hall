import { StyleSheet, View } from 'react-native'

import { relativeDateString } from '@/lib/date'
import type { PostListItem } from '@/type/post'
import { ThemedText } from '@/ui/component/ThemedText'
import { HeartFill } from '@/ui/icon/HeartFill'
import { Message2Fill } from '@/ui/icon/Message2Fill'

export const PostItem: React.FC<PostListItem> = ({
  title,
  content,
  likes,
  comments,
  createdAt,
}) => (
  <View style={styles.item}>
    <ThemedText
      typography="postRowTitle"
      numberOfLines={1}
      style={styles.title}
    >
      {title}
    </ThemedText>
    <ThemedText
      typography="postRowContent"
      numberOfLines={2}
      style={styles.contentPreview}
    >
      {content}
    </ThemedText>
    <View style={styles.subInfo}>
      <ThemedText typography="caption" style={styles.subInfoText}>
        {relativeDateString(createdAt)}
      </ThemedText>
      {likes || comments ? (
        <View style={styles.iconContainer}>
          {likes ? (
            <View style={styles.iconWrapper}>
              <HeartFill color="#d3d3d3" width={16} height={16} />
              <ThemedText typography="caption" style={styles.subInfoText}>
                {likes}
              </ThemedText>
            </View>
          ) : null}
          {comments ? (
            <View style={styles.iconWrapper}>
              <Message2Fill color="#d3d3d3" width={16} height={16} />
              <ThemedText typography="caption" style={styles.subInfoText}>
                {comments}
              </ThemedText>
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  </View>
)

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0 0 0 / 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  title: {
    marginBottom: 6,
  },
  contentPreview: {
    marginBottom: 6,
    color: '#767676',
  },
  subInfo: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
  },
  subInfoText: {
    color: '#afafaf',
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 6,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
})
