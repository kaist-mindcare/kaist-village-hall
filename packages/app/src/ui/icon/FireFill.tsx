import Svg, { G, Path, type SvgProps } from 'react-native-svg'

export const FireFill: React.FC<SvgProps> = (props) => (
  <Svg width={24} height={24} {...props}>
    <G fill="none">
      <Path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002-.071.035-.02.004-.014-.004-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01-.017.428.005.02.01.013.104.074.015.004.012-.004.104-.074.012-.016.004-.017-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113-.013.002-.185.093-.01.01-.003.011.018.43.005.012.008.007.201.093c.012.004.023 0 .029-.008l.004-.014-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014-.034.614c0 .012.007.02.017.024l.015-.002.201-.093.01-.008.004-.011.017-.43-.003-.012-.01-.01-.184-.092Z" />
      <Path
        fill="currentColor"
        d="m11.514 2.142-1.26-.755-.24 1.449C9.632 5.124 8.069 7.25 6.345 8.744 2.97 11.67 2.231 14.85 3.276 17.475c1 2.512 3.538 4.232 6.114 4.519l.596.066c-1.474-.901-2.42-3.006-2.09-4.579.326-1.546 1.438-2.994 3.574-4.33l1.077-.672.402 1.205c.237.712.647 1.284 1.064 1.865.2.28.403.563.589.864.643 1.045.813 2.207.398 3.36-.378 1.048-1.001 1.872-1.86 2.329l.97-.108c2.418-.269 4.193-1.096 5.346-2.479C20.599 18.144 21 16.379 21 14.5c0-1.75-.719-3.554-1.567-5.055-.994-1.758-2.291-3.218-3.707-4.633-.245.49-.226.688-.73 1.475a8.146 8.146 0 0 0-3.482-4.145Z"
      />
    </G>
  </Svg>
)
