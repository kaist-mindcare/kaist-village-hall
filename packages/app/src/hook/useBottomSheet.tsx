import { useOverlay } from '@toss/use-overlay'
import { type ReactNode, useCallback } from 'react'

import { BottomSheet, type BottomSheetProps } from '@/ui/component/BottomSheet'

type Resolver<T> = (value: T) => void
type UseBottomSheetOptions = Omit<
  BottomSheetProps,
  'open' | 'onClose' | 'children'
>

export const useBottomSheet = <T,>(
  content: (resolve: Resolver<T>) => ReactNode,
  options?: UseBottomSheetOptions,
) => {
  const overlay = useOverlay()

  return useCallback(
    () =>
      new Promise<T>((resolve) =>
        overlay.open(({ isOpen, close }) => {
          const resolveAndClose = (value: T) => {
            resolve(value)
            close()
          }

          return (
            <BottomSheet open={isOpen} onClose={close} {...options}>
              {content(resolveAndClose)}
            </BottomSheet>
          )
        }),
      ),
    [content, overlay],
  )
}
