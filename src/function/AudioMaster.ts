const FFT_SIZE: number = 256

export default class AudioMaster {
  ctx: AudioContext
  analyser: AnalyserNode
  FreqLength: number
  FreqArray: Uint8Array
  TDLength: number
  TDArray: Float32Array
  self: AudioMaster

  constructor() {
    this.ctx = new AudioContext()
    this.analyser = this.ctx.createAnalyser()
    this.analyser.fftSize = FFT_SIZE
    this.FreqLength = this.analyser.frequencyBinCount
    this.FreqArray = new Uint8Array(this.FreqLength)
    this.TDLength = this.analyser.fftSize
    this.TDArray = new Float32Array(this.TDLength)
    this.self = this
  }
}
