import Image from 'next/image'
import styled from 'styled-components'
import { Button } from './index'
import { setOpenCrop } from '../RTK/uiSlice'
import { useDispatch } from 'react-redux'

/* --------------------- Style --------------------- */
const Main = styled.div`
  position: relative;
  padding-top: 100%; //比率//
  margin-bottom: 20px;
  background: #1a1a1a;
`
const Footer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  > button {
    display: flex;
    align-items: center;
    padding: 2px 6px;
    > p {
      font-size: 1.2rem;
      padding-left: 2px;
    }
  }
`
/* ------------------------------------------------- */

interface PROPS {
  src: string
  onChange: React.ChangeEventHandler
}

const PreviewThum: React.VFC<PROPS> = ({ src, onChange }) => {
  const dispatch = useDispatch()
  return (
    <>
      <Main>
        {src ? (
          <Image src={src} layout="fill" objectFit="cover" alt="サムネイル" />
        ) : (
          <div></div>
        )}
      </Main>
      <Footer>
        {src && (
          <Button
            sType="box"
            type="button"
            onClick={() => {
              dispatch(setOpenCrop())
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              width="14px"
            >
              <path
                fillRule="evenodd"
                d="M5.5 2a3.5 3.5 0 101.665 6.58L8.585 10l-1.42 1.42a3.5 3.5 0 101.414 1.414l8.128-8.127a1 1 0 00-1.414-1.414L10 8.586l-1.42-1.42A3.5 3.5 0 005.5 2zM4 5.5a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm0 9a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
                clipRule="evenodd"
              />
              <path d="M12.828 11.414a1 1 0 00-1.414 1.414l3.879 3.88a1 1 0 001.414-1.415l-3.879-3.879z" />
            </svg>
            <p>調整</p>
          </Button>
        )}
        <Button
          sType="box"
          type="button"
          onClick={() => {
            document.getElementById('thum').click()
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            width="14px"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <p>ファイルを選択</p>
        </Button>
        <input
          id="thum"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={onChange}
        />
      </Footer>
    </>
  )
}
export default PreviewThum
