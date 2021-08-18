import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, Like } from '../components/index'
import { useQueryProfs } from '../hooks/useQueryProf'
import { POST } from '../types'

/* --------------------- Style --------------------- */
const StyledImage = styled(Image)`
  border-radius: 8px;
  object-fit: cover;
`
const Footer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
  > a {
    padding-top: 2px;
    font-size: 1.4rem;
    margin-left: 8px;
    color: #dbdbdb;
  }
  > .like {
    margin-left: auto;
  }
`
/* ------------------------------------------------- */

const Post: React.VFC<POST> = ({
  id,
  thum,
  title,
  userPost,
  liked,
  description,
}) => {
  const { data } = useQueryProfs()
  const postUser = data?.find((prof) => {
    return prof.userProfile === userPost
  })

  return (
    <>
      <Link
        href={{
          pathname: 'posts/[id]',
          query: { id: id },
        }}
      >
        <a>
          <StyledImage
            src={thum}
            width={500}
            height={500}
            priority={true}
            unoptimized={true}
          />
        </a>
      </Link>
      <Footer>
        <Avatar img={postUser?.img} size={24} />
        <Link
          href={{
            pathname: 'posts/[id]',
            query: { id: id },
          }}
        >
          <a>{title}</a>
        </Link>
        <div className="like">
          <Like
            id={id}
            title={title}
            liked={liked}
            thum={thum}
            description={description}
          />
        </div>
      </Footer>
    </>
  )
}
export default Post
