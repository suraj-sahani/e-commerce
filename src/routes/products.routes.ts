import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from 'controllers/products.controller'
import { Router } from 'express'

const productsRouter = Router()

productsRouter.get('/', getAllProducts)
productsRouter.get('/:id', getProductDetails)
productsRouter.post('/', createProduct)
productsRouter.put('/:id', updateProduct)
productsRouter.delete('/:id', deleteProduct)

export default productsRouter
