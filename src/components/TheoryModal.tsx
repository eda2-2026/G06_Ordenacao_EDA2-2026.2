import React from 'react'
import { X, BookOpen, Lightbulb, History, Cpu, Zap, CheckCircle2 } from 'lucide-react'

interface TheoryModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TheoryModal: React.FC<TheoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400/10 text-amber-400 border border-amber-400/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">
                Fundamentos Teóricos: Radix Sort LSD
              </h2>
              <p className="text-xs text-slate-400">
                Disciplina de Estruturas de Dados 2 (EDA 2) | Trabalho de Ordenação
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

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          {/* Seção 1: O que é o Radix Sort */}
          <section className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Lightbulb className="w-4 h-4" />
              <h3>O que é o Radix Sort?</h3>
            </div>
            <p>
              O <strong>Radix Sort</strong> (ordenação por raiz/base) é um algoritmo de ordenação <strong>não-comparativo</strong>. Diferente de algoritmos baseados em comparações diretas de elementos (como QuickSort ou MergeSort, limitados pela barreira teórica de $\Omega(n \log n)$), o Radix Sort processa elementos analisando seus dígitos ou caracteres individuais.
            </p>
            <p>
              No método <strong>LSD (Least Significant Digit)</strong>, ordenamos os itens partindo do <em>dígito menos significativo</em> (unidade) até o <em>mais significativo</em>.
            </p>
          </section>

          {/* Seção 2: Conexao Historica da Ementa (IBM Card Sort) */}
          <section className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
              <History className="w-4 h-4" />
              <h3>Origem Histórica: As Máquinas de Triagem de Cartões da IBM</h3>
            </div>
            <p>
              Historicamente, o Radix Sort foi inventado no século XIX por <em>Herman Hollerith</em> para o Censo norte-americano de 1890, utilizando <strong>cartões perfurados</strong>.
            </p>
            <p>
              Durante grande parte do século XX, as lendárias <strong>IBM Card Sorting Machines</strong> (como a <em>IBM 082</em> e <em>IBM 083</em>, citadas na ementa da disciplina) separavam fisicamente milhares de cartões por minuto em 10 a 12 bandejas de acordo com a coluna perfurada, exatamente como as esteiras modernas de correios e transporte separam encomendas por CEP!
            </p>
          </section>

          {/* Seção 3: Por que a Estabilidade é Obrigatória? */}
          <section className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <h3>A Importância da Estabilidade (Stability)</h3>
            </div>
            <p>
              Para que o Radix Sort LSD funcione corretamente, a sub-rotina de ordenação de cada dígito <strong>PRECISA ser estável</strong>. Isso significa que, se duas encomendas tiverem o mesmo dígito na passada atual, a ordem relativa que elas tinham na passada anterior deve ser rigorosamente mantida (princípio FIFO na coleta dos baldes).
            </p>
            <p className="text-slate-400 italic">
              Se a estabilidade for violada, a ordenação dos dígitos anteriores seria perdida na passada seguinte!
            </p>
          </section>

          {/* Seção 4: Analise de Complexidade */}
          <section className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm">
              <Cpu className="w-4 h-4" />
              <h3>Análise Assintótica de Complexidade</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Complexidade Temporal:</span>
                <span className="text-emerald-400 font-bold text-sm block my-1">
                  Θ(d · (n + k))
                </span>
                <span className="text-slate-400 font-sans text-[11px]">
                  Onde <strong>d = 8</strong> (dígitos do CEP brasileiro), <strong>n</strong> é a quantidade de encomendas e <strong>k = 10</strong> (base decimal).
                </span>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                <span className="text-slate-400 block text-[11px]">Complexidade Espacial:</span>
                <span className="text-sky-400 font-bold text-sm block my-1">
                  O(n + k)
                </span>
                <span className="text-slate-400 font-sans text-[11px]">
                  Memória auxiliar necessária para os 10 baldes (k=10) e para o lote de saída (n).
                </span>
              </div>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-lg border border-amber-500/20 text-xs">
              <span className="text-amber-300 font-bold block mb-1">
                ⚡ Vantagem Prática em relação ao QuickSort / MergeSort:
              </span>
              Como o número de dígitos do CEP é fixo ($d = 8$), a função de complexidade se reduz a <strong className="font-mono text-emerald-400">O(n)</strong> (tempo estritamente linear!). Para 100.000 pacotes, o Radix Sort realiza aproximadamente 800.000 operações diretas, enquanto um QuickSort $O(n \log_2 n)$ realizaria mais de 1.660.000 comparações no caso médio.
            </div>
          </section>

          {/* Seção 5: Pseudocódigo */}
          <section className="bg-slate-950/50 p-4 rounded-xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
              <Zap className="w-4 h-4 text-amber-400" />
              <h3>Pseudocódigo do Radix Sort LSD</h3>
            </div>
            <pre className="p-3 rounded-lg bg-slate-900 font-mono text-[11px] sm:text-xs text-amber-300/90 overflow-x-auto border border-slate-800 leading-relaxed">
{`funcao radixSortPostal(encomendas, d = 8, k = 10):
    para cada digitoPos de 0 ate d - 1:
        baldes = lista de 10 listas vazias [0 .. 9]
        
        // Distribuicao (Counting / Bucket)
        para cada pacote em encomendas:
            digito = obterDigito(pacote.cep, digitoPos)
            baldes[digito].inserirNoFim(pacote)
            
        // Coleta estavel (FIFO)
        encomendas = concatenarBaldes(baldes[0], ..., baldes[9])
        
    retornar encomendas`}
            </pre>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 flex justify-end bg-slate-900/90">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Entendido, Voltar à Simulação
          </button>
        </div>
      </div>
    </div>
  )
}