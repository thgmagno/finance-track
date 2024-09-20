export type Payment = {
  id: string
  date: string
  description: string
  amount: number
  status: 'open' | 'close' | 'overdue'
  category: string
}

export const Mocks: Payment[] = [
  {
    id: '728ed52f',
    date: '2024-8',
    description: 'Compra supermercado',
    amount: 150,
    status: 'open',
    category: 'Alimentação',
  },
  {
    id: 'a58b4c7d',
    date: '2024-9',
    description: 'Manutenção carro',
    amount: 500,
    status: 'close',
    category: 'Transporte',
  },
  {
    id: 'd913b94a',
    date: '2023-12',
    description: 'Mensalidade academia',
    amount: 100,
    status: 'open',
    category: 'Saúde',
  },
  {
    id: 'f85c1e92',
    date: '2023-7',
    description: 'Aluguel apartamento',
    amount: 1200,
    status: 'overdue',
    category: 'Moradia',
  },
  {
    id: '3a6f2d3c',
    date: '2024-1',
    description: 'Assinatura streaming',
    amount: 50,
    status: 'open',
    category: 'Entretenimento',
  },
  {
    id: '9f47d1e7',
    date: '2024-5',
    description: 'Curso online',
    amount: 300,
    status: 'close',
    category: 'Educação',
  },
  {
    id: 'e6b9d4f1',
    date: '2023-11',
    description: 'Compra de roupas',
    amount: 200,
    status: 'open',
    category: 'Vestuário',
  },
  {
    id: 'c27f8b19',
    date: '2023-10',
    description: 'Consulta médica',
    amount: 250,
    status: 'overdue',
    category: 'Saúde',
  },
  {
    id: 'b34e7c21',
    date: '2024-6',
    description: 'Viagem de férias',
    amount: 2500,
    status: 'close',
    category: 'Lazer',
  },
  {
    id: '7d6f1c9e',
    date: '2023-9',
    description: 'Conserto eletrônicos',
    amount: 400,
    status: 'open',
    category: 'Tecnologia',
  },
]
