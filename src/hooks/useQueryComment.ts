import { useQuery } from 'react-query'
import axios from 'axios'
import { COMMENT } from '../types'

export const useQueryComment = (post: string) => {
  return useQuery({
    queryKey: ['comments', post],
    queryFn: async () => {
      const { data } = await axios.get<COMMENT[]>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comments/?post=${post}`
      )
      return data
    },
    staleTime: Infinity,
  })
}
