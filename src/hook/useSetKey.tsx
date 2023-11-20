import { useEffect, useRef } from 'react'
import { useKeyPress } from 'react-use'

const useSetKey = ({
  keyType,
  onKeyPress,
  onKeyUp,
  options = {},
}: {
  keyType: string
  onKeyPress: () => void
  onKeyUp: () => void
  options?: Record<string, any>
}) => {
  const isPressed = useKeyPress(keyType)
  const isFlag = useRef(false)
  useEffect(() => {
    // console.log({isPressed: isPressed[0]})
    if (isPressed[0]) {
      if (!isFlag.current) {
        isFlag.current = true
        onKeyPress()
      }
    } else {
      isFlag.current = false
      onKeyUp()
    }
  }, [isPressed])
}

export default useSetKey
