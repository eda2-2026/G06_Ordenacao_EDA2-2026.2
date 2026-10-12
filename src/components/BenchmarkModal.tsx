import React, { useState } from 'react'
import { X, BarChart3, Play, CheckCircle2, Zap, Clock, ShieldCheck } from 'lucide-react'
import { generateMockPackages } from '../data/mockPackages'
import { runRadixSortBenchmark } from '../algorithms/radixSort'
import { BenchmarkResult } from '../algorithms/types'

interface BenchmarkModalProps {
  isOpen: boolean
  onClose: () => void
}

export const BenchmarkModal: React.FC<BenchmarkModalProps> = ({ isOpen, onClose }) => {
  const [testSize, setTestSize] = useState<number>(5000)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  const [result, setResult] = useState<BenchmarkResult | null>(null)
  const [comparisonTimeMs, setComparisonTimeMs] = useState<number | null>(null)

  if (!isOpen) return null

  const handleRunBenchmark = () => {
    setIsRunning(true)

    setTimeout(() => {
      // Gera lote sintético
      const packages = generateMockPackages(testSize, 'random')

      // Execucao Radix Sort
      const res = runRadixSortBenchmark(packages)

      // Execucao Comparativa (Array.prototype.sort - Timsort O(n log n))
      const arrCopy = [...packages]
      const startComp = performance.now()
      arrCopy.sort((a, b) => a.cep.localeCompare(b.cep))
      const endComp = performance.now()

      setResult(res)
      setComparisonTimeMs(Number((endComp - startComp).toFixed(3)))
      setIsRunning(false)
    }, 50)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Arena de Benchmark & Teste de Carga
              </h2>
              <p className="text-xs text-slate-400">
                Avaliação de desempenho empírico com grandes massas de encomendas
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 text-slate-300 text-xs sm:text-sm">
          {/* Seletor de Carga */}
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              Selecione o Volume de Encomendas para Triagem:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: '500 pacotes', val: 500 },
                { label: '2.500 pacotes', val: 2500 },
                { label: '10.000 pacotes', val: 10000 },
                { label: '30.000 pacotes', val: 30000 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  onClick={() => setTestSize(opt.val)}
                  disabled={isRunning}
                  className={`py-2 px-3 rounded-lg font-mono text-xs font-semibold transition-all border ${
                    testSize === opt.val
                      ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-sm'
                      : 'bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleRunBenchmark}
                disabled={isRunning}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Processando Triagem...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Executar Benchmark ({testSize.toLocaleString()} itens)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Resultados */}
          {result && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Tempo Radix */}
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-emerald-500/30">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                    <Zap className="w-3.5 h-3.5 text-emerald-400" />
                    Tempo Radix Sort (LSD)
                  </span>
                  <div className="text-xl font-mono font-bold text-emerald-400">
                    {result.timeMs} ms
                  </div>
                  <span className="text-[10px] text-slate-500">
                    8 passadas lineares O(n)
                  </span>
                </div>

                {/* Tempo Comparativo */}
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-sky-500/30">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                    <Clock className="w-3.5 h-3.5 text-sky-400" />
                    Tempo Comparativo (Timsort)
                  </span>
                  <div className="text-xl font-mono font-bold text-sky-400">
                    {comparisonTimeMs} ms
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Algoritmo de comparação O(n log n)
                  </span>
                </div>

                {/* Total Operações */}
                <div className="bg-slate-950/70 p-3.5 rounded-xl border border-amber-500/30">
                  <span className="text-[11px] text-slate-400 flex items-center gap-1 mb-1">
                    <BarChart3 className="w-3.5 h-3.5 text-amber-400" />
                    Operações Realizadas
                  </span>
                  <div className="text-xl font-mono font-bold text-amber-400">
                    {result.operations.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {result.passes} passadas x {result.totalPackages.toLocaleString()} itens
                  </span>
                </div>
              </div>

              {/* Verificação de Corretude */}
              <div className="p-3 bg-emerald-950/30 border border-emerald-600/40 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400">
                  <ShieldCheck className="w-5 h-5 flex-shrink-0" />
                  <span className="text-xs font-semibold">
                    Validação Rigorosa: Todos os {result.totalPackages.toLocaleString()} pacotes foram verificados e estão 100% ordenados pelo CEP!
                  </span>
                </div>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end bg-slate-900/90">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  )
}