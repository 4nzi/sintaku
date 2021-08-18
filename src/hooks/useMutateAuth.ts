import { useQueryClient, useMutation } from 'react-query'
import { useRouter } from 'next/router'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { AUTH } from '../types'
import { useDispatch } from 'react-redux'
import { resetIsAuthenticated } from '../RTK/uiSlice'

export const useMutateAuth = () => {
  const dispatch = useDispatch()
  const cookie = new Cookie()
  const queryClient = useQueryClient()
  const router = useRouter()

  /* SIGN UP */
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

  /* SIGN IN */
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

  /* SIGN OUT */
  const signout = async () => {
    cookie.remove('token')
    dispatch(resetIsAuthenticated())
    queryClient.setQueriesData('myProf', '')
    router.push('/')
  }

  return { signInMutation, signUpMutation, signout }
}
