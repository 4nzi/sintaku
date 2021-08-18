import styled from 'styled-components'

/* --------------------- Style --------------------- */
const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`
/* ------------------------------------------------- */

const NoResults: React.VFC = () => {
  return (
    <Wrapper>
      <p>作品が見つかりませんでした</p>
    </Wrapper>
  )
}
export default NoResults
