import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet'
import { type ReactNode, useEffect, useRef } from 'react'
import { type StyleProp, StyleSheet, type ViewStyle } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export type BottomSheetProps = {
  open: boolean
  onClose?: () => void
  delayClose?: boolean
  backdrop?: boolean
  showHandle?: boolean
  viewStyle?: StyleProp<ViewStyle>
  children?: ReactNode
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  open,
  onClose,
  delayClose,
  backdrop,
  showHandle,
  viewStyle,
  children,
}) => {
  const ref = useRef<BottomSheetModal>(null)

  useEffect(() => {
    if (!ref.current) return
    if (open) return ref.current.present()
    delayClose ? setTimeout(ref.current?.close, 180) : ref.current.close()
  }, [open])

  return (
    <BottomSheetModal
      ref={ref}
      enableDynamicSizing
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.handle}
      handleComponent={showHandle === false ? null : undefined}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={backdrop ? 0.3 : 0}
          enableTouchThrough={false}
          pressBehavior="close"
          {...props}
        />
      )}
      onDismiss={onClose}
    >
      <BottomSheetView>
        <SafeAreaView edges={['bottom']} style={viewStyle}>
          {children}
        </SafeAreaView>
      </BottomSheetView>
    </BottomSheetModal>
  )
}

const styles = StyleSheet.create({
  background: {
    elevation: 50,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: '#000',
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    backgroundColor: '#fff',
  },
  handle: {
    width: 80,
    height: 6,
    backgroundColor: '#f3f4f6',
  },
})
