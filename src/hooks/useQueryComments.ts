import { useQuery } from 'react-query'
import axios from 'axios'
import { COMMENT } from '../types'

export const getComments = async () => {
  const { data } = await axios.get<COMMENT[]>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comments/`
  )
  return data
}

export const useQueryComments = () => {
  return useQuery<COMMENT[], Error>({
    queryKey: 'comments',
    queryFn: getComments,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    //cacheTime: 5000,
    //refetchInterval: 5000,
  })
}
