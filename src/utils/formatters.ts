import { BrazilianRegion, PriorityLevel } from '../algorithms/types'

export function formatCep(cep: string): string {
  const clean = cep.replace(/\D/g, '').padEnd(8, '0').slice(0, 8)
  return `${clean.slice(0, 5)}-${clean.slice(5)}`
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export function getRegionColor(region: BrazilianRegion): string {
  switch (region) {
    case 'Sudeste':
      return 'bg-blue-900/60 text-blue-300 border-blue-700'
    case 'Sul':
      return 'bg-cyan-900/60 text-cyan-300 border-cyan-700'
    case 'Centro-Oeste':
      return 'bg-amber-900/60 text-amber-300 border-amber-700'
    case 'Nordeste':
      return 'bg-orange-900/60 text-orange-300 border-orange-700'
    case 'Norte':
      return 'bg-emerald-900/60 text-emerald-300 border-emerald-700'
    default:
      return 'bg-slate-800 text-slate-300 border-slate-700'
  }
}

export function getPriorityColor(priority: PriorityLevel): string {
  switch (priority) {
    case 'Sedex 10':
      return 'bg-red-500/20 text-red-400 border-red-500/40'
    case 'Expressa (Sedex)':
      return 'bg-amber-500/20 text-amber-400 border-amber-500/40'
    case 'Padrão':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/40'
    case 'Econômica':
      return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    default:
      return 'bg-slate-700 text-slate-300 border-slate-600'
  }
}