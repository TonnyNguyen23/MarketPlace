import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'
const createProduct = {
  name: yup.string().required(),
  price: yup.string().required(),
  address: yup.string().required(),
  productImage: yup.string(),
  user: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  openSale: yup.boolean().default(true),
}

const getProducts = {
  name: yup.string(),
  price: yup.string(),
  address: yup.string(),
  user: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  openSale: yup.boolean(),

  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getProduct = {
  productId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateProduct = {
  productId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  name: yup.string(),
  price: yup.string(),
  address: yup.string(),
  user: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect),
  openSale: yup.boolean(),
  checkbox_selection: yup
    .string()
    .when(['name', 'price', 'address', 'user', 'openSale'], {
      is: (name, price, address, user, openSale) =>
        !name && !price && !address && !user && !openSale,
      then: yup.string().required(),
    }),
}

const deleteProduct = {
  productId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export default {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
}
