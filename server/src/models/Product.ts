import mongoose, { Schema, Document } from 'mongoose'

export type ProductCategory =
  | 'Website' | 'Mobile App' | 'Dashboard'
  | 'Landing Page' | 'E-Commerce' | 'Plugin'
  | 'API' | 'Full Stack' | 'Other'

export interface IProduct extends Document {
  title: string
  slug: string
  description: string
  sellerId: mongoose.Types.ObjectId
  price: number
  discountPrice?: number
  category: ProductCategory
  tags: string[]
  techStack: string[]
  previewImages: string[]
  previewUrl?: string
  fileKey: string         // Cloudinary/S3 private key
  version: string
  changelog?: string
  downloadCount: number
  salesCount: number
  rating: { average: number; count: number }
  status: 'draft' | 'published' | 'suspended'
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>(
  {
    title:          { type: String, required: true, trim: true, maxlength: 120 },
    slug:           { type: String, required: true, unique: true, lowercase: true, trim: true },
    description:    { type: String, required: true, maxlength: 5000 },
    sellerId:       { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    price:          { type: Number, required: true, min: 0 },
    discountPrice:  { type: Number, min: 0 },
    category:       { type: String, required: true, enum: ['Website','Mobile App','Dashboard','Landing Page','E-Commerce','Plugin','API','Full Stack','Other'] },
    tags:           [{ type: String, trim: true }],
    techStack:      [{ type: String, trim: true }],
    previewImages:  [{ type: String }],
    previewUrl:     { type: String },
    fileKey:        { type: String, required: true, select: false }, // hidden from public
    version:        { type: String, default: '1.0.0' },
    changelog:      { type: String },
    downloadCount:  { type: Number, default: 0 },
    salesCount:     { type: Number, default: 0 },
    rating:         { average: { type: Number, default: 0 }, count: { type: Number, default: 0 } },
    status:         { type: String, enum: ['draft', 'published', 'suspended'], default: 'draft' },
  },
  { timestamps: true }
)

// Indexes for search & filtering
ProductSchema.index({ title: 'text', description: 'text', tags: 'text' })
ProductSchema.index({ category: 1, status: 1 })
ProductSchema.index({ price: 1 })
ProductSchema.index({ 'rating.average': -1 })

export default mongoose.model<IProduct>('Product', ProductSchema)
