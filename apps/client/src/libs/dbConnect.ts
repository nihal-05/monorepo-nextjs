import mongoose from 'mongoose'

let isAlreadyConnected = false

export const dbConnect = async () => {
  if (isAlreadyConnected) return
  await mongoose.connect(process.env.MONGO_URL!)
}
