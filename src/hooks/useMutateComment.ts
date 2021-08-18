import { useQueryClient, useMutation } from 'react-query'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { NEW_COMMENT, COMMENT } from '../types'

export const useMutateComment = () => {
  const cookie = new Cookie()
  const queryClient = useQueryClient()

  const createCommentMutation = useMutation(
    (newComment: NEW_COMMENT) =>
      axios.post<COMMENT>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/comments/`,
        newComment,
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
        queryClient.invalidateQueries('comments')
      },
      onError: () => {
        alert('投稿に失敗しました。')
      },
    }
  )
  return { createCommentMutation }
}
