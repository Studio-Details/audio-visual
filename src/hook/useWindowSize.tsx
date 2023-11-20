import { useEffect, useState } from 'react'

const useWindowSize = () => {
  const [size, setSize] = useState<Record<string, any>>({})

  useEffect(() => {
    const eResize = () => {
      const _size = {
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
      }
      setSize(_size)
    }
    eResize()
    window.addEventListener('resize', eResize)

    return () => {
      window.removeEventListener('resize', eResize)
    }
  }, [])

  return size
}

export default useWindowSize
