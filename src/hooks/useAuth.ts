import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutateAuth } from './useMutateAuth'
import { useMutateProf } from './useMutateProf'
import {
  resetOpenSignUp,
  resetOpenSignIn,
  setIsAuthenticated,
} from '../RTK/uiSlice'

export const useAuth = () => {
  const dispatch = useDispatch()
  const { signInMutation, signUpMutation } = useMutateAuth()
  const { createProfMutaion } = useMutateProf()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setLoading] = useState(false)

  const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const passChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const signupSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signUpMutation.mutateAsync({ email: email, password: password })
    await signInMutation.mutateAsync({ email: email, password: password })
    await createProfMutaion.mutateAsync()
    setEmail('')
    setPassword('')
    dispatch(setIsAuthenticated())
    setLoading(false)
    dispatch(resetOpenSignUp())
  }

  const signinSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await signInMutation.mutateAsync({ email: email, password: password })
    setEmail('')
    setPassword('')
    dispatch(setIsAuthenticated())
    setLoading(false)
    dispatch(resetOpenSignIn())
  }

  return {
    email,
    password,
    isLoading,
    emailChangeHandler,
    passChangeHandler,
    signupSubmitHandler,
    signinSubmitHandler,
  }
}
