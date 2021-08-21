import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { Input } from '..'
import { useSelector, useDispatch } from 'react-redux'
import {
  selectSearchQuery,
  setSearchQuery,
  resetOpenBurger,
} from '../../RTK/uiSlice'

const SearchInput: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const search = useSelector(selectSearchQuery)

  const changeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = e.currentTarget
      dispatch(setSearchQuery(value))
    },
    [dispatch]
  )

  // const clickHandler = useCallback(() => {
  //   void router.push(`/search/?keyword=${search}`)
  // }, [search, router])

  const KeyDownHandler = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        void router.push(`/search/?keyword=${search}`)
        dispatch(resetOpenBurger())
      }
    },
    [search, router, dispatch]
  )

  return (
    <>
      <Input
        placeholder="作品を検索"
        value={search}
        onChange={changeHandler}
        onKeyDown={KeyDownHandler}
      />
    </>
  )
}
export default SearchInput
