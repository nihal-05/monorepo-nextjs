import { ICourse } from 'interfaces'
import { atom } from 'recoil'

const initialState: Partial<ICourse> = {
  description: '',
  price: 0,
  published: false,
  title: '',
}

export const courseState = atom({
  key: 'courseState',
  default: {
    isLoading: true,
    course: initialState,
  },
})
