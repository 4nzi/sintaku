import { useState, useEffect } from 'react'
import Cookie from 'universal-cookie'
import { useDispatch } from 'react-redux'
import { fetchAsyncGetMyProf } from '../RTK/authSlice'

export const useAuthChecker = () => {
  const dispatch = useDispatch()
  const cookie = new Cookie()
  const token = cookie.get('token')

  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMyProf = async () => {
      if (token) {
        dispatch(fetchAsyncGetMyProf())
      } else console.log('Unauthenticated ')
    }
    fetchMyProf()
  }, [token, dispatch])

  return {
    isLoading,
  }
}
