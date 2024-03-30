'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { persistor, store } from './store'

export default function MyProvider({
  children
}: {
  children: React.ReactNode
}) {

  return <Provider store={store}>{children}</Provider>
}