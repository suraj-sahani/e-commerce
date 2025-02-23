import { Request, Response } from 'express'
import { eq } from 'drizzle-orm'
import { productsTable } from 'db/schema/products'
import { Product } from 'utils/types'
import { db } from 'db'

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await db.select().from(productsTable)
    res.status(200).json({
      status: 200,
      message: 'All products fetched successfully',
      data: products,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
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
      res.status(400).json({
        success: false,
        message: 'Invalid Product ID.',
      })
      return // Stop further execution of controller.
    }
    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))

    res.status(200).json({
      status: 200,
      message: 'Product details fetched successfully',
      data: product,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productDetails: Product = req.body
    const product = await db
      .insert(productsTable)
      .values(productDetails)
      .returning()

    res.status(201).json({
      success: true,
      data: product,
      message: 'Product Created Successfully',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
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

    if (!productId) {
      res.status(400).json({
        success: false,
        message: 'Invalid Product ID.',
      })
      return // Stop further execution of controller.
    }

    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))
    if (!product.length) {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      })
      return // Stop further execution of controller.
    }

    const updatedProduct = await db
      .update(productsTable)
      .set(updatedData)
      .where(eq(productsTable.id, productId))
      .returning()

    res.status(200).json({
      success: true,
      message: 'Product Updated Successfully',
      data: updatedProduct,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
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
      res.status(400).json({
        success: false,
        message: 'Invalid Product ID.',
      })
      return // Stop further execution of controller.
    }

    const product = await db
      .select()
      .from(productsTable)
      .where(eq(productsTable.id, productId))

    if (!product.length) {
      res.status(404).json({
        success: false,
        message: 'Product does not exist.',
      })
      return // Stop further execution of controller.
    }

    const deletedProduct = await db
      .delete(productsTable)
      .where(eq(productsTable.id, productId))

    res.status(204).json({
      success: true,
      message: 'Product Deleted Successfully',
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    })
  }
}
