import { useState, useEffect } from 'react'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import {
  setIsAuthenticated,
  resetIsAuthenticated,
  selectIsAuthenticated,
} from '../RTK/uiSlice'

export const useAuthChecker = () => {
  const dispatch = useDispatch()
  const cookie = new Cookie()
  const token = cookie.get('token')

  const [isLoading, setLoading] = useState(true)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  const getIsAuthenticated = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/jwt/verify/`,
        {
          token: `${token}`,
        }
      )
      return true
    } catch (err) {
      return false
    }
  }

  useEffect(() => {
    getIsAuthenticated().then((auth) => {
      if (!auth) {
        dispatch(resetIsAuthenticated())
        console.log('not authention')
        setLoading(false)
      } else {
        dispatch(setIsAuthenticated())
        setLoading(false)
      }
    })
  }, [isAuthenticated])

  return {
    isLoading,
    isAuthenticated,
  }
}
