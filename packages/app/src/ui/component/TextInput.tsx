import { useState } from 'react'
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
} from 'react-native'

import { textStyles } from '@/ui/style/text'

type TextInputProps = Omit<RNTextInputProps, 'placeholderTextColor'>

export const TextInput: React.FC<TextInputProps> = ({
  onFocus,
  onBlur,
  style,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(rest.autoFocus ?? false)

  return (
    <RNTextInput
      {...rest}
      onFocus={(e) => {
        setIsFocused(true)
        onFocus?.(e)
      }}
      onBlur={(e) => {
        setIsFocused(false)
        onBlur?.(e)
      }}
      placeholderTextColor="#8b95a1"
      style={[
        styles.input,
        isFocused && { borderColor: '#e9ecf1', backgroundColor: '#eef1f6' },
        style,
      ]}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#f5f5f7',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: '#fafafc',
    color: '#343d4c',
    ...textStyles.input,
  },
})
