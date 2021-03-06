import styled from 'styled-components'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Spacer, AvatarMemo, SearchInput } from '../components/index'
import { Auth, Hamburger } from './index'
import { useSelector, useDispatch } from 'react-redux'
import { setOpenSignUp, setOpenSignIn } from '../RTK/uiSlice'
import { selectMyProfile } from '../RTK/authSlice'
import { tab } from '../media'

/* --------------------- Style --------------------- */
const Header = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 2;
  border-bottom: 1px solid #353535;
  background-color: #212121;
`
const Contaier = styled.div`
  padding-left: 20px;
  padding-right: 20px;
`
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  gap: 2rem;
  > input {
    flex: 1;
    ${tab`
      display: none;  
    `}
  }
`
const Nav = styled.nav`
  ${tab`
      display: none;  
    `}
  > ul {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`
/* ------------------------------------------------- */

interface PROPS {
  title: string
}

const Layout: React.FC<PROPS> = ({ children, title = 'Sintaku' }) => {
  const dispatch = useDispatch()
  const data = useSelector(selectMyProfile)

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Header>
        <Contaier>
          <Wrapper>
            <Link href="/">
              <a>
                <Image
                  src="/logo.png"
                  width={98}
                  height={22}
                  objectFit={'contain'}
                  priority={true}
                />
              </a>
            </Link>
            <SearchInput />
            <Nav>
              <ul>
                {data.nickName ? (
                  <>
                    <li>
                      <Link href="/upload">
                        <a>
                          <Button type="button" sType="color">
                            ???????????????
                          </Button>
                        </a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/myprofile">
                        <a>
                          <AvatarMemo img={data?.img} size={34} />
                        </a>
                      </Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Button
                        onClick={() => {
                          dispatch(setOpenSignIn())
                        }}
                      >
                        ????????????
                      </Button>
                    </li>
                    <li>
                      <Button
                        sType="color"
                        onClick={() => {
                          dispatch(setOpenSignUp())
                        }}
                      >
                        ??????????????????
                      </Button>
                    </li>
                    <li>
                      <Button
                        sType="color"
                        onClick={async () => {
                          dispatch(setOpenSignUp())
                        }}
                      >
                        ???????????????
                      </Button>
                    </li>
                  </>
                )}
              </ul>
            </Nav>
            <Hamburger />
          </Wrapper>
        </Contaier>
      </Header>
      <Spacer axis="vertical" size={55} />
      <main>{children}</main>
      <Auth />
    </>
  )
}
export default Layout
