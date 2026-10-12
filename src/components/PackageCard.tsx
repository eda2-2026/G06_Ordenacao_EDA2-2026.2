import React from 'react'
import { Package } from '../algorithms/types'
import { getRegionColor, getPriorityColor } from '../utils/formatters'
import { MapPin, QrCode } from 'lucide-react'

interface PackageCardProps {
  pkg: Package
  highlightCharIndex?: number
  isActive?: boolean
  isTargetBucket?: boolean
  compact?: boolean
}

export const PackageCard: React.FC<PackageCardProps> = ({
  pkg,
  highlightCharIndex,
  isActive = false,
  compact = false,
}) => {
  // O CEP possui 8 digitos. Formato: 12345-678 (indices 0..4, hífen, 5..7)
  const renderCepWithHighlight = () => {
    const raw = pkg.cep.replace(/\D/g, '').padStart(8, '0')
    const part1 = raw.slice(0, 5)
    const part2 = raw.slice(5)

    const renderChar = (char: string, index: number) => {
      const isHighlighted = highlightCharIndex === index
      return (
        <span
          key={index}
          className={`inline-block font-mono font-bold transition-all duration-200 px-0.5 rounded ${
            isHighlighted
              ? 'bg-amber-400 text-slate-950 scale-125 shadow-md shadow-amber-400/50 ring-2 ring-amber-300'
              : 'text-slate-200'
          }`}
        >
          {char}
        </span>
      )
    }

    return (
      <div className="flex items-center gap-0.5 font-mono text-xs sm:text-sm font-semibold tracking-wider">
        <span className="flex">
          {part1.split('').map((c, i) => renderChar(c, i))}
        </span>
        <span className="text-slate-400">-</span>
        <span className="flex">
          {part2.split('').map((c, i) => renderChar(c, i + 5))}
        </span>
      </div>
    )
  }

  if (compact) {
    return (
      <div
        className={`px-2 py-1.5 rounded-lg border text-xs transition-all duration-200 flex items-center justify-between gap-2 ${
          isActive
            ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20 scale-[1.02]'
            : 'bg-slate-800/90 border-slate-700/80 hover:border-slate-600'
        }`}
      >
        <div className="flex items-center gap-2">
          <QrCode className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono font-bold text-slate-300">{pkg.id}</span>
        </div>
        <div className="text-right">
          {renderCepWithHighlight()}
        </div>
      </div>
    )
  }

  return (
    <div
      className={`relative p-3 rounded-xl border transition-all duration-300 flex flex-col justify-between ${
        isActive
          ? 'bg-gradient-to-br from-slate-800 via-amber-950/30 to-slate-800 border-amber-400 shadow-xl shadow-amber-500/20 scale-[1.03] ring-1 ring-amber-400'
          : 'bg-slate-800/80 border-slate-700/70 hover:border-slate-600 shadow-md'
      }`}
    >
      {/* Header do Card */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-bold text-amber-400">
              {pkg.id}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              ({pkg.trackingCode})
            </span>
          </div>
          <p className="text-xs font-medium text-slate-200 truncate max-w-[150px]">
            {pkg.recipient}
          </p>
        </div>

        <span
          className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${getPriorityColor(
            pkg.priority
          )}`}
        >
          {pkg.priority}
        </span>
      </div>

      {/* CEP em destaque */}
      <div className="my-2 p-2 rounded-lg bg-slate-900/80 border border-slate-700/50 flex flex-col items-center justify-center">
        <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold mb-0.5">
          CEP de Destino
        </span>
        {renderCepWithHighlight()}
      </div>

      {/* Localidade e dados */}
      <div className="mt-1 flex items-center justify-between text-[11px] text-slate-300">
        <div className="flex items-center gap-1 truncate">
          <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
          <span className="truncate">
            {pkg.city} - {pkg.state}
          </span>
        </div>

        <span
          className={`text-[10px] px-1.5 py-0.5 rounded border ${getRegionColor(
            pkg.region
          )}`}
        >
          {pkg.region}
        </span>
      </div>
    </div>
  )
}