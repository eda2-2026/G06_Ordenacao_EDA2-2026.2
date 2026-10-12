# LogiSort - Centro Automatizado de Triagem Postal com Radix Sort LSD

**Disciplina:** Estruturas de Dados e Algoritmos 2 (EDA 2)  
**Módulo:** Algoritmos de Ordenação  
**Grupo:** 06 (G06)  
**Semestre:** 2026.2  

---

## 👥 Integrantes do Grupo

| Matrícula | Nome Completo | GitHub |
| :---: | :--- | :---: |
| 222008468 | Danilo Barros | [@auslogyc](https://github.com/auslogyc) |

---

## 📦 Sobre o Projeto

O **LogiSort** é uma aplicação interativa que modela e resolve um dos problemas logísticos mais críticos do mundo real: a **triagem automatizada e o roteamento de correspondências e encomendas por CEP**, utilizando o algoritmo **Radix Sort LSD (Least Significant Digit)** com sub-rotina de baldes estáveis.

### Contexto e Aplicação no Mundo Real
Diariamente, centros de distribuição logística (como os dos **Correios**, Mercado Livre e Amazon) processam milhões de pacotes. Cada encomenda no Brasil possui um **CEP (Código de Endereçamento Postal)** composto por **8 dígitos decimais** (`XXXXX-XXX`).

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
   - **Iniciar Triagem / Pausar:** Execução contínua em tempo real.
   - **Passo a Passo (Step Forward):** Permite avançar uma leitura/despacho por vez para análise didática.
   - **Velocidade Ajustável:** De $0.5\times$ (lento, ideal para explicação) até $4\times$ (rápido).
   - **Variação de Lotes:** Lotes de 8, 12, 20 ou 30 pacotes.
   - **Distribuições:** Aleatória, Quase Ordenada, Invertida e com Duplicatas.
3. **Efeitos Sonoros Sintetizados (Web Audio API):**
   - Bipe realista de leitor de código de barras a cada leitura do sensor.
   - Notas musicais proporcionais ao índice de cada balde (0 a 9), no estilo do visualizador clássico de algoritmos da ementa.
   - Botão para ativar/desativar o som a qualquer momento.
4. **Arena de Benchmark e Teste de Carga:**
   - Processamento de **500 a 30.000+ encomendas reais**.
   - Comparação empírica de tempo de execução ($\text{ms}$) contra algoritmos de comparação $O(n \log n)$.
   - Validador automático garantindo que 100% dos pacotes resultaram estritamente ordenados pelo CEP.
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

### 2. Comparativo: Radix Sort vs. Algoritmos Clássicos

| Algoritmo | Melhor Caso | Caso Médio | Pior Caso | Memória Auxiliar | Estável? |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Radix Sort LSD (LogiSort)** | $\mathbf{\Theta(n)}$ | $\mathbf{\Theta(n)}$ | $\mathbf{\Theta(n)}$ | $O(n + k)$ | **Sim** |
| **Quick Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n^2)$ | $O(\log n)$ | Não |
| **Merge Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(n)$ | Sim |
| **Heap Sort** | $O(n \log n)$ | $O(n \log n)$ | $O(n \log n)$ | $O(1)$ | Não |

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem & Tipagem:** TypeScript 5.5 / JavaScript (ES2022)
- **Framework Front-End:** [React 18](https://react.dev/)
- **Build Tooling & Servidor:** [Vite 5](https://vitejs.dev/)
- **Estilização & Design System:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Ícones:** [Lucide Icons](https://lucide.dev/)
- **Áudio:** Web Audio API nativa (sem arquivos pesados de terceiros)
- **Efeitos Visuais:** Canvas Confetti

---

## 💻 Instalação e Execução

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior instalada.
- Gerenciador de pacotes `npm` (já incluso no Node.js).

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
   Abra no seu navegador o endereço indicado (normalmente `http://localhost:5173/`).

4. **Gerar Build de Produção (Opcional):**
   ```bash
   npm run build
   npm run preview
   ```

---

## 🎮 Guia de Uso da Interface

1. **Controles Principais:**
   - **Botão "Iniciar Triagem" (Verde):** Dá play na simulação automática. A esteira começa a se mover e os pacotes são distribuídos para os baldes.
   - **Botão "Passo a Passo" (Azul):** Permite ver cada ação isolada (leitura do sensor ótico e queda no balde).
   - **Seletor de Velocidade (0.5x, 1x, 2x, 4x):** Ajusta o ritmo da animação. Para apresentações, `1x` ou `0.5x` são ideais.
   - **Botão "Novo Lote":** Sorteia uma nova lista de encomendas brasileiras com CEPs válidos.
2. **Painel de Métricas:**
   - Exibe a passada atual de 1 a 8, qual dígito do CEP está sendo avaliado (ex: unidade, centena, região postal geral), total de despachos e recolhimentos estáveis.
3. **Botão "Arena de Carga":**
   - Abre o modal de benchmark empírico. Escolha entre 500, 2.500, 10.000 ou 30.000 pacotes e clique em "Executar Benchmark" para ver a medição real em milissegundos contra algoritmos de comparação.
4. **Botão "Teoria do Algoritmo":**
   - Abre um resumo didático com a história da IBM, demonstração da complexidade e pseudocódigo.

---

## 🎥 Vídeo de Apresentação

O vídeo de apresentação do trabalho demonstrando a execução do código, a interface web, a explicação do algoritmo e dos conceitos de EDA 2 está disponível no link abaixo:

- **Link do Vídeo:** *(Adicione aqui o link não listado do YouTube ou Google Drive após a gravação)*

---

## 📜 Histórico de Commits Progressivos

O projeto foi construído incrementalmente através de commits semânticos no Git:

1. `chore: inicializar estrutura do projeto com Vite, React, TypeScript e Tailwind CSS`
2. `feat(algorithms): implementar algoritmo Radix Sort LSD com gerador de passos para triagem`
3. `feat(data): adicionar gerador de encomendas brasileiras com CEPs reais e rotas de entrega`
4. `feat(ui): implementar esteira de triagem, cartoes de encomendas e visualizador de baldes`
5. `feat(ui): adicionar controles de execucao, velocidade, modo passo-a-passo e sonoplastia`
6. `feat(app): adicionar painel de metricas, estatisticas em tempo real e aba de teoria pedagogica`
7. `docs: adicionar documentacao completa do projeto no padrao EDA 2`
8. `docs: detalhar guia de uso da aplicacao e roteiro de apresentacao no README`
