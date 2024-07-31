import type { TextStyle } from 'react-native'

export const textStyles = {
  h1: {
    fontSize: 22,
    lineHeight: 28,
    fontFamily: 'Pretendard-SemiBold',
  },
  body: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Pretendard-Regular',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Pretendard-Regular',
  },
  postRowTitle: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Pretendard-SemiBold',
  },
  postRowContent: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Pretendard-Regular',
  },
  groupRowTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Pretendard-SemiBold',
  },
  bottomTabLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontFamily: 'Pretendard-Medium',
  },
  input: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'Pretendard-Regular',
  },
  bottomButton: {
    fontSize: 18,
    lineHeight: 18,
    fontFamily: 'Pretendard-Medium',
  },
} as const satisfies Record<string, TextStyle>
