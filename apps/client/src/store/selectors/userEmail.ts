import { userState } from '../atoms/user'
import { selector } from 'recoil'

export const userEmailState = selector({
  key: 'userEmailState1',
  get: ({ get }) => {
    const state = get(userState)

    return state.userEmail
  },
})
