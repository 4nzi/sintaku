import styled from 'styled-components'

const Wrapper = styled.textarea`
  font-size: 1.4rem;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #333;
  padding: 10px;
  resize: none;
  background-color: #171717;
`

const TextArea: React.VFC<React.TextareaHTMLAttributes<HTMLElement>> = (
  props
) => {
  return <Wrapper {...props} cols={30} rows={10} />
}
export default TextArea
