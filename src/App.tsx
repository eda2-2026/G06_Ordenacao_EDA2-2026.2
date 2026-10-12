import { useState, useEffect, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { Header } from './components/Header'
import { Controls } from './components/Controls'
import { StatsPanel } from './components/StatsPanel'
import { ConveyorBelt } from './components/ConveyorBelt'
import { BucketDisplay } from './components/BucketDisplay'
import { TheoryModal } from './components/TheoryModal'
import { BenchmarkModal } from './components/BenchmarkModal'
import { Package, RadixStep } from './algorithms/types'
import { DEFAULT_PACKAGES, generateMockPackages } from './data/mockPackages'
import { generateRadixSortSteps } from './algorithms/radixSort'
import { soundEffects } from './utils/soundEffects'

export default function App() {
  // Estado dos Dados
  const [packages, setPackages] = useState<Package[]>(DEFAULT_PACKAGES)
  const [batchSize, setBatchSize] = useState<number>(12)
  const [distribution, setDistribution] = useState<'random' | 'almost-sorted' | 'reversed' | 'duplicates'>('random')

  // Estado da Execucao e Animacao
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [isFinished, setIsFinished] = useState<boolean>(false)
  const [speed, setSpeed] = useState<number>(250) // ms por passo
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)

  // Modais
  const [isTheoryOpen, setIsTheoryOpen] = useState<boolean>(false)
  const [isBenchmarkOpen, setIsBenchmarkOpen] = useState<boolean>(false)

  // Estado do Algoritmo
  const [currentStep, setCurrentStep] = useState<RadixStep | null>(null)
  const generatorRef = useRef<Generator<RadixStep, void, unknown> | null>(null)
  const timerRef = useRef<number | null>(null)

  // Inicializa ou reinicia o gerador do algoritmo
  const resetSimulation = useCallback((initialList?: Package[]) => {
    if (timerRef.current) {
      window.clearInterval(timerRef.current)
      timerRef.current = null
    }
    setIsRunning(false)
    setIsFinished(false)

    const baseList = initialList || packages
    generatorRef.current = generateRadixSortSteps(baseList)
    setCurrentStep(null)
  }, [packages])

  // Inicializacao no carregamento
  useEffect(() => {
    resetSimulation(DEFAULT_PACKAGES)
  }, [])

  // Avanca 1 passo no algoritmo
  const advanceStep = useCallback(() => {
    if (!generatorRef.current) {
      generatorRef.current = generateRadixSortSteps(packages)
    }

    const { value, done } = generatorRef.current.next()

    if (done || !value) {
      setIsRunning(false)
      setIsFinished(true)
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
      soundEffects.playSuccessChord(soundEnabled)
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      })
      return
    }

    setCurrentStep(value)

    // Efeitos Sonoros
    if (value.type === 'INSPECT_PACKAGE') {
      soundEffects.playScannerBeep(soundEnabled)
    } else if (value.type === 'DISPATCH_TO_BUCKET' && value.targetBucket !== undefined) {
      soundEffects.playBucketDrop(value.targetBucket, soundEnabled)
    } else if (value.type === 'FINISHED') {
      setIsRunning(false)
      setIsFinished(true)
      soundEffects.playSuccessChord(soundEnabled)
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
      })
    }
  }, [packages, soundEnabled])

  // Loop de execucao continua (Play/Pause)
  useEffect(() => {
    if (isRunning) {
      timerRef.current = window.setInterval(() => {
        advanceStep()
      }, speed)
    } else {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [isRunning, speed, advanceStep])

  // Gerar novo lote de encomendas
  const handleGenerateNewBatch = () => {
    const newBatch = generateMockPackages(batchSize, distribution)
    setPackages(newBatch)
    resetSimulation(newBatch)
  }

  // Alterar tamanho do lote
  const handleChangeBatchSize = (size: number) => {
    setBatchSize(size)
    const newBatch = generateMockPackages(size, distribution)
    setPackages(newBatch)
    resetSimulation(newBatch)
  }

  // Alterar distribuicao
  const handleChangeDistribution = (dist: 'random' | 'almost-sorted' | 'reversed' | 'duplicates') => {
    setDistribution(dist)
    const newBatch = generateMockPackages(batchSize, dist)
    setPackages(newBatch)
    resetSimulation(newBatch)
  }

  // Dados para exibicao nos componentes
  const conveyorList = currentStep ? currentStep.conveyor : packages
  const bucketsList = currentStep ? currentStep.buckets : Array.from({ length: 10 }, () => [])
  const targetBucket = currentStep?.targetBucket
  const activePackageId = currentStep?.activePackageId
  const highlightCharIndex = currentStep ? currentStep.charIndex : undefined
  const passNumber = currentStep ? currentStep.passNumber : 1
  const isCollecting = currentStep?.type === 'COLLECT_FROM_BUCKETS'

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-amber-400 selection:text-slate-950">
      {/* Header */}
      <Header
        onOpenTheory={() => setIsTheoryOpen(true)}
        onOpenBenchmark={() => setIsBenchmarkOpen(true)}
        onReset={() => resetSimulation()}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-5">
        {/* Painel de Controles */}
        <Controls
          isRunning={isRunning}
          isFinished={isFinished}
          speed={speed}
          soundEnabled={soundEnabled}
          batchSize={batchSize}
          distribution={distribution}
          onTogglePlay={() => setIsRunning(!isRunning)}
          onStepForward={advanceStep}
          onReset={() => resetSimulation()}
          onChangeSpeed={setSpeed}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          onChangeBatchSize={handleChangeBatchSize}
          onChangeDistribution={handleChangeDistribution}
          onGenerateNewBatch={handleGenerateNewBatch}
        />

        {/* Painel de Status & Metricas em Tempo Real */}
        <StatsPanel
          currentStep={currentStep}
          totalPackages={packages.length}
          isFinished={isFinished}
        />

        {/* Esteira Central e Sensor Ótico de Leitura */}
        <ConveyorBelt
          conveyor={conveyorList}
          activePackageId={activePackageId}
          highlightCharIndex={highlightCharIndex}
          targetBucket={targetBucket}
          passNumber={passNumber}
          isCollecting={isCollecting}
          isFinished={isFinished}
        />

        {/* Os 10 Baldes de Triagem (Base k = 10) */}
        <BucketDisplay
          buckets={bucketsList}
          targetBucket={targetBucket}
          highlightCharIndex={highlightCharIndex}
          passNumber={passNumber}
        />
      </main>

      {/* Rodapé Acadêmico */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>
            Estruturas de Dados 2 (EDA 2) - Universidade de Brasília (UnB - FGA)
          </span>
          <span className="font-mono text-slate-300">
            Grupo 06 • Ordenação Linear (Radix Sort LSD)
          </span>
        </div>
      </footer>

      {/* Modais */}
      <TheoryModal
        isOpen={isTheoryOpen}
        onClose={() => setIsTheoryOpen(false)}
      />

      <BenchmarkModal
        isOpen={isBenchmarkOpen}
        onClose={() => setIsBenchmarkOpen(false)}
      />
    </div>
  )
}