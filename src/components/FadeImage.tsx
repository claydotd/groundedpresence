import {
  useEffect,
  useRef,
  useState,
  type ImgHTMLAttributes,
  type CSSProperties,
} from 'react'

type FadeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  aspectRatio?: CSSProperties['aspectRatio']
}

export default function FadeImage({
  className = '',
  aspectRatio,
  style,
  onLoad,
  src,
  ...props
}: FadeImageProps) {
  const ref = useRef<HTMLImageElement>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    setLoaded(false)
    const img = ref.current
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true)
    }
  }, [src])

  return (
    <img
      {...props}
      ref={ref}
      src={src}
      className={['fade-image', loaded ? 'is-loaded' : '', className]
        .filter(Boolean)
        .join(' ')}
      style={{
        ...(aspectRatio != null ? { aspectRatio } : null),
        ...style,
      }}
      onLoad={(event) => {
        setLoaded(true)
        onLoad?.(event)
      }}
    />
  )
}
