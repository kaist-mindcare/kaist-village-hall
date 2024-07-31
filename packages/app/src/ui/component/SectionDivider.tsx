import { StyleSheet, View } from 'react-native'

export const SectionDivider: React.FC = () => <View style={styles.divider} />

const styles = StyleSheet.create({
  divider: {
    width: '100%',
    height: 16,
    backgroundColor: '#f3f4f6',
  },
})
