import { Motion, type MotionTransition } from '@legendapp/motion'
import { Image } from 'expo-image'
import { StyleSheet, View } from 'react-native'

import { ThemedText } from '@/ui/component/ThemedText'
import { User3Fill } from '@/ui/icon/User3Fill'

const transition = {
  type: 'timing',
  duration: 200,
  easing: 'easeOut',
} as const satisfies MotionTransition

type GroupItemProps = {
  title: string
  description?: string
  avatar?: string
  participants?: number
  onPress?: () => void
}

export const GroupItem: React.FC<GroupItemProps> = ({
  title,
  description,
  avatar,
  participants,
  onPress,
}) => (
  <Motion.Pressable onPress={onPress}>
    <Motion.View
      style={styles.item}
      whileTap={{ scale: 0.96 }}
      transition={transition}
    >
      <Motion.View
        style={styles.pressBackground}
        transition={transition}
        initial={{ opacity: 0 }}
        whileTap={{ opacity: 1 }}
      />
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.textContentsContainer}>
        <View style={styles.titleContainer}>
          <ThemedText
            typography="groupRowTitle"
            numberOfLines={1}
            style={styles.title}
          >
            {title}
          </ThemedText>

          {participants && (
            <>
              <User3Fill
                color="#d3d3d3"
                width={16}
                height={16}
                style={styles.participantsIcon}
              />
              <ThemedText typography="caption" style={styles.participants}>
                {participants}
              </ThemedText>
            </>
          )}
        </View>
        {description && (
          <ThemedText
            typography="caption"
            numberOfLines={1}
            style={styles.description}
          >
            {description}
          </ThemedText>
        )}
      </View>
    </Motion.View>
  </Motion.Pressable>
)

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 13,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  pressBackground: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#f2f3f5',
  },
  avatar: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContentsContainer: {
    justifyContent: 'center',
    flex: 1,
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexShrink: 1,
    color: '#343d4c',
  },
  participantsIcon: {
    marginLeft: 8,
    marginRight: 4,
  },
  participants: {
    color: '#afafaf',
  },
  description: {
    marginTop: 4,
    color: '#afafaf',
  },
})
