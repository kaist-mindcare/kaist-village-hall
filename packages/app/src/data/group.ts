import type { GroupListItem } from '@/type/gorup'

export const participatingGroups: GroupListItem[] = [...Array(3)].map(
  (_, id) => ({
    id,
    title: 'Lorem ipsum dolar sit amet, consectetur adipiscing elit',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non viverra dolor.',
    avatar: '',
    participants: Math.floor(Math.random() * 100) + 1,
  }),
)

export const hotGroups: GroupListItem[] = [...Array(10)].map((_, id) => ({
  id,
  title: 'Lorem ipsum dolar',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non viverra dolor.',
  avatar: '',
  participants: Math.floor(Math.random() * 100) + 1,
}))
