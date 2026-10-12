import React from 'react'
import { Package as BoxIcon, BookOpen, BarChart3, RotateCcw } from 'lucide-react'

interface HeaderProps {
  onOpenTheory: () => void
  onOpenBenchmark: () => void
  onReset: () => void
}

export const Header: React.FC<HeaderProps> = ({
  onOpenTheory,
  onOpenBenchmark,
  onReset,
}) => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <BoxIcon className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-white">
                Logi<span className="text-amber-400">Sort</span>
              </h1>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-mono">
                EDA 2 - G06
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Centro Automatizado de Triagem Postal com <span className="text-slate-200 font-medium">Radix Sort LSD</span>
            </p>
          </div>
        </div>

        {/* Badges de Complexidade */}
        <div className="hidden lg:flex items-center gap-3 text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
            <span className="text-slate-400">Complexidade:</span>
            <span className="font-mono text-emerald-400 font-semibold">O(d · (n + k))</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
            <span className="text-slate-400">Propriedade:</span>
            <span className="text-sky-400 font-medium">Estável & Não-Comparativo</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center gap-2">
            <span className="text-slate-400">Base (Baldes):</span>
            <span className="text-amber-400 font-mono font-semibold">k = 10 (Dígitos)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTheory}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all hover:text-white"
          >
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>Teoria do Algoritmo</span>
          </button>

          <button
            onClick={onOpenBenchmark}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 transition-all"
          >
            <BarChart3 className="w-4 h-4 text-amber-400" />
            <span>Arena de Carga</span>
          </button>

          <button
            onClick={onReset}
            title="Reiniciar Lote Inicial"
            className="p-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  )
}