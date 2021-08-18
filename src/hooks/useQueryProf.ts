import { useQuery } from 'react-query'
import axios from 'axios'
import { PROFILE } from '../types'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

export const getMyProf = async () => {
  const { data } = await axios.get<PROFILE>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/myprofile/`,
    {
      headers: {
        Authorization: `JWT ${cookie.get('token')}`,
      },
    }
  )
  return data[0]
}

export const getProfs = async () => {
  const { data } = await axios.get<PROFILE[]>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/profiles/`
  )
  return data
}

export const useQueryMyProf = () => {
  return useQuery<PROFILE, Error>({
    queryKey: 'myProf',
    queryFn: getMyProf,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    //cacheTime: 5000,
    //refetchInterval: 5000,
  })
}

export const useQueryProfs = () => {
  return useQuery<PROFILE[], Error>({
    queryKey: 'profs',
    queryFn: getProfs,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    //cacheTime: 5000,
    //refetchInterval: 5000,
  })
}
