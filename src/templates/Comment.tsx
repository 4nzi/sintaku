import styled from 'styled-components'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { Button, AvatarMemo, Spacer } from '../components/index'
import { useQueryClient } from 'react-query'
import { useQueryComment } from '../hooks/useQueryComment'
import { useMutateComment } from '../hooks/useMutateComment'
import { useSelector, useDispatch } from 'react-redux'
import { selectMyProfile } from '../RTK/authSlice'
import { setOpenSignUp } from '../RTK/uiSlice'
import { PROFILE } from '../types'

/* --------------------- Style --------------------- */
const Wrapper = styled.div`
  border-top: 1px solid #444444;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 10px;
`
const Add = styled.div`
  display: flex;
  gap: 10px;
  > textarea {
    width: 100%;
    height: 70px;
    box-sizing: border-box;
    padding: 9px 14px;
    font-family: sans-serif;
    font-size: 15px;
    line-height: 18px;
    border: 1px solid #686868;
    border-radius: 2px;
    outline: none;
    box-shadow: none;
    resize: none;
  }
`
const AddButton = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`
const List = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  > p {
  }
`
/* ------------------------------------------------- */

const Comment: React.VFC = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const queryClient = useQueryClient()
  const { id } = router.query
  const profs = queryClient.getQueryData<PROFILE[]>('profs')
  const myProf = useSelector(selectMyProfile)
  const { data, isLoading } = useQueryComment(String(id))
  const { createCommentMutation } = useMutateComment()

  const [text, setText] = useState('')

  const textChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (myProf.nickName) {
      await createCommentMutation.mutateAsync({
        text: text,
        post: id as string,
      })
      setText('')
    } else {
      dispatch(setOpenSignUp())
    }
  }
  if (isLoading) return <></>
  return (
    <Wrapper>
      <p>{data?.length}件のコメント</p>
      <form onSubmit={submitHandler}>
        <Add>
          <AvatarMemo img={myProf?.img} size={35} />
          <textarea value={text} onChange={textChangeHandler} />
        </Add>
        {text && (
          <>
            <Spacer axis="vertical" size={10} />
            <AddButton>
              <Button type="button" onClick={() => setText('')}>
                キャンセル
              </Button>
              <Button sType="color" type="submit">
                コメント
              </Button>
            </AddButton>
          </>
        )}
      </form>
      {data
        .slice()
        .reverse()
        .map((comment) => (
          <List key={comment.id}>
            <AvatarMemo
              img={
                profs?.find((prof) => prof.userProfile === comment.userComment)
                  ?.img
              }
              size={30}
            />
            <div>
              <p>
                {
                  profs?.find(
                    (prof) => prof.userProfile === comment.userComment
                  )?.nickName
                }
              </p>
              <p>{comment.text}</p>
            </div>
          </List>
        ))}
    </Wrapper>
  )
}
export default Comment
