import { useQueryClient } from 'react-query'
import Cookie from 'universal-cookie'
import axios from 'axios'
import { UPDATE_LIKED } from '../types'

export const useMutateLiked = () => {
  const cookie = new Cookie()
  const token = cookie.get('token')
  const queryClient = useQueryClient()

  const togleLiked = async (liked: UPDATE_LIKED) => {
    const currentLiked = liked.current
    const uploadData = new FormData()
    let isOverlapped = false

    try {
      currentLiked.forEach((current) => {
        if (current === liked.new) {
          isOverlapped = true
        } else {
          uploadData.append('liked', current)
        }
      })

      if (!isOverlapped) {
        uploadData.append('liked', liked.new)
      } else if (currentLiked.length === 1) {
        uploadData.append('title', liked.title)
        uploadData.append('description', liked.description)

        await axios.put(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/${liked.id}/`,
          uploadData,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${token}`,
            },
          }
        )
        await queryClient.invalidateQueries('posts')
        await queryClient.invalidateQueries('posts/sort')
        await queryClient.invalidateQueries('myPost')
        await queryClient.invalidateQueries('myLikes')
        return false
      }
      await axios.patch(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/${liked.id}/`,
        uploadData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `JWT ${token}`,
          },
        }
      )
      await queryClient.invalidateQueries('posts')
      await queryClient.invalidateQueries('posts/sort')
      await queryClient.invalidateQueries('myPost')
      await queryClient.invalidateQueries('myLikes')
    } catch {
      alert('エラー')
    }
  }
  return { togleLiked }
}
