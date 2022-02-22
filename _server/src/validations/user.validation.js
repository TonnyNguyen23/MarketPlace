import * as yup from 'yup'
import { transValidations } from '../../lang/en'
import config from './config.validation'
const createUser = {
  name: yup.string().required(),
  address: yup.string().required(),
  password: yup
    .string()
    .matches(config.regexPassword, transValidations.password_incorrect)
    .required(),
}

const getUsers = {
  name: yup.string(),
  address: yup.string(),
  role: yup.string(),
  page: yup.number().integer(),
  limit: yup.number().integer(),
  sortBy: yup.string(),
  select: yup.string(),
}

const getUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

const updateUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
  name: yup.string(),
  address: yup.string(),
  checkbox_selection: yup.string().when(['name', 'address'], {
    is: (name, addressl) => !name && !address,
    then: yup.string().required(),
  }),
}

const deleteUser = {
  userId: yup
    .string()
    .matches(config.regexObjectId, transValidations.objectId_type_incorrect)
    .required(),
}

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
}
