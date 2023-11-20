import { useEffect, useRef, useState } from 'react'

const FFT_SIZE: number = 256

const useAudioMaster = () => {
  const [ctx, setCtx] = useState<AudioContext | null>(null)
  const [analyser, setAnalyser] = useState<AnalyserNode | null>()
  const [FreqLength, setFreqLength] = useState<number>(0)
  const [FreqArray, setFreqArray] = useState<Float32Array>(new Float32Array(0))
  const [TDLength, setTDLength] = useState<number>(0)
  const [TDArray, setTDArray] = useState<Float32Array>(new Float32Array(TDLength))
  const isPlaying = useRef<boolean>(false)
  let NowKeyList: string[] = []
  let timer: NodeJS.Timeout | null = null

  useEffect(() => {
    const _ctx = new AudioContext()
    const _analyser = _ctx.createAnalyser()
    _analyser.fftSize = FFT_SIZE
    const _FreqLength = _analyser.frequencyBinCount
    const _FreqArray = new Float32Array(_FreqLength)
    const _TDLength = _analyser.fftSize
    const _TDArray = new Float32Array(_TDLength)

    setCtx(_ctx)
    setAnalyser(_analyser)
    setFreqLength(_FreqLength)
    setFreqArray(_FreqArray)
    setTDLength(_TDLength)
    setTDArray(_TDArray)
  }, [])

  const startTick = (keyType: string) => {
    if (!ctx || !analyser) return
    if (timer) clearTimeout(timer)
    NowKeyList.push(keyType)
    if (isPlaying.current) return
    isPlaying.current = true
    onTick()
  }

  const stopTick = (keyType: string) => {
    if (!ctx || !analyser) return
    if (!isPlaying.current) return
    NowKeyList = NowKeyList.filter((key) => key !== keyType)
    if (NowKeyList.length) return
    timer = setTimeout(() => {
      isPlaying.current = false
    }, 700)
  }

  const onTick = () => {
    if (!ctx || !analyser) return
    if (!isPlaying.current) return
    const _FreqArray = new Float32Array(FreqLength)
    const _TDArray = new Float32Array(TDLength)
    analyser.getFloatTimeDomainData(_FreqArray)
    analyser.getFloatTimeDomainData(_TDArray)
    setFreqArray(_FreqArray)
    setTDArray(_TDArray)
    requestAnimationFrame(onTick)
  }

  return {
    ctx,
    analyser,
    FreqLength,
    FreqArray,
    TDLength,
    TDArray,

    setCtx,
    setAnalyser,
    setFreqLength,
    setTDLength,
    setTDArray,

    startTick,
    stopTick,
  }
}

export default useAudioMaster
