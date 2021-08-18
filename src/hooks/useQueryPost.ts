import { useInfiniteQuery, useQuery } from 'react-query'
import axios from 'axios'
import { POSTS, POST } from '../types'
import Cookie from 'universal-cookie'

const cookie = new Cookie()

export const getPosts = async ({
  pageParam = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/?page=1`,
}) => {
  const { data } = await axios.get<POSTS>(pageParam)
  return data
}

export const getPost = async (id: string) => {
  const { data } = await axios.get<POST>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/${id}`
  )
  return data
}

export const getAllPostIds = async () => {
  const { data } = await axios.get<POSTS>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/`
  )
  return data.results.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    }
  })
}

export const getMyPosts = async ({
  pageParam = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/myposts/?page=1`,
}) => {
  const { data } = await axios.get<POSTS>(pageParam, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${cookie.get('token')}`,
    },
  })
  return data
}

export const getMyLikes = async ({
  pageParam = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/mylikes/?page=1`,
}) => {
  const { data } = await axios.get<POSTS>(pageParam, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `JWT ${cookie.get('token')}`,
    },
  })
  return data
}

export const useQueryPosts = () => {
  return useInfiniteQuery<POSTS, Error>({
    queryKey: 'posts',
    queryFn: getPosts,
    getNextPageParam: (lastPage, pages) => lastPage.next,
  })
}

export const useQuerySearchPost = (title: string) => {
  return useQuery(['posts/sort', title], () => {
    return axios.get<POSTS>(
      `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/posts/?title=${title}`
    )
  })
}

export const useQueryMyPosts = () => {
  return useInfiniteQuery<POSTS, Error>({
    queryKey: 'myPost',
    queryFn: getMyPosts,
    getNextPageParam: (lastPage, pages) => lastPage.next,
  })
}

export const useQueryMyLikes = () => {
  return useInfiniteQuery<POSTS, Error>({
    queryKey: 'myLikes',
    queryFn: getMyLikes,
    getNextPageParam: (lastPage, pages) => lastPage.next,
  })
}
