import { Request, Response } from 'express'
import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'
import { productsTable } from 'db/schema/products'
import { formatValidationError } from 'utils'
import { Product } from 'utils/types'
import { db } from 'db'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable)
    return res.status(200).json({
      status: 200,
      message: 'All products fetched successfully',
      data: products,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
    })
  }
}

export const getProductDetails = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id)
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID.',
      })
    }
    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))

    return res.status(200).json({
      status: 200,
      message: 'Product details fetched successfully',
      data: product,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productDetails: Product = req.body
    const productCreateSchema = createInsertSchema(productsTable)

    const parsed = productCreateSchema.parse(productDetails)
    const product = await db
      .insert(productsTable)
      .values(productDetails)
      .returning()

    return res.status(201).json({
      success: true,
      data: product,
      message: 'Product Created Successfully',
    })
  } catch (error) {
    if (error.name === 'ZodError') {
      const errorMessage = formatValidationError(error)
      return res.status(400).json({
        success: false,
        message: errorMessage,
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
    })
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id)
    const updatedData = req.body
    const productUpdateSchema = createInsertSchema(productsTable)
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID.',
      })
    }

    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))
    if (!product.length) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      })
    }

    const parsed = productUpdateSchema.parse(updatedData)

    const updatedProduct = await db
      .update(productsTable)
      .set(updatedData)
      .where(eq(productsTable.id, productId))
      .returning()

    return res.status(200).json({
      success: true,
      message: 'Product Updated Successfully',
      data: updatedProduct,
    })
  } catch (error) {
    if (error.name === 'ZodError') {
      const errorMessage = formatValidationError(error)
      return res.status(400).json({
        success: false,
        message: errorMessage,
      })
    }
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error,
    })
  }
}

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id)
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: 'Invalid Product ID.',
      })
    }
    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))

    if (!product.length) {
      return res.status(404).json({
        success: false,
        message: 'Product does not exist.',
      })
    }

    const deletedProduct = await db
      .delete(productsTable)
      .where(eq(productsTable.id, productId))

    return res.status(200).json({
      success: true,
      message: 'Product Deleted Successfully',
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
