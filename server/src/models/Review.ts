import mongoose, { Schema, Document } from 'mongoose'

export interface IReview extends Document {
  productId: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  rating: 1 | 2 | 3 | 4 | 5
  comment: string
  verifiedPurchase: boolean
  createdAt: Date
}

const ReviewSchema = new Schema<IReview>(
  {
    productId:        { type: Schema.Types.ObjectId, ref: 'Product', required: true, index: true },
    userId:           { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating:           { type: Number, required: true, min: 1, max: 5 },
    comment:          { type: String, required: true, trim: true, maxlength: 2000 },
    verifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// One review per user per product
ReviewSchema.index({ productId: 1, userId: 1 }, { unique: true })

export default mongoose.model<IReview>('Review', ReviewSchema)
