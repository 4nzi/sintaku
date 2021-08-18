import styled from 'styled-components'
import Link from 'next/link'
import { pc } from '../media'
import { SearchInput, Button } from '../components/index'
import { useSelector, useDispatch } from 'react-redux'
import {
  setOpenBurger,
  resetOpenBurger,
  selectOpenBurger,
  selectIsAuthenticated,
} from '../RTK/uiSlice'

/* --------------------- Style --------------------- */
const Nav = styled.nav`
  z-index: 2;
  position: fixed;
  top: 0;
  left: 0;
  margin-top: 55px;
  width: 100%;
  display: block;
  width: 100%;
  background: rgba(0, 0, 0);
  transition: all 0.2s ease-in-out;
  padding: 20px 20px;
`
const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`
const NavList = styled.li`
  margin-bottom: 20px;
  width: 100%;
`
const Icon = styled.div<{ isOpen: boolean }>`
  position: relative;
  display: block;
  width: 25px;
  height: 20px;
  margin: 0 0 0 auto;
  cursor: pointer;
  > span {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 100%;
    height: 2px;
    background-color: #979797;
    transform: translateY(-50%);
    transition: all 0.2s;
    opacity: ${(props) => props.isOpen && '0'};
  }
  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #979797;
    transition: all 0.2s;
    transform: ${(props) => props.isOpen && 'translateY(8.7px) rotate(-45deg)'};
  }
  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #979797;
    transition: all 0.2s;
    transform: ${(props) => props.isOpen && 'translateY(-8.7px) rotate(45deg)'};
  }
  ${pc`
    display: none;
  `}
`
/* ------------------------------------------------- */

const Hamburger: React.VFC = () => {
  const dispatch = useDispatch()
  const isOpen = useSelector(selectOpenBurger)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return (
    <>
      {isOpen && (
        <Nav>
          <Wrapper>
            <NavList>
              <SearchInput />
            </NavList>
            {isAuthenticated ? (
              <>
                <NavList>
                  <Link href="/upload">
                    <a
                      onClick={() => {
                        dispatch(resetOpenBurger())
                      }}
                    >
                      新規投稿
                    </a>
                  </Link>
                </NavList>
                <NavList>
                  <Link href="/myprofile">
                    <a
                      onClick={() => {
                        dispatch(resetOpenBurger())
                      }}
                    >
                      マイページ
                    </a>
                  </Link>
                </NavList>
              </>
            ) : (
              <>
                <NavList>
                  <Link href="/signin">
                    <Button
                      onClick={() => {
                        dispatch(resetOpenBurger())
                      }}
                    >
                      ログイン
                    </Button>
                  </Link>
                </NavList>
                <NavList>
                  <Link href="/signup">
                    <Button
                      onClick={() => {
                        dispatch(resetOpenBurger())
                      }}
                    >
                      新規登録
                    </Button>
                  </Link>
                </NavList>
              </>
            )}
          </Wrapper>
        </Nav>
      )}
      <Icon
        isOpen={isOpen}
        onClick={() => {
          if (isOpen) {
            dispatch(resetOpenBurger())
          } else {
            dispatch(setOpenBurger())
          }
        }}
      >
        <span></span>
      </Icon>
    </>
  )
}
export default Hamburger
