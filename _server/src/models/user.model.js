import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { roles } from '../config/roles'
import { transValidations } from '../../lang/en'
import toJSON from './plugins/toJson'
import paginate from './plugins/paginate'

const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      index: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      match: [passwordRegex, transValidations.password_incorrect],
    },
    role: {
      type: String,
      enum: roles,
      default: 'user',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(doc, ret) {
        delete ret.password
        return ret
      },
    },
  }
)

userSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8)
  }
  next()
})

userSchema.methods = {
  /**
   * Check if password matches the user's password
   * @param {string} password
   * @returns {Promise<boolean>}
   */
  async isPasswordMatch(password) {
    return bcrypt.compare(password, this.password)
  },
}

// add plugin that converts mongoose to json
userSchema.plugin(toJSON)
userSchema.plugin(paginate)

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema)

export default User
