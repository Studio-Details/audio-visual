import AudioMaster from "@/function/AudioMaster"

export default class Oscillator {
  audioMaster: AudioMaster
  ctx: AudioContext
  self: Oscillator
  osc?: OscillatorNode
  gainNode?: GainNode

  constructor(audioMaster: AudioMaster) {
    this.audioMaster = audioMaster
    this.ctx = this.audioMaster.ctx
    this.self = this
  }

  play({freq = 261, type = "sine", gain = 1.0}: {freq?: number, type?: OscillatorType, gain?: number}): void {
    // setup
    this.osc = this.ctx.createOscillator()
    this.gainNode = this.ctx.createGain()
    this.osc.type = type
    this.osc.frequency.value = freq
    this.gainNode.gain.value = gain

    // connnect
    this.osc.connect(this.gainNode)
    this.gainNode.connect(this.ctx.destination)

    // play
    this.osc.start(0)
  }

  stop(): void {
    this.osc?.stop(0)
    if(this.gainNode) {
      this.osc?.disconnect(this.gainNode)
      this.gainNode?.disconnect(this.ctx.destination)
    }
    this.osc = undefined
    this.gainNode = undefined

  }
}