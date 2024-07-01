import type { TextStyle } from 'react-native'

export const text = {
  h1: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Pretendard-SemiBold',
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Pretendard-Regular',
  },
  bottomTabLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: 'Pretendard-Medium',
  },
} as const satisfies Record<string, TextStyle>
