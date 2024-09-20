export type Payment = {
  id: string
  amount: number
  status: 'pending' | 'processing' | 'success' | 'failed'
  email: string
}

export const Mocks: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: 'b67f98a1',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.com',
  },
  {
    id: 'c39b68fa',
    amount: 75,
    status: 'failed',
    email: 'jane.smith@example.com',
  },
  {
    id: 'd52f8a7b',
    amount: 300,
    status: 'processing',
    email: 'mark.jones@example.com',
  },
  {
    id: 'e83b4d3c',
    amount: 150,
    status: 'success',
    email: 'alice.williams@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: 'b67f98a1',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.com',
  },
  {
    id: 'c39b68fa',
    amount: 75,
    status: 'failed',
    email: 'jane.smith@example.com',
  },
  {
    id: 'd52f8a7b',
    amount: 300,
    status: 'processing',
    email: 'mark.jones@example.com',
  },
  {
    id: 'e83b4d3c',
    amount: 150,
    status: 'success',
    email: 'alice.williams@example.com',
  },
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: 'b67f98a1',
    amount: 250,
    status: 'success',
    email: 'john.doe@example.com',
  },
  {
    id: 'c39b68fa',
    amount: 75,
    status: 'failed',
    email: 'jane.smith@example.com',
  },
  {
    id: 'd52f8a7b',
    amount: 300,
    status: 'processing',
    email: 'mark.jones@example.com',
  },
  {
    id: 'e83b4d3c',
    amount: 150,
    status: 'success',
    email: 'alice.williams@example.com',
  },
]
