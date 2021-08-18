export interface AUTH {
  email: string
  password: string
}

export interface PROFILE {
  id: string
  nickName: string
  userProfile: string
  created_on: string
  img: string
}

export interface POST {
  id: string
  title: string
  description: string
  thum: string
  images?: Array<{
    id: number
    file: string
    caption?: string
    post: number
  }>
  created_at: string
  liked: Array<string>
  userPost: string
}

export interface POSTS {
  count: number
  next: string | null
  previous: string | null
  results: POST[]
}

export interface COMMENT {
  id: string
  text: string
  userComment: string
  post: string
}

export interface NEW_PROF {
  nickName: string
  img?: File | null
}

export interface UPDATE_PROF {
  id: string
  nickName: string
  img: File | null
}

export interface NEW_POST {
  title: string
  description: string
  thum: File | null
  images: File[]
}

export interface NEW_COMMENT {
  text: string
  post: string
}

export interface UPDATE_LIKED {
  id: string
  title: string
  description: string
  thum: string
  current: string[]
  new: string
}
