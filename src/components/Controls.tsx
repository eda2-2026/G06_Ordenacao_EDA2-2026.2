import React from 'react'
import {
  Play,
  Pause,
  SkipForward,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  Sliders,
  Sparkles,
} from 'lucide-react'

interface ControlsProps {
  isRunning: boolean
  isFinished: boolean
  speed: number // ms por passo
  soundEnabled: boolean
  batchSize: number
  distribution: 'random' | 'almost-sorted' | 'reversed' | 'duplicates'
  onTogglePlay: () => void
  onStepForward: () => void
  onReset: () => void
  onChangeSpeed: (speed: number) => void
  onToggleSound: () => void
  onChangeBatchSize: (size: number) => void
  onChangeDistribution: (dist: 'random' | 'almost-sorted' | 'reversed' | 'duplicates') => void
  onGenerateNewBatch: () => void
}

export const Controls: React.FC<ControlsProps> = ({
  isRunning,
  isFinished,
  speed,
  soundEnabled,
  batchSize,
  distribution,
  onTogglePlay,
  onStepForward,
  onReset,
  onChangeSpeed,
  onToggleSound,
  onChangeBatchSize,
  onChangeDistribution,
  onGenerateNewBatch,
}) => {
  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Botoes Primarios de Reproducao */}
        <div className="flex items-center gap-2">
          <button
            onClick={onTogglePlay}
            disabled={isFinished}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 shadow-lg ${
              isFinished
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : isRunning
                ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-amber-500/25 ring-2 ring-amber-400/50'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/25 ring-2 ring-emerald-400/50'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4 fill-current" />
                <span>Pausar</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{isFinished ? 'Concluído' : 'Iniciar Triagem'}</span>
              </>
            )}
          </button>

          <button
            onClick={onStepForward}
            disabled={isRunning || isFinished}
            title="Avançar 1 passo manual (Step-by-step)"
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <SkipForward className="w-4 h-4 text-sky-400" />
            <span className="hidden sm:inline">Passo a Passo</span>
          </button>

          <button
            onClick={onReset}
            title="Reiniciar Lote Atual"
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Controle de Velocidade */}
        <div className="flex items-center gap-2 bg-slate-950/60 px-3 py-1.5 rounded-xl border border-slate-800">
          <Gauge className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">
            Velocidade:
          </span>

          <div className="flex items-center gap-1">
            {[
              { label: '0.5x', val: 700 },
              { label: '1x', val: 350 },
              { label: '2x', val: 150 },
              { label: '4x', val: 50 },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => onChangeSpeed(item.val)}
                className={`px-2 py-1 rounded text-xs font-mono font-semibold transition-all ${
                  speed === item.val
                    ? 'bg-amber-400 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Configuracao de Lote de Pacotes */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Seletor de Tamanho */}
          <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <Sliders className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Pacotes:</span>
            <select
              value={batchSize}
              onChange={(e) => onChangeBatchSize(Number(e.target.value))}
              disabled={isRunning}
              className="bg-slate-800 text-slate-200 rounded px-1.5 py-0.5 border border-slate-700 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value={8}>8 unid.</option>
              <option value={12}>12 unid.</option>
              <option value={20}>20 unid.</option>
              <option value={30}>30 unid.</option>
            </select>
          </div>

          {/* Seletor de Distribuicao */}
          <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1.5 rounded-xl border border-slate-800 text-xs">
            <span className="text-slate-400">Ordem:</span>
            <select
              value={distribution}
              onChange={(e) =>
                onChangeDistribution(
                  e.target.value as 'random' | 'almost-sorted' | 'reversed' | 'duplicates'
                )
              }
              disabled={isRunning}
              className="bg-slate-800 text-slate-200 rounded px-1.5 py-0.5 border border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-amber-400"
            >
              <option value="random">Aleatória</option>
              <option value="almost-sorted">Quase Ordenada</option>
              <option value="reversed">Invertida</option>
              <option value="duplicates">Com Duplicatas</option>
            </select>
          </div>

          {/* Gerar Novo Lote */}
          <button
            onClick={onGenerateNewBatch}
            disabled={isRunning}
            title="Sortear novo lote de encomendas"
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-amber-300 border border-slate-700 text-xs font-medium transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Novo Lote</span>
          </button>

          {/* Som Ativar/Desativar */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Silenciar sonoplastia' : 'Ativar efeitos sonoros'}
            className={`p-2 rounded-xl border transition-all ${
              soundEnabled
                ? 'bg-amber-400/10 border-amber-400/30 text-amber-400 hover:bg-amber-400/20'
                : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}