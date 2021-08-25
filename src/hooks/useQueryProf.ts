import { useQuery } from 'react-query'
import axios from 'axios'
import { PROFILE } from '../types'

export const getProfs = async () => {
  const { data } = await axios.get<PROFILE[]>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/profiles/`
  )
  return data
}

export const useQueryProfs = () => {
  return useQuery<PROFILE[], Error>({
    queryKey: 'profs',
    queryFn: getProfs,
  })
}
