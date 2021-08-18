import { useQuery } from 'react-query'
import axios from 'axios'
import { POSTS } from '../types'

export const useQuerySearchPost = (title: string) => {
  return useQuery(['posts/sort', title], () => {
    return axios.get<POSTS>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/?title=${title}`
    )
  })
}
