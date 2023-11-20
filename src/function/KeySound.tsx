import useSetKey from '@/hook/useSetKey'
import { useCallback, useRef } from 'react'

interface Props {
  ctx: AudioContext
  analyser: AnalyserNode
  keyType: string
  freq?: number
  type?: OscillatorType
  gain?: number
  startTick: (keyType: string) => void
  stopTick: (keyType: string) => void
}
const KeySound = ({
  ctx,
  analyser,
  startTick,
  stopTick,
  keyType,
  freq = 261,
  type = 'sine',
  gain = 1.0,
}: Props) => {
  const osc = useRef<OscillatorNode | null>(null)
  const gainNode = useRef<GainNode | null>(null)

  const play = useCallback(() => {
    if (!ctx || !analyser) return
    osc.current = ctx.createOscillator()
    gainNode.current = ctx.createGain()

    // setup
    osc.current.type = type
    osc.current.frequency.value = freq
    gainNode.current.gain.value = gain

    // connect
    osc.current.connect(gainNode.current)
    gainNode.current.connect(analyser)
    analyser.connect(ctx.destination)
    osc.current.start(0)
    startTick(keyType)
  }, [ctx, analyser])

  const stop = useCallback(() => {
    if (!ctx || !analyser) return
    osc.current?.stop(0)
    if (gainNode.current) osc.current?.disconnect(gainNode.current)
    osc.current = null
    gainNode.current = null
    stopTick(keyType)
  }, [ctx, analyser])

  useSetKey({
    keyType,
    onKeyPress: () => {
      play()
    },
    onKeyUp: () => {
      stop()
    },
  })

  return <></>
}

export default KeySound
