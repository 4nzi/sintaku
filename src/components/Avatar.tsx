import { memo } from 'react'
import styled from 'styled-components'
import Image from 'next/image'

/* --------------------- Style --------------------- */
const StyledImage = styled(Image)`
  border-radius: 50%;
  object-fit: cover;
`
/* ------------------------------------------------- */

type Props = {
  img?: string | undefined
  size: number
}

const Avatar: React.VFC<Props> = ({ img, size }) => {
  return (
    <div>
      {img ? (
        <StyledImage src={img} alt="Avatar" width={size} height={size} />
      ) : (
        <StyledImage
          src="/default_avatar.jpg"
          alt="Avatar"
          width={size}
          height={size}
        />
      )}
    </div>
  )
}
export const AvatarMemo = memo(Avatar)
