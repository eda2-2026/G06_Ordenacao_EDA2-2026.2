import { Package, RadixStep, BenchmarkResult } from './types'

/**
 * Retorna o digito de uma posicao especifica do CEP (8 digitos).
 * @param cep CEP em formato "XXXXXXXX" (8 digitos numericos)
 * @param digitPosition 0 = menos significativo (unidade), 7 = mais significativo
 */
export function getDigitAtPosition(cep: string, digitPosition: number): number {
  const clean = cep.replace(/\D/g, '').padStart(8, '0')
  const charIndex = 7 - digitPosition
  if (charIndex < 0 || charIndex >= 8) return 0
  return parseInt(clean[charIndex], 10) || 0
}

/**
 * Retorna a descricao didatica da posicao do digito no CEP brasileiro.
 */
export function getDigitName(digitPosition: number): string {
  switch (digitPosition) {
    case 0:
      return 'Dígito Final / Sufixo Local (Unidade de Distribuição)'
    case 1:
      return 'Dezena do Sufixo de Distribuição'
    case 2:
      return 'Centena do Sufixo de Distribuição'
    case 3:
      return 'Dígito da Sub-região / Setor Postal'
    case 4:
      return 'Dígito do Subsetor'
    case 5:
      return 'Dígito do Setor Integrado'
    case 6:
      return 'Sub-região Geográfica Postal'
    case 7:
      return 'Região Postal Principal (0 a 9 - Brasil)'
    default:
      return `Posição ${digitPosition}`
  }
}

/**
 * Gerador do Radix Sort LSD passo-a-passo.
 * Produz eventos a cada inspecao, envio para balde e recolhimento.
 */
export function* generateRadixSortSteps(
  initialPackages: Package[]
): Generator<RadixStep, void, unknown> {
  let conveyor: Package[] = [...initialPackages]
  let dispatchCount = 0
  let collectionCount = 0
  let comparisonCount = 0

  // O CEP brasileiro tem exatamente 8 digitos numericos
  const TOTAL_PASSES = 8

  for (let digitPos = 0; digitPos < TOTAL_PASSES; digitPos++) {
    const charIndex = 7 - digitPos
    const passNumber = digitPos + 1
    const buckets: Package[][] = Array.from({ length: 10 }, () => [])

    // Evento de inicio da passada
    yield {
      type: 'START_PASS',
      passNumber,
      digitPosition: digitPos,
      charIndex,
      buckets: buckets.map((b) => [...b]),
      conveyor: [...conveyor],
      message: `Iniciando Passada ${passNumber}/${TOTAL_PASSES}: Triagem pelo ${getDigitName(digitPos)} (Índice [${charIndex}])`,
      comparisonCount,
      dispatchCount,
      collectionCount,
    }

    // Processamento da esteira para os baldes
    const currentBatch = [...conveyor]
    const remainingOnConveyor = [...conveyor]

    for (let i = 0; i < currentBatch.length; i++) {
      const pkg = currentBatch[i]
      const digit = getDigitAtPosition(pkg.cep, digitPos)
      comparisonCount++

      // Pacote sendo inspecionado no leitor optico
      yield {
        type: 'INSPECT_PACKAGE',
        passNumber,
        digitPosition: digitPos,
        charIndex,
        activePackageId: pkg.id,
        targetBucket: digit,
        buckets: buckets.map((b) => [...b]),
        conveyor: [...remainingOnConveyor],
        message: `Pacote ${pkg.trackingCode} inspecionado: CEP ${pkg.cep.slice(0, 5)}-${pkg.cep.slice(5)}. Dígito na posição atual é '${digit}'. Encaminhando para a esteira/balde ${digit}.`,
        comparisonCount,
        dispatchCount,
        collectionCount,
      }

      // Direcionamento para o balde
      remainingOnConveyor.shift()
      buckets[digit].push(pkg)
      dispatchCount++

      yield {
        type: 'DISPATCH_TO_BUCKET',
        passNumber,
        digitPosition: digitPos,
        charIndex,
        activePackageId: pkg.id,
        targetBucket: digit,
        buckets: buckets.map((b) => [...b]),
        conveyor: [...remainingOnConveyor],
        message: `Pacote ${pkg.id} despachado com sucesso para o Balde [${digit}].`,
        comparisonCount,
        dispatchCount,
        collectionCount,
      }
    }

    // Recolhimento estavel dos baldes 0 a 9 de volta para a esteira principal
    const nextConveyor: Package[] = []
    for (let b = 0; b < 10; b++) {
      for (const pkg of buckets[b]) {
        nextConveyor.push(pkg)
        collectionCount++
      }
      buckets[b] = []
    }

    conveyor = nextConveyor

    yield {
      type: 'COLLECT_FROM_BUCKETS',
      passNumber,
      digitPosition: digitPos,
      charIndex,
      buckets: buckets.map((b) => [...b]),
      conveyor: [...conveyor],
      message: `Passada ${passNumber} concluída! Baldes 0 a 9 recolhidos em ordem estável. Encomendas parcialmente ordenadas pelos últimos ${passNumber} dígitos.`,
      comparisonCount,
      dispatchCount,
      collectionCount,
    }
  }

  // Finalizado com sucesso
  yield {
    type: 'FINISHED',
    passNumber: TOTAL_PASSES,
    digitPosition: 7,
    charIndex: 0,
    buckets: Array.from({ length: 10 }, () => []),
    conveyor: [...conveyor],
    message: `🎉 Triagem concluída com sucesso! Todos os ${conveyor.length} pacotes estão 100% ordenados e roteados por CEP de destino.`,
    comparisonCount,
    dispatchCount,
    collectionCount,
  }
}

/**
 * Executa o Radix Sort diretamente (sem animacao) para testes de carga e benchmark.
 */
export function runRadixSortBenchmark(packages: Package[]): BenchmarkResult {
  const startTime = performance.now()
  let arr = [...packages]
  let operations = 0

  for (let digitPos = 0; digitPos < 8; digitPos++) {
    const buckets: Package[][] = Array.from({ length: 10 }, () => [])

    for (let i = 0; i < arr.length; i++) {
      const digit = getDigitAtPosition(arr[i].cep, digitPos)
      buckets[digit].push(arr[i])
      operations++
    }

    let idx = 0
    for (let b = 0; b < 10; b++) {
      for (let j = 0; j < buckets[b].length; j++) {
        arr[idx++] = buckets[b][j]
        operations++
      }
    }
  }

  const endTime = performance.now()

  // Validacao de corretude
  let isSorted = true
  for (let i = 0; i < arr.length - 1; i++) {
    const cepA = parseInt(arr[i].cep.replace(/\D/g, ''), 10)
    const cepB = parseInt(arr[i + 1].cep.replace(/\D/g, ''), 10)
    if (cepA > cepB) {
      isSorted = false
      break
    }
  }

  return {
    totalPackages: packages.length,
    timeMs: Number((endTime - startTime).toFixed(3)),
    operations,
    passes: 8,
    isSorted,
  }
}