import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductDetails,
  updateProduct,
} from 'controllers/products.controller'
import { Router } from 'express'
import { createInsertSchema, createUpdateSchema } from 'drizzle-zod'
import { productsTable } from 'db/schema/products'
import { validateDataMiddleware } from 'middleware/validateData.middleware'

const productsRouter = Router()

const productCreateSchema = createInsertSchema(productsTable)
const productUpdateSchema = createUpdateSchema(productsTable)

productsRouter.get('/', getAllProducts)
productsRouter.get('/:id', getProductDetails)
productsRouter.post(
  '/',
  validateDataMiddleware(productCreateSchema),
  createProduct
)
productsRouter.put(
  '/:id',
  validateDataMiddleware(productUpdateSchema),
  updateProduct
)
productsRouter.delete('/:id', deleteProduct)

export default productsRouter
