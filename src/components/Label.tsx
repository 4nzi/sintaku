import styled from 'styled-components'

/* --------------------- Style --------------------- */
const Wrapper = styled.label`
  display: block;
  margin-bottom: 8px;
  font-size: 1.2rem;
  color: #aaaaaa;
`
/* ------------------------------------------------- */

const Label: React.FC = ({ children }) => {
  return <Wrapper>{children}</Wrapper>
}
export default Label
