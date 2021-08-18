import { useQueryClient, useMutation } from 'react-query'
import axios from 'axios'
import Cookie from 'universal-cookie'
import { NEW_POST } from '../types'

export const useMutatePost = () => {
  const cookie = new Cookie()
  const token = cookie.get('token')
  const queryClient = useQueryClient()

  /* POST */
  const newPost = async (newPost: NEW_POST) => {
    const uploadData = new FormData()
    uploadData.append('title', newPost.title)
    uploadData.append('description', newPost.description)
    uploadData.append('thum', newPost.thum, newPost.thum.name)

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        }
      )
      newPost.images.map(async (image) => {
        const uploadImage = new FormData()
        uploadImage.append('file', image)
        uploadImage.append('post', String(res.data.id))
        await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/images/`,
          uploadImage,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${token}`,
            },
          }
        )
      })
      await queryClient.invalidateQueries('posts')
      alert('作品を投稿しました')
    } catch {
      alert('投稿に失敗しました')
    }
  }

  /* DELETE */
  const deletePostMutation = useMutation(
    (id: string) =>
      axios.delete(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/${id}/`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `JWT ${token}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        queryClient.invalidateQueries('posts')
      },
      onError: () => {
        alert('削除に失敗しました。')
      },
    }
  )
  return { deletePostMutation, newPost }
}
