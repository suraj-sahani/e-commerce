import { Request, Response } from 'express'

export const getAllProducts = (req: Request, res: Response) => {
  res.send('GET All Products')
}

export const getProductDetails = (req: Request, res: Response) => {
  res.send('GET Product Details.')
}

export const createProduct = (req: Request, res: Response) => {
  res.send('POST Create Product')
}

export const updateProduct = (req: Request, res: Response) => {
  res.send('PUT Update Product')
}

export const deleteProduct = (req: Request, res: Response) => {
  res.send('DELETE Delete Product')
}
