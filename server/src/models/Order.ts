import mongoose, { Schema, Document } from 'mongoose'

export interface IDownloadToken {
  productId: mongoose.Types.ObjectId
  token: string
  expiresAt: Date
  usedCount: number
}

export interface IOrder extends Document {
  buyerId: mongoose.Types.ObjectId
  items: {
    productId: mongoose.Types.ObjectId
    price: number
    sellerId: mongoose.Types.ObjectId
  }[]
  totalAmount: number
  stripePaymentIntentId?: string
  stripeSessionId?: string
  status: 'pending' | 'paid' | 'refunded' | 'failed'
  downloadTokens: IDownloadToken[]
  createdAt: Date
}

const OrderSchema = new Schema<IOrder>(
  {
    buyerId:    { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        price:     { type: Number, required: true },
        sellerId:  { type: Schema.Types.ObjectId, ref: 'User', required: true },
      },
    ],
    totalAmount:             { type: Number, required: true },
    stripePaymentIntentId:   { type: String },
    stripeSessionId:         { type: String },
    status: { type: String, enum: ['pending', 'paid', 'refunded', 'failed'], default: 'pending' },
    downloadTokens: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        token:     { type: String },
        expiresAt: { type: Date },
        usedCount: { type: Number, default: 0 },
      },
    ],
  },
  { timestamps: true }
)

export default mongoose.model<IOrder>('Order', OrderSchema)
