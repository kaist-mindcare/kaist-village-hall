import type { PostListItem } from '@/type/post'

export const posts: PostListItem[] = [...Array(22)].map((_, id) => ({
  id,
  title: 'Lorem ipsum dolor sit amet',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur non viverra dolor. Sed ultrices commodo lobortis.',
  comments: Math.floor(Math.random() * 10),
  likes: Math.floor(Math.random() * 10),
  createdAt: new Date(new Date().getTime() - 86400000 * id),
}))
