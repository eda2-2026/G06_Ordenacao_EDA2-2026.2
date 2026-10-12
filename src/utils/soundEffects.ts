// Sintetizador Web Audio API para sonoplastia de ordenacao e scanner postal
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export const soundEffects = {
  // Bipe curto de scanner optico
  playScannerBeep(enabled: boolean = true) {
    if (!enabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(1400, ctx.currentTime)

      gain.gain.setValueAtTime(0.04, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.05)
    } catch {
      // Ignora erros de audio em navegadores sem permissao inicial
    }
  },

  // Nota proporcional ao balde (0 a 9) - estilo visualizador classico de ordenacao!
  playBucketDrop(bucketIndex: number, enabled: boolean = true) {
    if (!enabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    try {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()

      // Frequencia proporcional de 261.63Hz (C4) ate 587.33Hz (D5)
      const baseFreq = 260
      const freq = baseFreq + bucketIndex * 35

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      gain.gain.setValueAtTime(0.05, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)

      osc.connect(gain)
      gain.connect(ctx.destination)

      osc.start()
      osc.stop(ctx.currentTime + 0.08)
    } catch {
      // Ignora falhas de audio
    }
  },

  // Acorde de conclusao harmonico
  playSuccessChord(enabled: boolean = true) {
    if (!enabled) return
    const ctx = getAudioContext()
    if (!ctx) return

    const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      try {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()

        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06)

        gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.06)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.4)

        osc.connect(gain)
        gain.connect(ctx.destination)

        osc.start(ctx.currentTime + idx * 0.06)
        osc.stop(ctx.currentTime + idx * 0.06 + 0.45)
      } catch {
        // Ignora
      }
    })
  },
}