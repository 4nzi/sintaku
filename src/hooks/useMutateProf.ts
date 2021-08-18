import { useQueryClient, useMutation } from 'react-query'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { PROFILE, UPDATE_PROF } from '../types'

export const useMutateProf = () => {
  const cookie = new Cookie()
  const queryClient = useQueryClient()

  const createProfMutaion = useMutation(
    () =>
      axios.post<PROFILE>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/profiles/`,
        {
          nickName: 'anonymous',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${cookie.get('token')}`,
          },
        }
      ),
    {
      onSuccess: (res, variables) => {
        // データ更新
        queryClient.invalidateQueries('myProf')
        queryClient.invalidateQueries('Profs')
      },
      onError: () => {
        alert('プロフィールの作成に失敗しました。')
      },
    }
  )

  const updateProf = async (prof: UPDATE_PROF) => {
    const uploadData = new FormData()
    uploadData.append('nickName', prof.nickName)
    prof.img && uploadData.append('img', prof.img, prof.img.name)
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/profiles/${prof.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${cookie.get('token')}`,
          },
        }
      )
      await queryClient.invalidateQueries('myProf')
    } catch {
      alert('変更に失敗しました。')
    }
  }
  return { createProfMutaion, updateProf }
}
