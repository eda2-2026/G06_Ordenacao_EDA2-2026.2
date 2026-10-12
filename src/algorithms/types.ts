export type BrazilianRegion = 'Norte' | 'Nordeste' | 'Centro-Oeste' | 'Sudeste' | 'Sul'

export type PriorityLevel = 'Econômica' | 'Padrão' | 'Expressa (Sedex)' | 'Sedex 10'

export interface Package {
  id: string
  trackingCode: string
  cep: string // Ex: "70910900" (8 digitos numericos)
  recipient: string
  city: string
  state: string
  region: BrazilianRegion
  weightKg: number
  priority: PriorityLevel
  value: number // R$
}

export type RadixStepType =
  | 'START_PASS'
  | 'INSPECT_PACKAGE'
  | 'DISPATCH_TO_BUCKET'
  | 'COLLECT_FROM_BUCKETS'
  | 'FINISHED'

export interface RadixStep {
  type: RadixStepType
  passNumber: number // 1 a 8
  digitPosition: number // 0 (unidade, CEP[7]) ate 7 (dezena de milhao, CEP[0])
  charIndex: number // 7 a 0 (indice na string de 8 digitos)
  activePackageId?: string
  targetBucket?: number
  buckets: Package[][]
  conveyor: Package[]
  message: string
  comparisonCount: number
  dispatchCount: number
  collectionCount: number
}

export interface BenchmarkResult {
  totalPackages: number
  timeMs: number
  operations: number
  passes: number
  isSorted: boolean
}