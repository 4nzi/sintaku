import styled from 'styled-components'
import { InputStyle } from './style'

const Wrapper = styled.input`
  ${InputStyle};
`

const Input: React.VFC<React.InputHTMLAttributes<HTMLInputElement>> = (
  props
) => {
  return <Wrapper {...props} />
}
export default Input
