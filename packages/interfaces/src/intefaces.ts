export interface IAuthRequest {
  email: string
  password: string
}

export interface ICourse {
  _id?: string
  title: string
  description: string
  price: number
  imageLink: string
  published: boolean
}
