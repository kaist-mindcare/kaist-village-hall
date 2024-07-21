import { Text, type TextProps } from 'react-native'

import { textStyles } from '@/ui/style/text'

type ThemedTextProps = TextProps & {
  typography?: keyof typeof textStyles
}

export const ThemedText: React.FC<ThemedTextProps> = ({
  typography = 'body',
  style,
  ...rest
}) => <Text style={[textStyles[typography], style]} {...rest} />
