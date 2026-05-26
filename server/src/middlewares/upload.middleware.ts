import multer from 'multer'
import path from 'path'
import { AppError } from '../utils/errors'

const storage = multer.memoryStorage()

const fileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const imageTypes = /jpeg|jpg|png|webp|gif/
  const zipTypes   = /zip|rar|7z|tar|gz/

  const ext = path.extname(file.originalname).toLowerCase().slice(1)

  if (file.fieldname === 'previewImages' && imageTypes.test(ext)) {
    cb(null, true)
  } else if (file.fieldname === 'productFile' && zipTypes.test(ext)) {
    cb(null, true)
  } else {
    cb(new AppError(`Invalid file type for field: ${file.fieldname}`, 400))
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 200 * 1024 * 1024, // 200 MB max
    files: 6,                    // 5 preview images + 1 product file
  },
})
