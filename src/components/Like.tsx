import styled from 'styled-components'
import { useMutateLiked } from '../hooks/useMutateLiked'
import { useSelector, useDispatch } from 'react-redux'
import { selectMyProfile } from '../RTK/authSlice'
import { setOpenSignUp } from '../RTK/uiSlice'

/* --------------------- Style --------------------- */
const Styled = styled.button<{ userLiked: boolean }>`
  display: flex;
  margin-left: auto;
  align-items: center;
  span {
    font-size: 1.3rem;
    padding-top: 2px;
    padding-left: 2px;
    margin-right: 2px;
    letter-spacing: 0em;
    cursor: pointer;
  }
  svg {
    color: #7e7e7e;
    cursor: pointer;
    color: ${(props) => props.userLiked && '#224aff'};
  }
`
/* ------------------------------------------------- */

interface PROPS {
  id: string
  title: string
  description: string
  liked: string[]
  thum: string
}

const Like: React.VFC<PROPS> = ({ id, title, liked, thum, description }) => {
  const dispatch = useDispatch()
  const { togleLiked } = useMutateLiked()
  const data = useSelector(selectMyProfile)
  let userLiked = false

  liked.forEach((current) => {
    if (current === data?.userProfile) {
      userLiked = true
    }
  })

  const likeHandler = async () => {
    if (data.nickName) {
      const packet = {
        id: id,
        title: title,
        description: description,
        thum: thum,
        current: liked,
        new: data.userProfile,
      }
      await togleLiked(packet)
    } else {
      dispatch(setOpenSignUp())
    }
  }

  return (
    <Styled userLiked={userLiked} onClick={likeHandler}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
        width="20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>{liked.length}</span>
    </Styled>
  )
}
export default Like
