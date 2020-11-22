import React, { createContext, useReducer, useContext, ReactElement, Dispatch, useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { InitialStates, DispatchState } from './constants'
import {isEqual} from 'lodash'
const GlobalContext = createContext(InitialStates)
const DispatchContext = createContext(DispatchState)

export const GLOBAL_LOADER = 'globalLoader'
export interface GlobalStateProviderProps {
  children: ReactElement
}
export const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

export const useDeepEffect = (func: Function, dependencies: Array<Object>) => {
  const isFirst = useRef(true)
  const prevDeps = useRef(dependencies)

  useEffect(() => {
    const isSame = prevDeps.current.every((obj, index) => isEqual(obj, dependencies[index]))
    if(isFirst.current || !isSame){
      func()
    }
    isFirst.current = false
    prevDeps.current = dependencies
  }, dependencies)
}
export const GlobalStateProvider = (props: GlobalStateProviderProps) => {
  const { children } = props
  const [state, dispatch] = useReducer(
    (state: any, newValue: any) => {
      return ({ ...state, ...newValue })
    },
    InitialStates
  )
  return (
    <GlobalContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </GlobalContext.Provider>
  )
}


export function useGlobalState<Type>(k: string, v?: Type): [Type, Dispatch<Type>] {
  const [state, dispatch] = [
    useContext(GlobalContext),
    useContext(DispatchContext)
  ]
  const setState = (key: string, value: Type) => {
    dispatch && dispatch({
      ...state, [key]: value
    })
  }
  const val: Type = (state as any)[k] || v
  const [localState, setLocalState] = useState(val)
  useDeepEffect(() => {
    setState(k, localState)
  }, [localState])

  return [
    val,
    setLocalState
  ]
}
