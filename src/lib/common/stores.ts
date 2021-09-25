import { writable } from 'svelte/store'
import { VITE_PUBLIC_APP_NAME } from '../env'

const appName = VITE_PUBLIC_APP_NAME

const userStore = (val) => {
  const { set, update, subscribe } = writable({
    username: '',
    authenticated: false,
    ...val
  })

  const updateUser = (user) => {
    update((u) => ({
      ...u,
      ...user
    }))
  }

  const setLoggedIn = (isLoggedIn) => {
    update((u) => ({
      ...u,
      isLoggedIn
    }))
  }

  const setUsername = (username) => {
    update((u) => ({
      ...u,
      username
    }))
  }

  const getId = () => {
    let id = ''
    subscribe((u) => {
      if (u && u.id) {
        id = u.id
      }
    })
    return id
  }

  const reset = () => {
    set(null)
  }

  return {
    subscribe,
    set,
    update,
    updateUser,
    setLoggedIn,
    setUsername,
    getId,
    reset
  }
}

const authStore = () => {
  const isLoggedIn = false
  const { set, update, subscribe } = writable({ isLoggedIn })

  const setLoggedIn = () => {
    // localStorage.setItem(`${appName}.isLoggedIn`, true)
    update((state) => ({
      ...state,
      isLoggedIn: true
    }))
  }

  const reset = () => {
    // localStorage.setItem(`${appName}.isLoggedIn`, false)
    update((state) => ({
      ...state,
      isLoggedIn: false
    }))
  }

  return {
    subscribe,
    update,
    set,
    setLoggedIn,
    reset
  }
}

const listStore = (val) => {
  const { set, update, subscribe } = writable(val)

  const addItem = (data) => {
    update((state) => [...state, data])
  }

  const updateItem = (data) => {
    update((state) => {
      return state.map((item) => {
        if (item.id === data.id) {
          item = data
        }
        return item
      })
    })
  }

  const getItem = (id) => {
    let item = {}
    subscribe((state) => {
      item = state.find((it) => it.id === id)
    })
    return item
  }

  const isEmpty = () => {
    let isNull = true
    subscribe((val) => {
      isNull = val.length < 1
    })
    return isNull
  }

  const reset = () => {
    set([])
  }

  return {
    set,
    update,
    subscribe,
    getItem,
    updateItem,
    addItem,
    isEmpty,
    reset
  }
}

export const user = userStore(null)
export const auth = authStore()
export const lists = listStore([])
