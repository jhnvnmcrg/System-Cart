import mongoose, { Schema, Document } from 'mongoose'
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
  name: string
  email: string
  passwordHash: string
  role: 'buyer' | 'seller' | 'admin'
  avatar?: string
  bio?: string
  stripeAccountId?: string
  purchasedProducts: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
  comparePassword(candidate: string): Promise<boolean>
}

const UserSchema = new Schema<IUser>(
  {
    name:             { type: String, required: true, trim: true, maxlength: 80 },
    email:            { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash:     { type: String, required: true, select: false },
    role:             { type: String, enum: ['buyer', 'seller', 'admin'], default: 'buyer' },
    avatar:           { type: String },
    bio:              { type: String, maxlength: 500 },
    stripeAccountId:  { type: String },
    purchasedProducts:[ { type: Schema.Types.ObjectId, ref: 'Product' } ],
  },
  { timestamps: true }
)

// Hash password before save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('passwordHash')) return next()
  this.passwordHash = await bcrypt.hash(this.passwordHash, 12)
  next()
})

UserSchema.methods.comparePassword = function (candidate: string): Promise<boolean> {
  return bcrypt.compare(candidate, this.passwordHash)
}

// Don't expose hash
UserSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash
    return ret
  },
})

export default mongoose.model<IUser>('User', UserSchema)
