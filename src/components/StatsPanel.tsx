import React from 'react'
import { RadixStep } from '../algorithms/types'
import { getDigitName } from '../algorithms/radixSort'
import { Activity, Clock, CheckCircle2, Hash, ArrowUpDown } from 'lucide-react'

interface StatsPanelProps {
  currentStep: RadixStep | null
  totalPackages: number
  isFinished: boolean
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
  currentStep,
  totalPackages,
  isFinished,
}) => {
  const passNumber = currentStep?.passNumber ?? 0
  const charIndex = currentStep?.charIndex ?? 7
  const comparisonCount = currentStep?.comparisonCount ?? 0
  const dispatchCount = currentStep?.dispatchCount ?? 0
  const collectionCount = currentStep?.collectionCount ?? 0
  const message = currentStep?.message ?? 'Pronto para iniciar a triagem das encomendas.'

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl space-y-4">
      {/* Mensagem e Status Geral */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3.5">
        <div className="flex items-start gap-3">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
              isFinished
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
            }`}
          >
            {isFinished ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <Activity className="w-5 h-5 animate-pulse" />
            )}
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              Status da Operação
            </span>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed max-w-2xl">
              {message}
            </p>
          </div>
        </div>

        {/* Indicador de Passadas (8 digitos do CEP) */}
        <div className="flex flex-col items-end">
          <span className="text-[11px] text-slate-400 mb-1">
            Passada: <strong className="text-amber-400 font-mono">{passNumber}/8</strong>
          </span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 8 }, (_, i) => {
              const p = i + 1
              const isCompleted = isFinished || passNumber > p
              const isCurrent = !isFinished && passNumber === p
              return (
                <div
                  key={i}
                  title={`Passada ${p} (Dígito [${7 - i}])`}
                  className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-mono font-bold transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-slate-950 ring-1 ring-emerald-400'
                      : isCurrent
                      ? 'bg-amber-400 text-slate-950 animate-pulse ring-2 ring-amber-300'
                      : 'bg-slate-800 text-slate-500 border border-slate-700'
                  }`}
                >
                  {p}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Grid de Metricas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Metrica 1: Digito Atual */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Hash className="w-3.5 h-3.5 text-sky-400" />
            <span>Dígito em Foco</span>
          </div>
          <div className="font-mono text-sm sm:text-base font-bold text-white truncate">
            Índice [{charIndex}]
          </div>
          <p className="text-[10px] text-slate-400 truncate mt-0.5">
            {currentStep ? getDigitName(currentStep.digitPosition) : 'Não iniciado'}
          </p>
        </div>

        {/* Metrica 2: Distribuicoes para Baldes */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
            <span>Leituras & Despachos</span>
          </div>
          <div className="font-mono text-sm sm:text-base font-bold text-amber-400">
            {dispatchCount} <span className="text-xs text-slate-500 font-normal">({comparisonCount} lidos)</span>
          </div>
          <p className="text-[10px] text-slate-400 truncate mt-0.5">
            {totalPackages > 0
              ? `${((dispatchCount / (totalPackages * 8)) * 100).toFixed(0)}% do lote processado`
              : '0%'}
          </p>
        </div>

        {/* Metrica 3: Recolhimentos Estaveis */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recolhimentos FIFO</span>
          </div>
          <div className="font-mono text-sm sm:text-base font-bold text-emerald-400">
            {collectionCount}
          </div>
          <p className="text-[10px] text-slate-400 truncate mt-0.5">
            Estabilidade preservada
          </p>
        </div>

        {/* Metrica 4: Complexidade Efetiva */}
        <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
            <Clock className="w-3.5 h-3.5 text-purple-400" />
            <span>Complexidade Teórica</span>
          </div>
          <div className="font-mono text-sm sm:text-base font-bold text-purple-300">
            O(8 · (n + 10))
          </div>
          <p className="text-[10px] text-slate-400 truncate mt-0.5">
            Linear O(n) para d=8 fixo
          </p>
        </div>
      </div>
    </div>
  )
}