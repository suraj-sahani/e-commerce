export interface ValidationError extends Error {
  issues: {
    code: string
    expected: string
    received: string
    path: string[]
    message: string
  }[]
  name: string
}

export interface Product {
  name: string
  description?: string
  price: number
  image?: string
}
