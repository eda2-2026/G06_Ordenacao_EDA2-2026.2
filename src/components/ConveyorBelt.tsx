import React from 'react'
import { Package } from '../algorithms/types'
import { PackageCard } from './PackageCard'
import { Cpu, ArrowRight, Layers } from 'lucide-react'

interface ConveyorBeltProps {
  conveyor: Package[]
  activePackageId?: string
  highlightCharIndex?: number
  targetBucket?: number
  passNumber: number
  isCollecting?: boolean
  isFinished?: boolean
}

export const ConveyorBelt: React.FC<ConveyorBeltProps> = ({
  conveyor,
  activePackageId,
  highlightCharIndex,
  targetBucket,
  isCollecting = false,
  isFinished = false,
}) => {
  const activePackage = conveyor.find((p) => p.id === activePackageId)
  const remainingPackages = conveyor.filter((p) => p.id !== activePackageId)

  return (
    <div className="w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-5 shadow-xl relative overflow-hidden">
      {/* Background visual conveyor stripes */}
      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 opacity-60"></div>

      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {isFinished
              ? 'Lote 100% Triado e Roteado'
              : isCollecting
              ? 'Esteira Principal (Recolhendo dos Baldes)'
              : 'Esteira Central de Triagem (Fila de Leitura)'}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400">Total na Esteira:</span>
          <span className="font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
            {conveyor.length} pacotes
          </span>
        </div>
      </div>

      {/* Grid: Sensor Ótico à esquerda (quando há item ativo) e Esteira rolante */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        {/* Estação do Sensor / Leitor Ótico */}
        <div className="lg:col-span-4 bg-slate-950/80 rounded-xl border border-slate-800 p-3.5 flex flex-col justify-between relative shadow-inner">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <Cpu className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Sensor Ótico / Scanner</span>
            </div>
            {targetBucket !== undefined && (
              <span className="text-[11px] font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30 flex items-center gap-1">
                Destino: Balde [{targetBucket}]
                <ArrowRight className="w-3 h-3" />
              </span>
            )}
          </div>

          {activePackage ? (
            <div className="relative">
              {/* Linha laser de scanner animada */}
              <div className="absolute inset-x-0 top-1/2 h-0.5 bg-red-500 shadow-md shadow-red-500/80 animate-pulse z-20 pointer-events-none"></div>
              <PackageCard
                pkg={activePackage}
                highlightCharIndex={highlightCharIndex}
                isActive={true}
              />
            </div>
          ) : (
            <div className="h-[140px] rounded-lg border border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-500 text-xs">
              <Cpu className="w-8 h-8 text-slate-700 mb-2" />
              <span>Aguardando próximo pacote na esteira...</span>
            </div>
          )}
        </div>

        {/* Fila da Esteira de Pacotes Restantes */}
        <div className="lg:col-span-8">
          <div className="text-xs text-slate-400 mb-2 flex items-center justify-between">
            <span>Fila de Pacotes Aguardando Inspeção:</span>
            <span className="text-[11px] text-slate-500">
              Preservação de ordem FIFO (Estabilidade do Radix)
            </span>
          </div>

          {remainingPackages.length === 0 ? (
            <div className="h-[140px] rounded-xl border border-dashed border-slate-800 flex items-center justify-center text-slate-500 text-xs italic">
              Nenhum pacote restante nesta esteira (todos distribuídos para os baldes).
            </div>
          ) : (
            <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
              {remainingPackages.map((pkg) => (
                <div key={pkg.id} className="min-w-[190px] max-w-[210px] flex-shrink-0">
                  <PackageCard
                    pkg={pkg}
                    highlightCharIndex={highlightCharIndex}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}