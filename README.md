# LogiSort - Centro Automatizado de Triagem Postal com Radix Sort LSD

**Disciplina:** Estruturas de Dados e Algoritmos 2 (EDA 2)  
**Módulo:** Algoritmos de Ordenação  
**Grupo:** 06 (G06)  
**Semestre:** 2026.2  

---

## Alunos

| Matrícula | Aluno |
| :---: | :--- |
| - | Danilo Barros |

---

## 📦 Sobre o Projeto

O **LogiSort** é uma aplicação interativa que modela e resolve um dos problemas logísticos mais críticos do mundo real: a **triagem automatizada e o roteamento de correspondências e encomendas por CEP**, utilizando o algoritmo **Radix Sort LSD (Least Significant Digit)** com sub-rotina de baldes estáveis.

### Contexto e Aplicação no Mundo Real
Diariamente, centros de triagem logística (como os dos **Correios**, Mercado Livre e Amazon) processam milhões de pacotes. Cada pacote no Brasil possui um **CEP (Código de Endereçamento Postal)** composto por **8 dígitos decimais** (`XXXXX-XXX`).

Em vez de recorrer a algoritmos de comparação tradicionais ($O(n \log n)$ como QuickSort ou MergeSort), sistemas logísticos automatizados de alta performance utilizam o princípio do **Radix Sort**:
1. O CEP possui tamanho fixo ($d = 8$) e base decimal ($k = 10$).
2. As encomendas percorrem esteiras onde sensores óticos lêem um dígito por passada, direcionando o pacote para uma das **10 esteiras/baldes de triagem (0 a 9)**.
3. Ao término de 8 passadas da direita para a esquerda (do dígito menos significativo ao mais significativo), o lote de encomendas está **100% ordenado por região geográfica e rota de entrega**.

> 💡 **Conexão Histórica:** O Radix Sort foi consagrado na indústria pelas clássicas **IBM Card Sorting Machines** (como a *IBM 082/083*, destacada na ementa da disciplina), onde cartões perfurados eram distribuídos fisicamente em bandejas mecânicas a cada passada.

---

## 🚀 Funcionalidades da Aplicação

1. **Visualizador Interativo Passo a Passo (Step-by-Step):**
   - **Sensor Ótico com Laser:** Destaca a leitura em tempo real do dígito exato do CEP sendo inspecionado.
   - **10 Baldes de Triagem (Base $k = 10$):** Animação dos pacotes caindo nas gavetas correspondentes de 0 a 9.
   - **Recolhimento Estável (FIFO):** Demonstra visualmente a preservação de estabilidade necessária para a corretude do Radix Sort.
2. **Controles de Simulação:**
   - Play / Pause para execução contínua.
   - Avanço manual passo a passo (*Step Forward*).
   - Sliders de velocidade ($0.5\times$ a $4\times$).
   - Variação do tamanho do lote (8, 12, 20 ou 30 pacotes).
   - Distribuições de dados: Aleatória, Quase Ordenada, Invertida e com Duplicatas.
3. **Efeitos Sonoros Sintetizados (Web Audio API):**
   - Bipe realista de leitor de código de barras a cada leitura.
   - Frequências harmônicas proporcionais a cada balde (inspirado nas visualizações clássicas de ordenação).
4. **Arena de Benchmark e Teste de Carga:**
   - Processamento de **500 a 30.000+ encomendas reais**.
   - Comparação empírica de tempo de execução ($\text{ms}$) contra algoritmos de comparação $O(n \log n)$.
   - Validador automático de ordenação com feedback de integridade.
5. **Modal Pedagógico de Fundamentos Teóricos:**
   - Dedução da complexidade assintótica, prova de estabilidade e pseudocódigo.

---

## 🧠 Análise de Complexidade Assintótica

### 1. Complexidade de Tempo

O Radix Sort LSD executa $d$ passadas lineares. Em cada passada, distribui $n$ elementos entre $k$ baldes e depois os recolhe:

$$\Theta(d \cdot (n + k))$$

No cenário de triagem do CEP brasileiro:
- $d = 8$ (quantidade fixa de dígitos do CEP)
- $k = 10$ (base decimal, dígitos de 0 a 9)

Como $d$ e $k$ são constantes independentes do tamanho da entrada $n$:

$$T(n) = 8 \cdot (n + 10) = 8n + 80 \implies \mathbf{O(n)} \quad \text{(Tempo Estritamente Linear)}$$

### 2. Comparativo: Radix Sort vs. Algoritmos Comparativos

| Algoritmo | Melhor Caso | Caso Médio | Pior Caso | Memória Auxiliar | Estável? |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Radix Sort LSD (LogiSort)** | $\mathbf{\Theta(n)}$ | $\mathbf{\Theta(n)}$ | $\mathbf{\Theta(n)}$ | $O(n + k)$ | **Sim** |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | Não |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Sim |
| **Heap Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | Não |

> **Conclusão:** Para dados com chaves numéricas ou alfanuméricas de tamanho fixo (como CEPs, CPFs e placas de veículos), o Radix Sort quebra a barreira assintótica de $\Omega(n \log n)$ de comparações, superando algoritmos clássicos em grandes volumes.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem & Runtime:** TypeScript / JavaScript (ES2022), Node.js (v18+)
- **Biblioteca de Interface:** [React 18](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Iconografia:** [Lucide Icons](https://lucide.dev/)
- **Áudio:** Web Audio API nativa
- **Efeitos:** Canvas Confetti

---

## 💻 Instalação e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior instalada.
- Gerenciador de pacotes `npm` (incluso com o Node).

### Passo a Passo

1. **Clonar o Repositório:**
   ```bash
   git clone https://github.com/eda2-2026/G06_Ordenacao_EDA2-2026.2.git
   cd G06_Ordenacao_EDA2-2026.2
   ```

2. **Instalar as Dependências:**
   ```bash
   npm install
   ```

3. **Executar em Modo de Desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse a URL exibida no terminal (normalmente `http://localhost:5173/`).

4. **Gerar Build de Produção:**
   ```bash
   npm run build
   ```

---

## 🎥 Vídeo de Apresentação

O vídeo de apresentação do trabalho demonstrando a execução do código, a interface web, a explicação do algoritmo e dos conceitos de EDA 2 está disponível no link abaixo:

- **Link do Vídeo:** *(Adicione aqui o link não listado do YouTube ou Google Drive)*

---

## 📜 Histórico de Commits Progressivos

O repositório foi construído de maneira incremental e modular, seguindo o padrão *Conventional Commits*:

1. `chore: inicializar estrutura do projeto com Vite, React, TypeScript e Tailwind CSS`
2. `feat(algorithms): implementar algoritmo Radix Sort LSD com gerador de passos para triagem`
3. `feat(data): adicionar gerador de encomendas brasileiras com CEPs reais e rotas de entrega`
4. `feat(ui): implementar esteira de triagem, cartoes de encomendas e visualizador de baldes`
5. `feat(ui): adicionar controles de execucao, velocidade, modo passo-a-passo e sonoplastia`
6. `feat(app): adicionar painel de metricas, estatisticas em tempo real e aba de teoria pedagogica`
7. `docs: adicionar documentacao completa do projeto no padrao EDA 2`