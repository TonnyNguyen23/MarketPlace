import createError from 'http-errors'
import pick from '../utils/pick'
import catchAsync from '../utils/catchAsync'
import { productService, uploadService } from '../services'
import { tranSuccess } from '../../lang/en'

/**
 * Create a product
 * @POST api/v1/products/
 * @access private
 */
const createProduct = catchAsync(async (req, res) => {
  let productBody = { ...req.body, user: req.user._id }
  if (req.file) {
    const url = await uploadService.uploadProductImage(req.file.path)
    productBody = { ...productBody, image: url }
  }
  const product = await productService.createProduct(productBody)
  res.send(product)
})

/**
 * Get all products
 * @GET api/v1/products
 * @access public
 */
const getProducts = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['firstName', 'lastName', 'role', 'email'])
  let options = pick(req.query, ['sort', 'select', 'sortBy', 'limit', 'page'])
  const result = await productService.queryProducts(filter, options)
  res.send(result)
})

/**
 * Get a product by product id
 * @GET api/v1/products/:productId
 * @access public
 */
const getProductByAddress = catchAsync(async (req, res) => {
  const product = await productService.getProductByAddress(req.params.address)
  res.status(200).json(product)
})

/**
 * Get a product by product id
 * @GET api/v1/products/:productId
 * @access public
 */
const getProduct = catchAsync(async (req, res) => {
  const product =
    (await productService.getProductById(req.params.productId)) ||
    res.status(200).json({ product })
})

/**
 * Update a product by productId
 * @PATCH api/v1/products/:productId
 * @access private
 */
const updateProduct = catchAsync(async (req, res) => {
  const productUpdated = await productService.updateProductById(
    req.params.productId,
    req.body
  )
  res.status(200).json({ productUpdated, message: tranSuccess.updated_success })
})

/**
 * Update a product by productId
 * @PATCH api/v1/products/:productId
 * @access private
 */
const updateProductByAddress = catchAsync(async (req, res) => {
  const productUpdated = await productService.updateProductByAddress(
    req.params.address,
    req.body
  )
  res.status(200).send(productUpdated)
})

/**
 * Delete product by productId
 * @DELETE api/v1/products/:productId
 * @access private
 */
const deleteProduct = catchAsync(async (req, res) => {
  await productService.deleteProductById(req.params.productId)
  res.status(200).json({ message: tranSuccess.deleted_success('product') })
})

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  updateProductByAddress,
  deleteProduct,
  getProductByAddress,
}
