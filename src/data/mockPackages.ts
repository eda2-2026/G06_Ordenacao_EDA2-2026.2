import { Package, BrazilianRegion, PriorityLevel } from '../algorithms/types'

interface CityPostalInfo {
  city: string
  state: string
  region: BrazilianRegion
  baseCepPrefix: string // Primeiros digitos caracteristicos
}

export const BRAZILIAN_CITIES: CityPostalInfo[] = [
  // Regiao 0: Grande SP e Capital
  { city: 'São Paulo', state: 'SP', region: 'Sudeste', baseCepPrefix: '010' },
  { city: 'Guarulhos', state: 'SP', region: 'Sudeste', baseCepPrefix: '070' },
  { city: 'Santo André', state: 'SP', region: 'Sudeste', baseCepPrefix: '090' },

  // Regiao 1: Interior de SP
  { city: 'Campinas', state: 'SP', region: 'Sudeste', baseCepPrefix: '130' },
  { city: 'Ribeirão Preto', state: 'SP', region: 'Sudeste', baseCepPrefix: '140' },
  { city: 'Santos', state: 'SP', region: 'Sudeste', baseCepPrefix: '110' },

  // Regiao 2: Rio de Janeiro e Espirito Santo
  { city: 'Rio de Janeiro', state: 'RJ', region: 'Sudeste', baseCepPrefix: '200' },
  { city: 'Niterói', state: 'RJ', region: 'Sudeste', baseCepPrefix: '240' },
  { city: 'Vitória', state: 'ES', region: 'Sudeste', baseCepPrefix: '290' },

  // Regiao 3: Minas Gerais
  { city: 'Belo Horizonte', state: 'MG', region: 'Sudeste', baseCepPrefix: '301' },
  { city: 'Uberlândia', state: 'MG', region: 'Sudeste', baseCepPrefix: '384' },
  { city: 'Juiz de Fora', state: 'MG', region: 'Sudeste', baseCepPrefix: '360' },

  // Regiao 4: Bahia e Sergipe
  { city: 'Salvador', state: 'BA', region: 'Nordeste', baseCepPrefix: '400' },
  { city: 'Feira de Santana', state: 'BA', region: 'Nordeste', baseCepPrefix: '440' },
  { city: 'Aracaju', state: 'SE', region: 'Nordeste', baseCepPrefix: '490' },

  // Regiao 5: Pernambuco, Alagoas, Paraiba, RN
  { city: 'Recife', state: 'PE', region: 'Nordeste', baseCepPrefix: '500' },
  { city: 'Maceió', state: 'AL', region: 'Nordeste', baseCepPrefix: '570' },
  { city: 'Natal', state: 'RN', region: 'Nordeste', baseCepPrefix: '590' },

  // Regiao 6: Ceara, Piaui, Maranhao, Para, Amazonas, Acre, Amapa, Roraima
  { city: 'Fortaleza', state: 'CE', region: 'Nordeste', baseCepPrefix: '600' },
  { city: 'Belém', state: 'PA', region: 'Norte', baseCepPrefix: '660' },
  { city: 'Manaus', state: 'AM', region: 'Norte', baseCepPrefix: '690' },

  // Regiao 7: Distrito Federal, Goias, Tocantins, Rondonia
  { city: 'Brasília', state: 'DF', region: 'Centro-Oeste', baseCepPrefix: '700' },
  { city: 'Goiânia', state: 'GO', region: 'Centro-Oeste', baseCepPrefix: '740' },
  { city: 'Palmas', state: 'TO', region: 'Norte', baseCepPrefix: '770' },

  // Regiao 8: Parana e Santa Catarina
  { city: 'Curitiba', state: 'PR', region: 'Sul', baseCepPrefix: '800' },
  { city: 'Londrina', state: 'PR', region: 'Sul', baseCepPrefix: '860' },
  { city: 'Florianópolis', state: 'SC', region: 'Sul', baseCepPrefix: '880' },

  // Regiao 9: Rio Grande do Sul
  { city: 'Porto Alegre', state: 'RS', region: 'Sul', baseCepPrefix: '900' },
  { city: 'Caxias do Sul', state: 'RS', region: 'Sul', baseCepPrefix: '950' },
  { city: 'Pelotas', state: 'RS', region: 'Sul', baseCepPrefix: '960' },
]

