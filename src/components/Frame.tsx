import styled from 'styled-components'

/* --------------------- Style --------------------- */
const Wrapper = styled.div`
  max-width: 1018px;
  background-color: #222;
  border-radius: 2px;
`
const Header = styled.div`
  background-color: #333;
  border-bottom: 1px solid #333;
  padding: 10px 20px;
  border-top-right-radius: 2px;
  border-top-left-radius: 2px;
  > h2 {
    font-size: 1.5rem;
  }
`
const Main = styled.div`
  padding: 20px;
`
/* ------------------------------------------------- */

interface PROPS {
  title: string
}

const Frame: React.FC<PROPS> = ({ children, title }) => {
  return (
    <Wrapper>
      <Header>
        <h2>{title}</h2>
      </Header>
      <Main>{children}</Main>
    </Wrapper>
  )
}
export default Frame
