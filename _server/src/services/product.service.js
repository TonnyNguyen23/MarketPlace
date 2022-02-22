import createError from 'http-errors'
import { Product } from '../models'

/**
 * Create product
 * @param {Object} body
 * @returns {Promise<product>}
 */
const createProduct = async productBody => {
  let newProduct = await Product.create(productBody)
  newProduct = Product.populate(newProduct, 'user')
  return newProduct
}

/**
 * Get products by query(filter, options)
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<products>}
 */
const queryProducts = async (filter, options) => {
  const customLabels = {
    docs: 'products',
    page: 'page',
    totalPages: 'totalPages',
    limit: 'limit',
    totalDocs: 'totalProducts',
  }
  options = { ...options, customLabels }
  const products = await Product.paginate(filter, options)
  return products
}

/**
 * Find product by id
 * @param {ObjectId} productId
 * @returns {Promise<product>}
 */
const getProductById = async productId => {
  const product = await Product.findById(productId)
  return product
}

/**
 * Find product by id
 * @param {String} productAddress
 * @returns {Promise<product>}
 */
const getProductByAddress = async productAddress => {
  const product = await Product.findOne({ address: productAddress }).populate(
    'user'
  )
  return product
}

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} body
 * @returns {Promise<product>}
 */
const updateProductById = async (productId, body) => {
  const product = await getProductById(productId)

  if (!product) {
    throw createError.NotFound()
  }

  Object.assign(product, body)
  await product.save()
  return product
}

/**
 * Update product by id
 * @param {ObjectId} productId
 * @param {Object} body
 * @returns {Promise<product>}
 */
const updateProductByAddress = async (address, body) => {
  const product = await getProductByAddress(address)

  if (!product) {
    throw createError.NotFound()
  }

  Object.assign(product, body)
  let productUpdated = await product.save()
  productUpdated = Product.populate(product, 'user')
  return productUpdated
}

/**
 * Delte product by id
 * @param {ObjectId} productId
 * @returns {Promise<product>}
 */
const deleteProductById = async productId => {
  const product = await getProductById(productId)
  if (!product) {
    throw createError.NotFound()
  }
  const result = await product.remove()
  return result
}

export default {
  createProduct,
  queryProducts,
  getProductById,
  getProductByAddress,
  updateProductById,
  deleteProductById,
  updateProductByAddress,
}
