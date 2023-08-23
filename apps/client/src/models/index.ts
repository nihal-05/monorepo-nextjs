import mongoose from 'mongoose'
// Define mongoose schemas
const userSchema = new mongoose.Schema({
  username: { type: String },
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
})

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
})

const createModel = (name: string, schema: any) => {
  if (mongoose.models[name]) {
    return mongoose.models[name]
  } else {
    return mongoose.model(name, schema)
  }
}

export const User = createModel('User', userSchema)
export const Admin = createModel('Admin', adminSchema)
export const Course = createModel('Course', courseSchema)
