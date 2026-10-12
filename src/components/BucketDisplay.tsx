import React from 'react'
import { Package } from '../algorithms/types'
import { PackageCard } from './PackageCard'
import { Archive, ArrowDown } from 'lucide-react'

interface BucketDisplayProps {
  buckets: Package[][]
  targetBucket?: number
  highlightCharIndex?: number
  passNumber: number
}

// Descricao geografica oficial dos Correios para o 1º digito (passada 8)
const POSTAL_REGION_LABELS: Record<number, string> = {
  0: 'SP (Grande SP)',
  1: 'SP (Interior)',
  2: 'RJ / ES',
  3: 'Minas Gerais',
  4: 'BA / SE',
  5: 'PE / AL / PB / RN',
  6: 'CE / PI / MA / PA / AM / etc.',
  7: 'DF / GO / TO / RO / AC',
  8: 'PR / SC',
  9: 'Rio Grande do Sul',
}

export const BucketDisplay: React.FC<BucketDisplayProps> = ({
  buckets,
  targetBucket,
  highlightCharIndex,
  passNumber,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Archive className="w-5 h-5 text-amber-400" />
          <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Baldes de Triagem Postal (Base k = 10)
          </h2>
        </div>
        <span className="text-xs text-slate-400">
          Distribuição estável por dígito <span className="font-mono text-amber-400 font-bold">[0..9]</span>
        </span>
      </div>

      {/* Grid com os 10 baldes (5 colunas em desktop, 2 em mobile) */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 sm:gap-2.5">
        {buckets.map((bucketPackages, digit) => {
          const isTarget = targetBucket === digit
          const count = bucketPackages.length

          return (
            <div
              key={digit}
              className={`relative rounded-xl border flex flex-col justify-between transition-all duration-300 min-h-[160px] sm:min-h-[190px] p-2 ${
                isTarget
                  ? 'bg-amber-500/10 border-amber-400 ring-2 ring-amber-400/50 shadow-lg shadow-amber-500/20'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Header do Balde */}
              <div className="border-b border-slate-800 pb-1.5 mb-1.5 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div
                    className={`w-6 h-6 rounded-md font-mono font-black text-sm flex items-center justify-center transition-all ${
                      isTarget
                        ? 'bg-amber-400 text-slate-950 scale-110 shadow-sm'
                        : 'bg-slate-800 text-slate-200'
                    }`}
                  >
                    {digit}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">
                    Balde
                  </span>
                </div>

                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full font-bold ${
                    count > 0
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {count}
                </span>
              </div>

              {/* Informacao do significado do digito na passada 8 (Regiao Postal) */}
              {passNumber === 8 && (
                <div className="text-[9px] text-sky-300/80 font-medium truncate mb-1 bg-sky-950/40 px-1 py-0.5 rounded">
                  {POSTAL_REGION_LABELS[digit]}
                </div>
              )}

              {/* Indicador de entrada animada */}
              {isTarget && (
                <div className="flex items-center justify-center py-1 text-amber-400 animate-bounce">
                  <ArrowDown className="w-4 h-4" />
                </div>
              )}

              {/* Conteúdo de Pacotes empilhados no balde */}
              <div className="flex-1 overflow-y-auto max-h-[120px] sm:max-h-[140px] space-y-1.5 pr-0.5">
                {count === 0 ? (
                  <div className="h-full flex items-center justify-center text-[11px] text-slate-600 italic">
                    Vazio
                  </div>
                ) : (
                  bucketPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      highlightCharIndex={highlightCharIndex}
                      compact={true}
                    />
                  ))
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}