import { useEffect, useRef } from 'react'
import { useKeyPress } from 'react-use'

const useSetKey = ({key, onKeyPress, onKeyUp, options = {}}: {key: string, onKeyPress: () => void, onKeyUp: () => void, options?: Record<string, any>}) => {
  const isPressed = useKeyPress(key);
  const isFlag = useRef(false)
  useEffect(() => {
    // console.log({isPressed: isPressed[0]})
    if(isPressed[0]) {
      if(!isFlag.current) {
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