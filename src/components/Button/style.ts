import { css } from 'styled-components'

export const BaseStyle = css`
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    opacity: 0.7;
  }
`
export const ColorStyle = css`
  color: #fff;
  font-weight: bold;
  background-color: #222;
  transition: background-color 0.15s ease;
  border-radius: 3px;
  padding: 9px 15px;
  font-size: 1.2rem;
  background-color: #1083b4;
  transition: 0.2s ease;
  &:hover {
    opacity: 0.7;
  }
`

export const BoxStyle = css`
  color: #fff;
  background-color: #222;
  transition: background-color 0.15s ease;
  border: 1px solid #5d5d5d;
  border-radius: 2px;
  padding: 6px 13px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s ease;
  &:hover {
    background-color: black;
  }
`
