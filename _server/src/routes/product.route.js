import { Router } from 'express'
const router = new Router()
import validate from '../middlewares/validate'
import { productValidation } from '../validations'

import { productController } from '../controllers'
import uploadStorage from '../middlewares/uploadStorage'
import upload from '../middlewares/upload'
import protect from '../middlewares/auth'

router
  .route('/')
  .post(
    protect,
    uploadStorage.single('productImage'),
    upload,
    productController.createProduct
  )
  .get(productController.getProducts)

router.get('/address/:address', productController.getProductByAddress)
router.patch('/address/:address', productController.updateProductByAddress)

router
  .route('/:productId')
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct)

export default router
