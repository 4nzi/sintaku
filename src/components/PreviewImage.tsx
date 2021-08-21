import styled from 'styled-components'
import Image from 'next/image'
import { Button } from './index'

/* --------------------- Style --------------------- */
const Wapper = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #000;
  max-width: 324px;
  padding-top: 100%;
`

const Delete = styled.div`
  position: absolute;
  z-index: 2;
  left: 50%;
  bottom: 5px;
  line-height: 1;
  transform: translateX(-50%);
  > button {
    padding: 4px 7px;
  }
`
const Header = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 0,
    rgba(0, 0, 0, 0) 100%
  );
  .wrapper {
    text-align: center;
    padding-left: 8px;
    padding-top: 5px;
    font-size: 11px;
    display: flex;
    letter-spacing: 0;
    justify-content: center;
    align-items: center;
    > svg {
      width: 20px;
    }
    > span {
      padding-left: 4px;
      line-height: 1;
    }
  }
`
const Container = styled.div`
  border: 1px solid #333;
  max-width: 324px;
`
/* ------------------------------------------------- */

interface PROPS {
  src: string
  onclick: React.MouseEventHandler
  index: Number
}

const ImagePreview: React.VFC<PROPS> = ({ src, onclick, index }) => {
  return (
    <Container>
      <Wapper>
        <Header>
          <div className="wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <span>image_{index}</span>
          </div>
        </Header>
        <Image
          src={src}
          layout="fill"
          objectFit="contain"
          alt="プレビュー画像"
        />
        <Delete>
          <Button sType="box" type="button" onClick={onclick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="15px"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </Button>
        </Delete>
      </Wapper>
    </Container>
  )
}
export default ImagePreview
