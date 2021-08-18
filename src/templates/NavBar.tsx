import styled from 'styled-components'

/* --------------------- Style --------------------- */
const Nav = styled.nav`
  background-color: #222;
`
const Wrapper = styled.ul`
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
`
const NavList = styled.li<{ focused: boolean }>`
  cursor: pointer;
  font-size: 1.5rem;
  padding: 10px 15px;
  line-height: 2.5rem;
  transition: background-color 0.15s ease;
  background-color: ${(props) => (props.focused ? '#151515' : 'none')};
  &:hover {
    background-color: #151515;
  }
`
/* ------------------------------------------------- */

interface PROPS {
  tab: string
  setTab: Function
}

const NavBar: React.VFC<PROPS> = ({ tab, setTab }) => {
  return (
    <Nav>
      <Wrapper>
        <NavList focused={tab === 'works'} onClick={() => setTab('works')}>
          投稿作品
        </NavList>
        <NavList focused={tab === 'profile'} onClick={() => setTab('profile')}>
          プロフィール
        </NavList>
        <NavList focused={tab === 'likes'} onClick={() => setTab('likes')}>
          いいね
        </NavList>
      </Wrapper>
    </Nav>
  )
}
export default NavBar
