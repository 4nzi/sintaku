import { memo } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { AvatarMemo, Like } from '../components/index'
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

interface PROPS extends POST {
  img?: string
}

const Post: React.VFC<PROPS> = ({
  id,
  thum,
  title,
  liked,
  description,
  img,
}) => {
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
        <AvatarMemo img={img} size={24} />
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
export const PostMemo = memo(Post)
