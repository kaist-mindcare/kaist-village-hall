import { Motion, type MotionTransition } from '@legendapp/motion'
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native'

import { ThemedText } from '@/ui/component/ThemedText'

const transition = {
  type: 'timing',
  duration: 200,
  easing: 'easeOut',
} as const satisfies MotionTransition

type BottomButtonProps = {
  text: string
  backgroundColor: string
  textColor: string
  onPress?: () => void
  style?: StyleProp<ViewStyle>
}

export const BottomButton: React.FC<BottomButtonProps> = ({
  text,
  backgroundColor,
  textColor,
  onPress,
  style,
}) => (
  <Motion.Pressable onPress={onPress}>
    <Motion.View
      style={[styles.button, { backgroundColor }, style]}
      whileTap={{ scale: 0.96 }}
      transition={transition}
    >
      <ThemedText typography="bottomButton" style={{ color: textColor }}>
        {text}
      </ThemedText>
    </Motion.View>
  </Motion.Pressable>
)

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 56,
  },
})
