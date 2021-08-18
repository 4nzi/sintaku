import styled from 'styled-components'
import { BaseStyle, ColorStyle, BoxStyle } from './style'

const StyledButton = styled.button<{ sType?: string }>`
  ${(props) => !props.sType && BaseStyle};
  ${(props) => props.sType === 'color' && ColorStyle};
  ${(props) => props.sType === 'box' && BoxStyle};
`
interface PROPS extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  sType?: string
}

const Button: React.VFC<PROPS> = (props) => {
  return <StyledButton {...props} />
}
export default Button