const NAMES = [
  'Ana Carolina Silva',
  'Carlos Eduardo Souza',
  'Beatriz Mendes',
  'Lucas Ferreira Lima',
  'Juliana Ramos',
  'Rodrigo Alcantara',
  'Mariana Guimarães',
  'Gabriel Barbosa',
  'Larissa Monteiro',
  'Felipe Nogueira',
  'Camila Rocha',
  'Thiago Siqueira',
  'Fernanda Dantas',
  'Vinícius Albuquerque',
  'Priscila Vasconcelos',
  'Diego Castelo',
]

const PRIORITIES: PriorityLevel[] = ['Econômica', 'Padrão', 'Expressa (Sedex)', 'Sedex 10']

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * Gera um lote de encomendas realistas com CEPs de 8 digitos.
 */
export function generateMockPackages(
  count: number = 12,
  distribution: 'random' | 'almost-sorted' | 'reversed' | 'duplicates' = 'random'
): Package[] {
  const result: Package[] = []

  for (let i = 0; i < count; i++) {
    const cityInfo = BRAZILIAN_CITIES[Math.floor(Math.random() * BRAZILIAN_CITIES.length)]
    const recipient = NAMES[Math.floor(Math.random() * NAMES.length)]
    const priority = PRIORITIES[Math.floor(Math.random() * PRIORITIES.length)]

    // Gerar sufixo de 5 digitos aleatorios
    const suffix = String(getRandomInt(0, 99999)).padStart(5, '0')
    const fullCep = (cityInfo.baseCepPrefix + suffix).slice(0, 8).padEnd(8, '0')

    const trackingNum = String(getRandomInt(100000000, 999999999))
    const prefix = priority.includes('Sedex') ? 'SL' : 'NL'

    result.push({
      id: `PKG-${1000 + i}`,
      trackingCode: `${prefix}${trackingNum}BR`,
      cep: fullCep,
      recipient,
      city: cityInfo.city,
      state: cityInfo.state,
      region: cityInfo.region,
      weightKg: Number((Math.random() * 8 + 0.2).toFixed(2)),
      priority,
      value: Number((Math.random() * 450 + 35).toFixed(2)),
    })
  }

  if (distribution === 'almost-sorted') {
    result.sort((a, b) => a.cep.localeCompare(b.cep))
    // Troca 1 ou 2 pares aleatorios
    for (let k = 0; k < Math.min(3, Math.floor(count / 3)); k++) {
      const idx1 = getRandomInt(0, count - 1)
      const idx2 = getRandomInt(0, count - 1)
      const temp = result[idx1]
      result[idx1] = result[idx2]
      result[idx2] = temp
    }
  } else if (distribution === 'reversed') {
    result.sort((a, b) => b.cep.localeCompare(a.cep))
  } else if (distribution === 'duplicates') {
    // Replica alguns CEPs
    if (result.length > 4) {
      const commonCep = result[0].cep
      result[2].cep = commonCep
      if (result.length > 5) result[5].cep = commonCep
    }
  }

  return result
}

/**
 * Lote padrao inicial (12 encomendas balanceadas e diversificadas)
 */
