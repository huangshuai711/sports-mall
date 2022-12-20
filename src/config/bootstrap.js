import store from '@/store'
import storage from 'store'
import { ACCESS_TOKEN, STORAGE_ACCOUNT } from '@/store/mutation-types'

export default function Initializer() {
  store.commit('SET_TOKEN', storage.get(ACCESS_TOKEN))
  store.commit(
    'SET_ACCOUNTARR',
    storage.get(STORAGE_ACCOUNT)
      ? JSON.parse(window.atob(decodeURIComponent(storage.get(STORAGE_ACCOUNT))))
      : []
  )
}
