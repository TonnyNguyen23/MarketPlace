import mongoose, { Schema } from 'mongoose'
import toJSON from './plugins/toJson'
import paginate from './plugins/paginate'

const productSchema = new Schema(
  {
    address: {
      type: String,
      index: true,
      require: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      trim: true,
    },
    price: Number,
    openSale: {
      type: Boolean,
      default: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

// add plugin that converts mongoose to json
productSchema.plugin(toJSON)
productSchema.plugin(paginate)

/**
 * @typedef Product
 */
const Product = mongoose.model('Product', productSchema)

export default Product
