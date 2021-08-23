import { useQuery } from 'react-query'
import axios from 'axios'
import { COMMENT } from '../types'

export const useQueryComment = (post: string) => {
  return useQuery(['comments', post], () => {
    return axios.get<COMMENT[]>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comments/?post=${post}`
    )
  })
}
