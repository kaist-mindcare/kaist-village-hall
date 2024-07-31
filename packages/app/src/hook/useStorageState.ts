import * as SecureStore from 'expo-secure-store'
import { useCallback, useEffect, useState } from 'react'

type Item = string | null
type UseStorageState = [Item, (value: Item) => void]

export const useStorageState = (key: string): UseStorageState => {
  const [item, setItem] = useState<Item>(null)

  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setItem(value)
    })
  }, [key])

  const setValue = useCallback(
    (value: Item) => {
      setItem(value)
      if (value === null) SecureStore.deleteItemAsync(key)
      else SecureStore.setItemAsync(key, value)
    },
    [key],
  )

  return [item, setValue]
}
