import { Motion } from '@legendapp/motion'
import { type ComponentProps, useEffect, useState } from 'react'
import {
  Keyboard,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { match } from 'ts-pattern'

import { ThemedText } from '@/ui/component/ThemedText'

type InternalButtonProps = {
  text: string
  backgroundColor: string
  textColor: string
  bottom?: boolean
  stickToKeyboard?: boolean
  style?: StyleProp<ViewStyle>
  outerStyle?: StyleProp<ViewStyle>
}

type BottomButtonProps = Omit<
  ComponentProps<typeof Motion.Pressable>,
  keyof InternalButtonProps | 'children'
> &
  InternalButtonProps

export const BottomButton: React.FC<BottomButtonProps> = ({
  text,
  backgroundColor,
  textColor,
  bottom,
  stickToKeyboard,
  style,
  outerStyle,
  ...props
}) => {
  const [stick, setStick] = useState<'bottom' | 'keyboard' | undefined>(
    bottom ? 'bottom' : undefined,
  )
  const insets = useSafeAreaInsets()

  useEffect(() => {
    const willShowListener = Keyboard.addListener('keyboardWillShow', () => {
      if (stickToKeyboard) setStick('keyboard')
    })
    const willHideListener = Keyboard.addListener('keyboardWillHide', () => {
      if (stickToKeyboard) setStick(bottom ? 'bottom' : undefined)
    })
    // FIXME: Remove didShowListener and didHideListener after the issue is fixed
    // https://github.com/facebook/react-native/issues/3468
    const didShowListener = Keyboard.addListener('keyboardDidShow', () => {
      if (stickToKeyboard) setStick('keyboard')
    })
    const didHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (stickToKeyboard) setStick(bottom ? 'bottom' : undefined)
    })

    return () => {
      willShowListener.remove()
      willHideListener.remove()
      didShowListener.remove()
      didHideListener.remove()
    }
  }, [])

  const stickStyle = match(stick)
    .returnType<ViewStyle | null>()
    .with('bottom', () => ({
      marginBottom: 12 + insets.bottom,
      marginHorizontal: 16,
    }))
    .with('keyboard', () => ({
      marginBottom: 0,
      marginHorizontal: 0,
    }))
    .with(undefined, () => null)
    .exhaustive()

  return (
    <Motion.Pressable style={[stickStyle, outerStyle]} {...props}>
      <Motion.View
        style={[styles.button, { backgroundColor }, style]}
        transition={{ type: 'timing', duration: 200, easing: 'easeOut' }}
        whileTap={{ scale: stick === 'keyboard' ? 1 : 0.96 }}
        animate={{ borderRadius: stick === 'keyboard' ? 0 : 15 }}
      >
        <ThemedText typography="bottomButton" style={{ color: textColor }}>
          {text}
        </ThemedText>
      </Motion.View>
    </Motion.Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
  },
})
