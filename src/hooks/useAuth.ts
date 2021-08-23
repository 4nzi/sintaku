import { useState } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { useQueryClient, useMutation } from 'react-query'
import { useDispatch } from 'react-redux'
import { useMutateProf } from './useMutateProf'
import {
  resetOpenSignUp,
  resetOpenSignIn,
  setIsAuthenticated,
  resetIsAuthenticated,
} from '../RTK/uiSlice'
import { AUTH } from '../types'

export const useAuth = () => {
  const dispatch = useDispatch()
  const cookie = new Cookie()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { createProfMutaion } = useMutateProf()

  const signInMutation = useMutation(
    (auth: AUTH) =>
      axios.post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/jwt/create/`, auth),
    {
      onSuccess: (res, variables) => {
        const options = { path: '/' }
        cookie.set('token', res.data.access, options)
        // データ更新
        queryClient.invalidateQueries('myProf')
      },
      onError: () => {
        alert('サインインに失敗しました。')
      },
    }
  )

  const signUpMutation = useMutation(
    (auth: AUTH) =>
      axios.post(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/register/`, auth),
    {
      onSuccess: (res, variables) => {},
      onError: () => {
        alert('サインアップに失敗しました。')
      },
    }
  )

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
    setLoading(true)
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
    setLoading(true)
    await signInMutation.mutateAsync({ email: email, password: password })
    setEmail('')
    setPassword('')
    dispatch(setIsAuthenticated())
    setLoading(false)
    dispatch(resetOpenSignIn())
  }

  const signoutSubmitHandler = async () => {
    cookie.remove('token')
    await queryClient.setQueriesData('myProf', '')
    dispatch(resetIsAuthenticated())
    await router.push('/')
  }

  return {
    email,
    password,
    isLoading,
    emailChangeHandler,
    passChangeHandler,
    signupSubmitHandler,
    signinSubmitHandler,
    signoutSubmitHandler,
  }
}