export const DEFAULT_PACKAGES: Package[] = [
  {
    id: 'PKG-1001',
    trackingCode: 'SL482910291BR',
    cep: '70910900', // UnB - Asa Norte, Brasilia DF
    recipient: 'Danilo Barros',
    city: 'Brasília',
    state: 'DF',
    region: 'Centro-Oeste',
    weightKg: 1.25,
    priority: 'Sedex 10',
    value: 189.9,
  },
  {
    id: 'PKG-1002',
    trackingCode: 'NL192840192BR',
    cep: '01310100', // Av. Paulista, Sao Paulo SP
    recipient: 'Beatriz Mendes',
    city: 'São Paulo',
    state: 'SP',
    region: 'Sudeste',
    weightKg: 0.85,
    priority: 'Expressa (Sedex)',
    value: 95.0,
  },
  {
    id: 'PKG-1003',
    trackingCode: 'NL847291039BR',
    cep: '90010190', // Centro Historico, Porto Alegre RS
    recipient: 'Carlos Eduardo Souza',
    city: 'Porto Alegre',
    state: 'RS',
    region: 'Sul',
    weightKg: 3.4,
    priority: 'Padrão',
    value: 230.5,
  },
  {
    id: 'PKG-1004',
    trackingCode: 'SL991823712BR',
    cep: '20040002', // Centro, Rio de Janeiro RJ
    recipient: 'Juliana Ramos',
    city: 'Rio de Janeiro',
    state: 'RJ',
    region: 'Sudeste',
    weightKg: 2.1,
    priority: 'Expressa (Sedex)',
    value: 320.0,
  },
  {
    id: 'PKG-1005',
    trackingCode: 'NL394810293BR',
    cep: '40020000', // Pelourinho, Salvador BA
    recipient: 'Rodrigo Alcantara',
    city: 'Salvador',
    state: 'BA',
    region: 'Nordeste',
    weightKg: 0.45,
    priority: 'Econômica',
    value: 45.0,
  },
  {
    id: 'PKG-1006',
    trackingCode: 'NL551928301BR',
    cep: '69005010', // Centro, Manaus AM
    recipient: 'Larissa Monteiro',
    city: 'Manaus',
    state: 'AM',
    region: 'Norte',
    weightKg: 4.8,
    priority: 'Padrão',
    value: 410.0,
  },
  {
    id: 'PKG-1007',
    trackingCode: 'SL772819201BR',
    cep: '30130100', // Savassi, Belo Horizonte MG
    recipient: 'Lucas Ferreira Lima',
    city: 'Belo Horizonte',
    state: 'MG',
    region: 'Sudeste',
    weightKg: 1.1,
    priority: 'Sedex 10',
    value: 155.0,
  },
  {
    id: 'PKG-1008',
    trackingCode: 'NL661928374BR',
    cep: '80020010', // Batel, Curitiba PR
    recipient: 'Mariana Guimarães',
    city: 'Curitiba',
    state: 'PR',
    region: 'Sul',
    weightKg: 0.6,
    priority: 'Expressa (Sedex)',
    value: 88.0,
  },
  {
    id: 'PKG-1009',
    trackingCode: 'NL229182736BR',
    cep: '50030230', // Recife Antigo, Recife PE
    recipient: 'Felipe Nogueira',
    city: 'Recife',
    state: 'PE',
    region: 'Nordeste',
    weightKg: 2.7,
    priority: 'Econômica',
    value: 140.0,
  },
  {
    id: 'PKG-1010',
    trackingCode: 'SL339182746BR',
    cep: '60060370', // Meireles, Fortaleza CE
    recipient: 'Camila Rocha',
    city: 'Fortaleza',
    state: 'CE',
    region: 'Nordeste',
    weightKg: 1.9,
    priority: 'Expressa (Sedex)',
    value: 275.0,
  },
  {
    id: 'PKG-1011',
    trackingCode: 'NL449182736BR',
    cep: '74013010', // Setor Central, Goiânia GO
    recipient: 'Thiago Siqueira',
    city: 'Goiânia',
    state: 'GO',
    region: 'Centro-Oeste',
    weightKg: 3.2,
    priority: 'Padrão',
    value: 199.0,
  },
  {
    id: 'PKG-1012',
    trackingCode: 'SL119283746BR',
    cep: '88010400', // Centro, Florianópolis SC
    recipient: 'Fernanda Dantas',
    city: 'Florianópolis',
    state: 'SC',
    region: 'Sul',
    weightKg: 0.75,
    priority: 'Sedex 10',
    value: 360.0,
  },
]